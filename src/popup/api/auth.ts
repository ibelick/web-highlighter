const BASE_URL = "https://staging.sublime.app/api/v2/";

type SignupRequest = {
  email: string;
  name: string;
  continue_url: string;
};

export const signUp = async ({
  email,
  name,
  continue_url,
}: SignupRequest): Promise<unknown> => {
  const response = await fetch(`${BASE_URL}auth/sign-up/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      continue_url,
    }),
  });
  return response.json();
};

export const getToken = async (email: string): Promise<unknown> => {
  const response = await fetch(`${BASE_URL}auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  return response.json();
};
