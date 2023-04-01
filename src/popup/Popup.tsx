import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { getPreview } from "./api/notes";
import type { GetPreviewResponse } from "./api/notes";
import type { Highlight } from "../types/notes";

type Highlights = {
  [id: string]: Highlight;
};

const LoginContent = () => {
  const [metadata, setMetadata] = useState<GetPreviewResponse | null>(null);
  const [highlights, setHighlights] = useState<Highlights | null>(null);
  const [currentTabInfo, setCurrentTabInfo] = useState<chrome.tabs.Tab | null>(
    null
  );

  useEffect(() => {
    const getPreviewLinkMetadata = async (url: string) => {
      console.log("get preview link metadata");

      const idToken = localStorage.getItem("token-whs");
      const data = await getPreview(url, idToken);

      setMetadata(data);
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentTabInfo(tabs[0]);
      getPreviewLinkMetadata(tabs[0].url);

      chrome.storage.local.get(null, (result: any) => {
        const highlights = result[tabs[0].url];

        setHighlights(highlights);
      });
    });
  }, []);

  const onSave = async () => {
    const idToken = localStorage.getItem("token-whs");
    const entity = {
      url: currentTabInfo?.url,
      entityType: metadata?.entity_type,
      name: metadata?.name,
      description: metadata?.description,
      thumbnail: metadata?.thumbnail,
      domain: metadata?.domain,
      contributions: Object.values(highlights!),
      idToken,
    };
    console.log(entity);
    console.log(idToken);

    //   url: string,
    // entityType: string,
    // name: string,
    // description: string,
    // thumbnail: string,
    // domain: string,
    // contributions: {
    //   entity_type: string;
    //   text: string;
    //   html: string;
    // }[],
    // idToken: string
  };

  return (
    <div>
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
      <div>
        {!highlights
          ? null
          : Object.keys(highlights).map((id) => {
              const { text } = highlights[id];

              return (
                <div key={id} style={{ backgroundColor: "yellow" }}>
                  {text}
                </div>
              );
            })}
        <div className="whs-mt-4" onClick={onSave}>
          Save link
        </div>
      </div>
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
            <LoginContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
