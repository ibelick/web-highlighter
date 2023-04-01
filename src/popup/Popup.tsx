import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { getPreview } from "./api/notes";
import type { GetPreviewResponse } from "./api/notes";

const WebsiteMetadata = () => {
  const [metadata, setMetadata] = useState<GetPreviewResponse | null>(null);

  useEffect(() => {
    const getPreviewLinkMetadata = async (url: string) => {
      console.log("get preview link metadata");

      const idToken = localStorage.getItem("token-whs");
      const data = await getPreview(url, idToken);

      setMetadata(data);
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      getPreviewLinkMetadata(tabs[0].url);
    });
  }, []);

  return (
    <div>
      {metadata ? (
        <div>
          <div>{metadata.description}</div>
          <div>{metadata.domain}</div>
          <div>{metadata.entity_type}</div>
          <div>{metadata.name}</div>
          <div>{metadata.thumbnail}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const Hightlight = () => {
  const [color, setColor] = useState("#FFFF00");

  const handleSaveClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { type: "saveHighlight", color });
    });
  };

  return (
    <>
      <button onClick={handleSaveClick}>Save</button>
    </>
  );
};

const HighlightListAndSave = () => {
  const [highlights, setHighlights] = useState<any[]>([]);

  useEffect(() => {
    chrome.storage.local.get(null, (result: any) => {
      setHighlights(result);
    });
  }, []);

  const onSave = () => {
    console.log("heuyu save");
  };

  return (
    <div>
      {Object.keys(highlights).map((id) => {
        const { text, color } = highlights[id];
        return (
          <div key={id} style={{ backgroundColor: color }}>
            {text}
          </div>
        );
      })}
      <div className="whs-mt-4" onClick={onSave}>
        Save link
      </div>
    </div>
  );
};

const Popup = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token-whs");

    if (token) {
      setIsLogedIn(true);
    }
  }, []);

  return (
    <div className="whs-w-72">
      <div className="whs-p-4">
        <h1 className="whs-text-base whs-mb-4 whs-font-medium">
          Sublime highlighter
        </h1>
        {!isLogedIn ? (
          <SignUp setIsLogedIn={setIsLogedIn} />
        ) : (
          <div className="mb-10">
            <WebsiteMetadata />
            <HighlightListAndSave />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
