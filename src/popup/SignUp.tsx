import React, { useState } from "react";
import { signUp } from "./api/auth";
import Button from "./components/Button";

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

  return (
    <div className="">
      <form
        onSubmit={onSubmit}
        className="whs-w-full whs-flex whs-flex-col whs-items-center"
      >
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="whs-border whs-border-gray-300 whs-font-sans whs-focus:whs-shadow-outline whs-w-full whs-appearance-none whs-rounded whs-bg-white whs-py-4 whs-px-4 whs-leading-tight whs-text-gray-700 whs-placeholder:whs-text-gray-400 whs-focus:outline-none whs-focus:whs-ring-1 whs-focus:whs-border-teal-200 whs-mb-4"
        />
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="whs-border whs-border-gray-300 whs-font-sans whs-focus:whs-shadow-outline whs-w-full whs-appearance-none whs-rounded whs-bg-white whs-py-4 whs-px-4 whs-leading-tight whs-text-gray-700 whs-placeholder:whs-text-gray-400 whs-focus:outline-none whs-focus:whs-ring-1 whs-focus:whs-border-teal-200 whs-mb-4"
        />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
