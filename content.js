// Send a message to the background page
const PostButton = document.getElementById("clickToAnalyse");
PostButton.addEventListener("click", () => {
    console.log("clicked the button");
    chrome.runtime.sendMessage({text: "Hello from content script!"});
});


// Receive a message from the background page
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("Received message from background page:", message);
});
