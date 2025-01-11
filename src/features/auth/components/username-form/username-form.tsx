"use client";

import { Input } from "@/components/input/input";
import { FormEvent, useState } from "react";
import { Button } from "@/components/button/button";
import {
  GetSecureWordRequestResponseError,
  GetSecureWordRequestResponseSuccess,
} from "@/types/api";

export const UsernameForm = () => {
  // Note: Ideally should use `react-hook-form`, but for simplicity let's use `useState` for now
  const [username, setUsername] = useState<string>("");

  // TODO: Lift this up, so the logic can be done in a parent component. Nice use case for Context & Provider
  const [secureWord, setSecureWord] = useState<string | null>(null);

  const handleSubmitUsername = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/getSecureWord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    // TODO: Display this error to user if time permits. This is when react-hook-form will really comes in handy
    if (res.status !== 200) {
      const resData: GetSecureWordRequestResponseError = await res.json();
      console.log("Error getting secure word: ", resData.message);
    }

    const resData: GetSecureWordRequestResponseSuccess = await res.json();
    setSecureWord(resData.secureWord);
  };

  return (
    <form
      onSubmit={handleSubmitUsername}
      className="flex flex-col items-center gap-y-4 w-[400px] px-6 py-8 mx-auto"
    >
      <div className="flex items-center gap-x-4">
        <label htmlFor="username">Username: </label>
        <Input
          id="username"
          name="username"
          placeholder="Username"
          className="w-[240px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {secureWord ? (
        <div>
          Secure Word: <span className="font-bold italic">{secureWord}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        className="w-[124px]"
        disabled={username.length === 0}
      >
        Submit
      </Button>
    </form>
  );
};
