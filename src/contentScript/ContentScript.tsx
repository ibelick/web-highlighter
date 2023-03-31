import React, { FunctionComponent } from "react";

export const ContentScript: FunctionComponent = () => {
  const clearData = () => {
    console.log("Clearing data");

    return chrome.storage.local.clear(function () {
      console.log("Storage cleared");
    });
  };
  return (
    <div className="sublime-container-app">
      <div className="absolute top-24 left-0 right-0 flex items-center justify-center">
        <div className="bg-white px-8 py-4 rounded-lg shadow-xl text-gray-800">
          <span>This is a content script section</span>
          <button onClick={clearData} className="bg-red-100">
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
};
