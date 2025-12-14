// =============================
// GitHub CSS Variable Map
// =============================
const TARGET_VARS = {
    bgColor: [
        "--bgColor-default",
        "--bgColor-muted",
        "--bgColor-inset",
        "--bgColor-emphasis",
        "--bgColor-overlay",
        "--bgColor-attention-emphasis",
        "--bgColor-attention-muted",
        "--bgColor-danger-emphasis",
        "--bgColor-danger-muted",
        "--bgColor-success-emphasis",
        "--bgColor-success-muted",
        "--bgColor-neutral-emphasis",
        "--bgColor-neutral-muted",
        "--bgColor-done-emphasis",
        "--bgColor-done-muted",
        "--bgColor-severe-emphasis",
        "--bgColor-severe-muted",
        "--bgColor-sponsors-emphasis",
        "--bgColor-sponsors-muted",
        "--bgColor-transparent",
        "--bgColor-white",
        "--bgColor-black"
    ],
    fgColor: [
        "--fgColor-default",
        "--fgColor-muted",
        "--fgColor-disabled",
        "--fgColor-link",
        "--fgColor-attention",
        "--fgColor-danger",
        "--fgColor-success",
        "--fgColor-done",
        "--fgColor-severe",
        "--fgColor-sponsors",
        "--fgColor-neutral"
    ],
    borderColor: [
        "--borderColor-default",
        "--borderColor-muted",
        "--borderColor-emphasis",
        "--borderColor-transparent",
        "--borderColor-attention-emphasis",
        "--borderColor-attention-muted",
        "--borderColor-danger-emphasis",
        "--borderColor-danger-muted",
        "--borderColor-success-emphasis",
        "--borderColor-success-muted",
        "--borderColor-done-emphasis",
        "--borderColor-done-muted",
        "--borderColor-severe-emphasis",
        "--borderColor-severe-muted",
        "--borderColor-sponsors-emphasis",
        "--borderColor-sponsors-muted",
        "--borderColor-neutral-emphasis",
        "--borderColor-open-emphasis",
        "--borderColor-open-muted",
        "--borderColor-closed-emphasis",
        "--borderColor-closed-muted",
        "--borderColor-upsell-emphasis",
        "--borderColor-upsell-muted"
    ],
    header: [
        "--header-bgColor",
        "--header-fgColor-logo",
        "--header-borderColor-divider",
        "--headerSearch-bgColor",
        "--headerSearch-borderColor"
    ],
    button: [
        "--button-primary-bgColor-rest",
        "--button-primary-bgColor-hover",
        "--button-primary-bgColor-active",
        "--button-primary-bgColor-disabled",
        "--button-primary-borderColor-disabled",
        "--button-outline-bgColor-rest",
        "--button-outline-bgColor-hover",
        "--button-outline-bgColor-active",
        "--button-outline-fgColor-rest",
        "--button-outline-fgColor-hover",
        "--button-outline-fgColor-active",
        "--button-danger-bgColor-rest",
        "--button-danger-bgColor-hover",
        "--button-danger-bgColor-active",
        "--button-danger-fgColor-rest",
        "--button-danger-fgColor-hover",
        "--button-danger-fgColor-active"
    ],
    control: [
        "--control-bgColor-rest",
        "--control-bgColor-hover",
        "--control-bgColor-active",
        "--control-transparent-bgColor-rest",
        "--control-transparent-bgColor-hover",
        "--control-transparent-bgColor-active",
        "--control-borderColor-selected",
        "--control-checked-bgColor-hover",
        "--control-checked-bgColor-active",
        "--control-checked-borderColor-hover",
        "--control-checked-borderColor-active"
    ]
};

// =============================
// Utilities
// =============================
const root = document.documentElement;

const getCssVar = (name) => {
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    return value || null;
};

const loadTheme = async () => {
    const { currentTheme } = await chrome.storage.local.get("currentTheme");
    return currentTheme || null;
};

const saveTheme = (theme) =>
    chrome.storage.local.set({ currentTheme: theme });

const isExtensionContext = () =>
    Boolean(chrome.runtime?.id);

// =============================
// Theme Application
// =============================
async function applyTheme(theme) {
    const { enabled } = await chrome.storage.sync.get("enabled");
    if (!enabled || !theme) return;

    for (const group in theme) {
        for (const key in theme[group]) {
            const value = theme[group][key];
            if (value != null) {
                root.style.setProperty(`--${group}-${key}`, value);
            }
        }
    }
}

async function applyCurrentTheme() {
    if (!isExtensionContext()) return;

    const [{ currentTheme }, { enabled }] = await Promise.all([
        chrome.storage.local.get("currentTheme"),
        chrome.storage.sync.get("enabled")
    ]);

    if (enabled && currentTheme) {
        applyTheme(currentTheme);
    }
}

// =============================
// Default Theme Capture (First Install)
// =============================
async function initTheme() {
    let theme = await loadTheme();
    if (theme) {
        applyTheme(theme);
        return theme;
    }

    theme = {};

    for (const group in TARGET_VARS) {
        theme[group] = {};
        TARGET_VARS[group].forEach(cssVar => {
            const clean = cssVar.replace(/^--/, "");
            const key = clean.replace(`${group}-`, "");
            theme[group][key] = getCssVar(cssVar);
        });
    }

    await saveTheme(theme);
    applyTheme(theme);
    return theme;
}

// =============================
// Restore GitHub Default Theme
// =============================
function restoreDefaultTheme() {
    for (const group in TARGET_VARS) {
        TARGET_VARS[group].forEach(cssVar => {
            root.style.removeProperty(cssVar);
        });
    }
}

// =============================
// Message Listener (Popup → Content)
// =============================
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.type === "applyTheme") {
        applyTheme(msg.theme);
        sendResponse({ ok: true });
    }
});

// =============================
// SPA Navigation Handling
// =============================
let lastUrl = location.href;

const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        applyCurrentTheme();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// =============================
// Initial Application (Fast Path)
// =============================
document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(applyCurrentTheme);
});

// =============================
// Storage Change Handling
// =============================
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.enabled) return;

    changes.enabled.newValue
        ? applyCurrentTheme()
        : restoreDefaultTheme();
});

// =============================
// Bootstrapping
// =============================
initTheme();
