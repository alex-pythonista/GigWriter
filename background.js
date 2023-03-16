chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ enabled: true });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get("enabled", function (data) {
    let isEnabled = data.enabled;
    chrome.storage.sync.set({ enabled: !isEnabled }, function () {
      const iconPath = isEnabled ? "./icon-disabled.png" : "./icon.png";
      chrome.browserAction.setIcon({ path: iconPath, tabId: tab.id });
      if (isEnabled) {
        // console.log(isEnabled);
        chrome.tabs.executeScript(tab.id, { file: "content.js" });
      } else {
        console.log("can't do it");
      }
    });
    console.log(isEnabled);
  });
});
