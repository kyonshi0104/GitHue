let themeConfig = null;
const root = document.documentElement;

// =============================
// Utilities
// =============================
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

    for (const variable in theme) {
        const value = theme[variable];
        if (value != null) {
            document.documentElement.style.setProperty(variable, value);
        }
    }

    document.querySelector('meta[name="theme-color"]').content = theme["--borderColor-default"];
}

async function applyCurrentTheme() {
    if (!isExtensionContext()) return;

    const [{ currentTheme }, { enabled }] = await Promise.all([
        chrome.storage.local.get("currentTheme"),
        chrome.storage.sync.get("enabled")
    ]);

    if (enabled && currentTheme) {
        await applyTheme(currentTheme);
    }
}

async function initTheme() {
    let theme = await loadTheme();

    if (theme) {
        await applyTheme(theme);
        return theme;
    }

    if (!themeConfig) return;

    theme = {};
    themeConfig.forEach(item => {
        theme[item.variable] = getCssVar(item.variable);
    });

    await saveTheme(theme);
    await applyTheme(theme);
    return theme;
}

function restoreDefaultTheme() {
    if (!themeConfig) return;
    themeConfig.forEach(item => {
        root.style.removeProperty(item.variable);
    });
    document.querySelector('meta[name="theme-color"]').content = '#1e2327';
}

// =============================
// Message Listener
// =============================
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.type === "applyTheme") {
        applyTheme(msg.theme).then(() => {
            sendResponse({ ok: true });
        });
        return true;
    }
});

// =============================
// Events & Observers
// =============================
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync" || !changes.enabled) return;
    changes.enabled.newValue ? applyCurrentTheme() : restoreDefaultTheme();
});

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

document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(applyCurrentTheme);
});

// =============================
// Bootstrapping
// =============================
(async () => {
    try {
        const src = chrome.runtime.getURL('config/colors.js');
        const imported = await import(src);
        themeConfig = imported.themeConfig;

        await initTheme();
    } catch (e) {
        console.error("Initialization failed:", e);
    }
})();