console.log("Content script loaded");

// Listen to changes in the storage and get the current status of the extension
chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(changes.enabled);
  if (changes.enabled && changes.enabled.newValue !== undefined) {
    const isEnabled = changes.enabled.newValue;
    const container = document.getElementById(":sy");

    if (isEnabled) {
      console.log("fetch here");
      // Create the element
      const span = document.createElement("span");
      span.innerHTML = "hello world";

      // Add it to the container
      container.appendChild(span);
    } else {
      console.log("remove everything");
      // Find the element and remove it
      const span = container.querySelector("span");
      if (span) {
        container.removeChild(span);
      }
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
