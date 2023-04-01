import { v4 as uuid } from "uuid";

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
    const id = uuid();
    const highlight = { [id]: { text: selectedText, color: "#FFFF00" } };
    chrome.storage.local.set(highlight);
    chrome.runtime.sendMessage({ type: "highlightAdded" });
  }
});
