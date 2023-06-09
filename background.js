// Set initial state of the extension to enabled
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ enabled: true });
});

// Toggle the enabled state of the extension when the browser action button is clicked
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get("enabled", function (data) {
    let isEnabled = data.enabled;
    chrome.storage.sync.set({ enabled: !isEnabled }, function () {
      console.log("Setting enabled in first phase", isEnabled);
      const iconPath = isEnabled ? "./icon-disabled.png" : "./icon.png";
      chrome.browserAction.setIcon({ path: iconPath, tabId: tab.id });
      if (isEnabled) {
        console.log("Extension is now enabled");
      } else {
        console.log("Extension is now disabled");
      }
      // Send a message to all tabs with the updated status of the extension
      chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, {
            action: "updateStatus",
            enabled: !isEnabled,
          });
        }
      });
    });
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getStatus") {
    // Get the current status of the extension from storage
    chrome.storage.sync.get("enabled", function (data) {
      console.log("from runtime in", data);
      const isEnabled = data.enabled;
      // Send a response with the current status
      sendResponse({ action: "getStatusResponse", enabled: isEnabled });
    });
    return true; // Indicates that the response is async
  }
});
