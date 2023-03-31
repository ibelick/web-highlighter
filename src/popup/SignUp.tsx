import React, { useState } from "react";
import { getToken, signUp } from "./api/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("email", email);
    console.log("name", name);

    const CONTINUE_URL_BASE = "http://localhost:3000";

    try {
      const data = await signUp({
        email,
        name,
        continue_url: CONTINUE_URL_BASE,
      });

      console.log("data", data);
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
          className="font-sans inline-flex appearance-none items-center rounded-full px-6 py-3 text-sm font-medium drop-shadow-sm transition focus:ring-4 focus:ring-gray-300 null bg-teal-700 text-white hover:bg-teal-800"
        >
          Sign Up
        </button>
      </form>
      <div>test refresh token</div>
      <button onClick={refreshToken} type="button">
        Refresh Token
      </button>
    </div>
  );
};

export default SignUp;
