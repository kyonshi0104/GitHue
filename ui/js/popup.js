// =============================
// UI Switch
// =============================
const quick_settings = document.getElementById("quick");
const advanced_settings = document.getElementById("advanced");
const toggle = document.getElementById("ex_toggle");

const grayout = document.getElementById("disabled");

const black = document.getElementById("black");
const white = document.getElementById("white");

const fgdata = document.getElementById("quickFg");

const advanced_menu = document.getElementsByClassName("advanced_menu");
const quick_menu = document.getElementsByClassName("quick_menu");

const isValidColor = /^#[0-9A-Fa-f]{6}$/;


quick_settings.addEventListener("click", () => {
    advanced_settings.classList.remove("selected");
    quick_settings.classList.add("selected");

    Array.from(quick_menu).forEach(m => m.style.display = "block");
    Array.from(advanced_menu).forEach(m => m.style.display = "none");
});


advanced_settings.addEventListener("click", () => {
    quick_settings.classList.remove("selected");
    advanced_settings.classList.add("selected");

    Array.from(advanced_menu).forEach(m => m.style.display = "block");
    Array.from(quick_menu).forEach(m => m.style.display = "none");
});


// =============================
// Quick Foreground Presets
// =============================
black.addEventListener("click", () => {
    white.classList.remove("selected");
    black.classList.add("selected");

    fgdata.value = "#000000";
    fgdata.dispatchEvent(new Event("input"));
});


white.addEventListener("click", () => {
    black.classList.remove("selected");
    white.classList.add("selected");

    fgdata.value = "#ffffff";
    fgdata.dispatchEvent(new Event("input"));
});


// =============================
// Extension Toggle
// =============================
toggle.addEventListener("click", () => {
    chrome.storage.sync.get("enabled", data => {
        const next = !Boolean(data.enabled);

        toggle.classList.toggle("enabled", next);
        chrome.storage.sync.set({ ["enabled"]: next });

        grayout.style.display = next ? "none" : "";
    });
});


// =============================
// GitHub Tab Utilities
// =============================
async function getGithubTab() {
    return new Promise(resolve => {
        chrome.tabs.query(
            { url: "*://github.com/*" },
            tabs => resolve(tabs[0] || null)
        );
    });
}


// =============================
// Theme Persistence
// =============================
async function saveTheme(theme) {
    return chrome.storage.local.set({ currentTheme: theme });
}


async function applyThemeToGithub(theme) {
    const tab = await getGithubTab();
    if (!tab) return;

    chrome.tabs.sendMessage(tab.id, {
        type: "applyTheme",
        theme
    });
}


// =============================
// Advanced Theme Update
// =============================
async function updateAdvancedTheme(key, value) {
    const { currentTheme } = await chrome.storage.local.get("currentTheme");
    if (!currentTheme) return;

    const [group, name] = key.split("-");
    currentTheme[group][name] = value;

    await saveTheme(currentTheme);
    await applyThemeToGithub(currentTheme);
}


// =============================
// Color Conversion Utilities
// =============================
function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return { h, s, l };
}


function hslToHex(h, s, l) {
    function f(n) {
        const k = (n + h * 12) % 12;
        const a = s * Math.min(l, 1 - l);
        const c = l - a * Math.max(
            -1,
            Math.min(k - 3, Math.min(9 - k, 1))
        );

        return Math.round(255 * c)
            .toString(16)
            .padStart(2, "0");
    }

    return `#${f(0)}${f(8)}${f(4)}`;
}


function adjust(hsl, { dh = 0, ds = 0, dl = 0 }) {
    return hslToHex(
        (hsl.h + dh) % 1,
        Math.min(1, Math.max(0, hsl.s + ds)),
        Math.min(1, Math.max(0, hsl.l + dl))
    );
}


// =============================
// Quick Theme Generator
// =============================
function generateTheme(baseBg, baseFg) {
    const bg = hexToHsl(baseBg);
    const fg = hexToHsl(baseFg);

    return {
        bgColor: {
            default: baseBg,
            muted: adjust(bg, { dl: -0.08 }),
            inset: adjust(bg, { dl: -0.15 }),
            emphasis: adjust(bg, { dl: +0.10 }),
            overlay: adjust(bg, { dl: -0.05 }),
            attention: "#ae7c1426",
            success: "#347d39",
            danger: "#c93c37",
            highlight: adjust(bg, { dl: +0.20 }),
            primer: adjust(bg, { dl: -0.12 })
        },
        fgColor: {
            default: baseFg,
            muted: adjust(fg, { ds: -0.3 }),
            subtle: adjust(fg, { ds: -0.5, dl: +0.1 }),
            onEmphasis: "#ffffff",
            link: adjust(fg, { dh: +0.1 }),
            white: "#ffffff",
            disabled: adjust(fg, { ds: -0.5, dl: -0.2 }),
            success: "#57ab5a",
            danger: "#e5534b",
            attention: "#c69026"
        },
        borderColor: {
            default: adjust(bg, { dl: -0.25 }),
            muted: adjust(bg, { dl: -0.35 }),
            subtle: adjust(bg, { dl: -0.45 }),
            emphasis: adjust(bg, { dl: -0.15 }),
            overlay: adjust(bg, { dl: -0.20 }),
            divider: adjust(bg, { dl: -0.30 }),
            success: "#347d39",
            danger: "#c93c37",
            attention: "#966600"
        }
    };
}


