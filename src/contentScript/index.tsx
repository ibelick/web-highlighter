import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/css/tailwind.css";
import { ContentScript } from "./ContentScript";
import type { Highlight } from "../types/notes";
import Mark from "mark.js";

const highlightPage = () => {
  const currentUrl = window.location.href;

  chrome.storage.local.get((items) => {
    const currentUrlItems: Highlight[] = items[currentUrl];

    if (currentUrlItems) {
      const markInstance = new Mark(document.body);
      const searchTerms = currentUrlItems.map((item) => item.text);

      markInstance.unmark({
        done: () => {
          markInstance.mark(searchTerms, {
            className: "highlight",
            separateWordSearch: false,
            acrossElements: true,
          });
        },
      });
    }
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
