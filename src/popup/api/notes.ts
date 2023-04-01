import { BASE_URL } from "./url";

export type GetPreviewResponse = {
  description: string;
  domain: string;
  entity_type: string;
  name: string;
  thumbnail: string;
};

export const getPreview = async (
  url: string,
  idToken: string
): Promise<GetPreviewResponse> => {
  const response = await fetch(`${BASE_URL}cx/preview/?url=${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.json();
};

export const addEntity = async (
  url: string,
  entityType: string,
  name: string,
  description: string,
  thumbnail: string,
  domain: string,
  contributions: {
    entity_type: string;
    text: string;
    html: string;
  }[],
  idToken: string
): Promise<unknown> => {
  const response = await fetch(`${BASE_URL}entities/add/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      entity_type: entityType,
      name,
      description,
      thumbnail,
      domain,
      contributions,
    }),
  });
  return response.json();
};