// =============================
// Quick Theme Update
// =============================
async function updateQuickTheme() {
    const baseBg = document.getElementById("quickBg").value;
    const baseFg = document.getElementById("quickFg").value;

    if (!isValidColor.test(baseBg) || !isValidColor.test(baseFg)) {
        return;
    }

    const theme = generateTheme(baseBg, baseFg);

    await saveTheme(theme);
    await applyThemeToGithub(theme);
}


// =============================
// Color Input Synchronization
// =============================
document.querySelectorAll(".color_pallet").forEach(el => {
    el.addEventListener("click", () => {
        const parent = el.parentElement;
        const targetInput = parent.querySelector('input[type="color"]');

        if (targetInput) {
            targetInput.click();
        }
    });
});


document.querySelectorAll('input[type=color]').forEach(el => {
    el.addEventListener("input", () => {
        const inputcolor = el.value;
        const parent = el.parentElement;

        const pallet = parent.querySelector(".color_pallet");
        const text = parent.querySelector('input[type=text]');

        if (pallet && text) {
            pallet.style.background = inputcolor;
            text.value = inputcolor;
        }

        const key = el.dataset.src;
        if (key) {
            updateAdvancedTheme(key, inputcolor);
        }

        if (el.id === "quickBg" || el.id === "quickFg") {
            updateQuickTheme();
        }
    });
});


document.querySelectorAll('input[type=text]').forEach(el => {
    el.addEventListener("input", () => {
        const inputtext = el.value;
        const parent = el.parentElement;

        const pallet = parent.querySelector(".color_pallet");
        const color = parent.querySelector('input[type=color]');

        if (pallet && color && isValidColor.test(inputtext)) {
            color.value = inputtext;
            color.dispatchEvent(new Event("input"));
        }
    });
});


// =============================
// Load Theme Into UI
// =============================
async function loadThemeIntoUI() {
    const { currentTheme } = await chrome.storage.local.get("currentTheme");
    if (!currentTheme) return;

    chrome.storage.sync.get("enabled", data => {
        const toggle_value = Boolean(data.enabled);

        if (toggle_value) {
            toggle.classList.add("enabled");
            grayout.style.display = "none";
        }
    });

    document.querySelectorAll("input[data-src]").forEach(input => {
        const key = input.dataset.src;
        const [group, name] = key.split("-");

        const value = currentTheme[group]?.[name];
        if (!value) return;

        input.value = value;

        const parent = input.parentElement;
        const pallet = parent.querySelector(".color_pallet");
        const text = parent.querySelector('input[type=text]');
        const color = parent.querySelector('input[type=color]');

        if (pallet) pallet.style.background = value;
        if (text && input.type === "color") text.value = value;
        if (color && input.type === "text") color.value = value;
    });

    const quickBg = document.getElementById("quickBg");
    const quickFg = document.getElementById("quickFg");

    if (quickBg && currentTheme.bgColor?.default) {
        quickBg.value = currentTheme.bgColor.default;

        const parent = quickBg.parentElement;
        const pallet = parent.querySelector(".color_pallet");
        const text = parent.querySelector('input[type=text]');

        if (pallet) pallet.style.background = currentTheme.bgColor.default;
        if (text) text.value = currentTheme.bgColor.default;
    }

    if (quickFg && currentTheme.fgColor?.default) {
        quickFg.value = currentTheme.fgColor.default;

        const parent = quickFg.parentElement;
        const pallet = parent.querySelector(".color_pallet");
        const text = parent.querySelector('input[type=text]');

        if (pallet) pallet.style.background = currentTheme.fgColor.default;
        if (text) text.value = currentTheme.fgColor.default;
    }
}


// =============================
// Bootstrapping
// =============================
(async () => {
    const tab = await getGithubTab();

    if (!tab) {
        document.body.innerHTML = `
            <div style="padding:20px;">
                <p>GitHub を開いてから再度この拡張を開いてください。</p>
                <button id="open">GitHub を開く</button>
            </div>
        `;

        document.getElementById("open").onclick = () => {
            chrome.tabs.create({ url: "https://github.com" });
        };
    }

    await loadThemeIntoUI();
})();
