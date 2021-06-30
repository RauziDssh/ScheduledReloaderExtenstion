chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    reloadWindow(msg);
});

function reloadWindow(msg) {

    currentTime =  new Date();
    targetTime = new Date().setHours(msg.hour, msg.minute, 0, 0);
    offsetms = msg.offsetms / 1.0;
    deltaTime = targetTime - currentTime + offsetms;

    console.log(deltaTime);

    chrome.browserAction.setBadgeText({ text: String(Math.floor((targetTime - new Date() + offsetms)/1000.0)) });

    intervalHandle = setInterval(() => 
    {
        chrome.browserAction.setBadgeText({ text: String(Math.floor((targetTime - new Date() + offsetms)/1000.0)) });
    }, 100);

    setTimeout(() => {
        chrome.tabs.getAllInWindow(msg.window.id, function reloadTabs(tabs) {
            // For each tab in the current window, refresh it.
            for (var i in tabs) {
                chrome.tabs.update(tabs[i].id, {url: tabs[i].url, selected: tabs[i].selected},null);
            }
        });
        chrome.browserAction.setBadgeText({ text: "" });
        clearInterval(intervalHandle);
    }, deltaTime);
}