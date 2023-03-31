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
    <div className="flex flex-col">
      <form onSubmit={onSubmit}>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 font-sans focus:shadow-outline w-full appearance-none rounded bg-white py-4 px-4 leading-tight text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-teal-200"
        />
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 font-sans focus:shadow-outline w-full appearance-none rounded bg-white py-4 px-4 leading-tight text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-teal-200"
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
