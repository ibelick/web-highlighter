import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/css/tailwind.css";
import { ContentScript } from "./ContentScript";
import type { Highlight } from "../types/notes";

const highlightPage = () => {
  const currentUrl = window.location.href;

  chrome.storage.local.get((items) => {
    const currentUrlItems: Highlight[] = items[currentUrl];

    return currentUrlItems.forEach((item) => {
      const text = item.text;

      // Search for text within all text nodes on the page
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      let node;
      while ((node = walker.nextNode())) {
        const textContent = node.textContent;
        const index = textContent.indexOf(text);
        if (index !== -1) {
          // Create a new element to wrap the highlighted text
          const span = document.createElement("span");
          span.style.backgroundColor = "yellow";
          span.textContent = text;

          // Split the text node at the index where the text was found
          const startNode = node.splitText(index);
          const endNode = startNode.splitText(text.length);

          // Replace the original text node with the wrapped highlighted text
          startNode.parentNode.replaceChild(span, startNode);

          // Continue the loop from the end of the wrapped text node
          walker.currentNode = endNode;
        }
      }
    });
  });
};

chrome.runtime.onMessage.addListener((message) => {
  console.log("message received", message);

  if (message.type === "highlightAdded") {
    highlightPage;
  }
});

async function init() {
  console.log("Initializing content script");

  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  if (!appContainer) {
    throw new Error("Cannot find appContainer");
  }

  const root = createRoot(appContainer);
  root.render(<ContentScript />);
  highlightPage();
}

init();
