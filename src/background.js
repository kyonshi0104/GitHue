chrome.runtime.onInstalled.addListener(async () => {
    const { enabled } = await chrome.storage.sync.get("enabled");
    if (enabled === undefined) {
        chrome.storage.sync.set({ enabled: true });
    }
});
