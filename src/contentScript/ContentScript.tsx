import React, { FunctionComponent } from "react";

export const ContentScript: FunctionComponent = () => {
  const clearData = () => {
    console.log("Clearing data");

    return chrome.storage.local.clear(function () {
      console.log("Storage cleared");
    });
  };
  return (
    <div className="whs-absolute whs-top-24 whs-left-0 whs-right-0 whs-flex whs-items-center whs-justify-center">
      <div className="bg-white px-8 py-4 rounded-lg shadow-xl text-gray-800">
        <span>This is a content script section</span>
        <button onClick={clearData} className="bg-red-100">
          Clear Data
        </button>
      </div>
    </div>
  );
};
