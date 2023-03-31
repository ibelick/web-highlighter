import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/css/tailwind.css";
import { ContentScript } from "./ContentScript";
import { v4 as uuid } from "uuid";

// function handleSelection() {
//   const selectedText = window.getSelection().toString();
//   const id = uuid();
//   const highlight = { [id]: { text: selectedText, color: "#FFFF00" } };

//   const saveHighlight = confirm("Do you want to save this highlight?");

//   chrome.contextMenus.create({
//     title: "Save to Sublime",
//     contexts: ["selection"],
//     onclick: () => console.log("clicked", highlight),
//   });
// }

// const handleContextMenuClick = (info: any, tab: any) => {
//   const selectedText = info.selectionText;
//   const id = uuid();
//   const highlight = { [id]: { text: selectedText, color: "#FFFF00" } };

//   console.log(highlight);
// };

async function init() {
  console.log("Initializing content script");

  // Listen for the 'mouseup' event to detect when the user finishes selecting text
  // document.addEventListener("mouseup", handleSelection);

  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  if (!appContainer) {
    throw new Error("Cannot find appContainer");
  }

  const root = createRoot(appContainer);
  root.render(<ContentScript />);
}

init();
