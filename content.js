console.log("Content script loaded");

// Listen to changes in the storage and get the current status of the extension
chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(changes.enabled);
  if (changes.enabled && changes.enabled.newValue !== undefined) {
    const isEnabled = changes.enabled.newValue;
    if (isEnabled) {
      console.log("fetch here");
    } else {
      console.log("remove everything");
    }
    // Send a message to the background script with the updated status
    chrome.runtime.sendMessage({ action: "updateStatus", enabled: isEnabled });
  }
});

// Get the initial status of the extension
chrome.storage.sync.get("enabled", function (data) {
  console.log(data);
  const isEnabled = data.enabled;
  // Send a message to the background script with the initial status
  chrome.runtime.sendMessage({ action: "updateStatus", enabled: isEnabled });
});
