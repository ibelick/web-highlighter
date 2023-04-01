import { v4 as uuid } from "uuid";
import type { Highlight } from "../types/notes";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Save to Sublime",
    contexts: ["selection"],
    id: "saveToSublime",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const tabUrl = tab.url;

  if (info.menuItemId === "saveToSublime") {
    const selectedText = info.selectionText;
    const id = uuid();
    const highlight: Highlight = {
      text: selectedText,
      html: selectedText,
      entity_type: "contribution.highlight",
    };

    chrome.storage.local.get(tabUrl, (data) => {
      const highlightsForUrl = data[tabUrl] || [];
      const updatedHighlightsForUrl = [...highlightsForUrl, highlight];

      chrome.storage.local.set({ [tabUrl]: updatedHighlightsForUrl });
      chrome.runtime.sendMessage({ type: "highlightAdded" });
    });
  }
});
