import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { addEntity, getPreview } from "./api/notes";
import type { GetPreviewResponse } from "./api/notes";
import type { Highlight } from "../types/notes";
import { getToken } from "./api/auth";

type Highlights = Highlight[];

const LoginContent = () => {
  const [metadata, setMetadata] = useState<GetPreviewResponse | null>(null);
  const [highlights, setHighlights] = useState<Highlights | null>(null);
  const [currentTabInfo, setCurrentTabInfo] = useState<chrome.tabs.Tab | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getPreviewLinkMetadata = async (url: string) => {
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
  }, [token]);

  const refreshToken = async () => {
    const data = await getToken("test@test.com");
    localStorage.setItem("token-whs", data.idToken);
    setToken(data.idToken);
  };

  const onSave = async () => {
    if (!metadata || !highlights || !currentTabInfo) {
      return;
    }

    const idToken = localStorage.getItem("token-whs");
    const data = await addEntity(
      currentTabInfo.url,
      metadata.entity_type,
      metadata.name,
      metadata.description,
      metadata.thumbnail,
      metadata.domain,
      highlights,
      idToken
    );

    if (data) {
      alert("Link saved");
    }
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
        <div onClick={refreshToken}>refresh token</div>
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
            <LoginContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
