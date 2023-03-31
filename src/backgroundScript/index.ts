chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Save to Sublime",
    contexts: ["selection"],
    id: "saveToSublime",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveToSublime") {
    const selectedText = info.selectionText;
    chrome.storage.local.set({ highlightedText: selectedText }, () => {
      console.log("Text saved to local storage", selectedText);
    });
  }
});
