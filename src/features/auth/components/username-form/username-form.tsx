"use client";

import { Input } from "@/components/input/input";
import { useState } from "react";
import handleSubmitUsername from "../../actions/handle-submit-username";
import { Button } from "@/components/button/button";

export const UsernameForm = () => {
  // Note: Ideally should use `react-hook-form`, but for simplicity let's use `useState` for now
  const [username, setUsername] = useState<string>("");

  return (
    <form
      action={handleSubmitUsername}
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
