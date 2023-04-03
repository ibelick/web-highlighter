import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { addEntity, getPreview } from "./api/notes";
import type { GetPreviewResponse } from "./api/notes";
import type { Highlight } from "../types/notes";
import { getToken } from "./api/auth";
import Button from "./components/Button";

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

      console.log("data", data);

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
    // NOTES: This is a temporary solution
    // We need to implement a refresh token flow
    const data = await getToken("test@test.com");
    console.log("data", data);

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
        <h2 className="whs-text-lg whs-mb-2">Metadata</h2>
      </div>
      <div className="whs-mb-4">
        {metadata ? (
          <div>
            <div className="whs-font-semibold whs-text-slate-900">
              Description
            </div>
            <div className="whs-text-gray-700 whs-mb-1">
              {metadata.description}
            </div>
            <div className="whs-font-semibold whs-text-slate-900">Domain</div>
            <div className="whs-text-gray-700 whs-mb-1">{metadata.domain}</div>
            <div className="whs-font-semibold whs-text-slate-900">
              Entity type
            </div>
            <div className="whs-text-gray-700 whs-mb-1">
              {metadata.entity_type}
            </div>
            <div className="whs-font-semibold whs-text-slate-900">Name</div>
            <div className="whs-text-gray-700 whs-mb-1">{metadata.name}</div>
            <div className="whs-font-semibold whs-text-slate-900">
              Thumbnail
            </div>
            <div className="whs-text-gray-700 whs-mb-1">
              {metadata.thumbnail}
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <h2 className="whs-text-lg whs-mb-2">Highlighted</h2>
        <div className="whs-mb-2">
          {!highlights
            ? null
            : Object.keys(highlights).map((id) => {
                const { text } = highlights[id];

                return (
                  <div key={id} className="whs-mb-2 whs-text-gray-700">
                    {text}
                  </div>
                );
              })}
        </div>
        <Button onClick={onSave}>Save link</Button>
        <div onClick={refreshToken} className="whs-mt-2 whs-cursor-pointer">
          Refresh token
        </div>
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
    <div id="app">
      <div className="whs-w-72">
        <div className="whs-p-4">
          {!isLogedIn ? (
            <SignUp setIsLogedIn={setIsLogedIn} />
          ) : (
            <div className="mb-10">
              <LoginContent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
