import React, { FunctionComponent } from "react";

export const ContentScript: FunctionComponent = () => {
  return null;

  // TEST PURPOSES
  const clearData = () => {
    console.log("Clearing data");

    return chrome.storage.local.clear(function () {
      console.log("Storage cleared");
    });
  };
  return (
    <div className="whs-absolute whs-top-24 whs-left-0 whs-right-0 whs-flex whs-items-center whs-justify-center">
      <div className="whs-bg-white whs-px-8 whs-py-4 whs-rounded-lg whs-shadow-xl whs-text-gray-800">
        <span>This is a content script section</span>
        <button onClick={clearData} className="whs-bg-red-100">
          Clear Data
        </button>
      </div>
    </div>
  );
};
