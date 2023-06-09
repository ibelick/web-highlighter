import { BASE_URL } from "./url";

type SignupResponse = {
  id_token: string;
  refresh_token: string;
};

export const signUp = async (
  email: string,
  name: string,
  continue_url: string
): Promise<SignupResponse> => {
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

type TokenResponse = {
  expriesIn: string;
  idToken: string;
  isNewUser: boolean;
  kind: string;
  refreshToken: string;
};

export const getToken = async (email: string): Promise<TokenResponse> => {
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
