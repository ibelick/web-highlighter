import React, { useState } from "react";
import { getToken, signUp } from "./api/auth";

type SignUpProps = {
  setIsLogedIn: (isLogedIn: boolean) => void;
};

const SignUp = ({ setIsLogedIn }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const CONTINUE_URL_BASE = "http://localhost:3000";

    try {
      const data = await signUp(email, name, CONTINUE_URL_BASE);

      localStorage.setItem("token-whs", data.id_token);
      setIsLogedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshToken = async () => {
    console.log("refresh token");

    const data = await getToken(email);

    console.log("data", data);
  };

  return (
    <div className="whs-flex whs-flex-col">
      <form onSubmit={onSubmit}>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="whs-border whs-border-gray-300 whs-font-sans whs-focus:whs-shadow-outline whs-w-full whs-appearance-none whs-rounded whs-bg-white whs-py-4 whs-px-4 whs-leading-tight whs-text-gray-700 whs-placeholder:whs-text-gray-400 whs-focus:outline-none whs-focus:whs-ring-1 whs-focus:whs-border-teal-200"
        />
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="whs-border whs-border-gray-300 whs-font-sans whs-focus:whs-shadow-outline whs-w-full whs-appearance-none whs-rounded whs-bg-white whs-py-4 whs-px-4 whs-leading-tight whs-text-gray-700 whs-placeholder:whs-text-gray-400 whs-focus:outline-none whs-focus:whs-ring-1 whs-focus:whs-border-teal-200"
        />
        <button
          type="submit"
          className="whs-font-sans whs-inline-flex whs-appearance-none whs-items-center whs-rounded-full whs-px-6 whs-py-3 whs-text-sm whs-font-medium whs-drop-shadow-sm whs-transition whs-focus:whs-ring-4 focus:whs-ring-gray-300 whs-bg-teal-700 whs-text-white hover:whs-bg-teal-800"
        >
          Sign Up
        </button>
      </form>
      <button onClick={refreshToken} type="button">
        Refresh Token
      </button>
    </div>
  );
};

export default SignUp;
