"use client";

import { Button } from "@/components/button/button";
import { useAuth } from "../../contexts/auth-provider";
import { UsernameForm } from "../username-form/username-form";
import { Input } from "@/components/input/input";
import { loginUser } from "../../actions/login-user";
import { useActionState } from "react";

export const AuthFormView = () => {
  const { secureWord, username, loginStep, setLoginStep } = useAuth();

  const [state, formAction] = useActionState(loginUser, undefined);

  console.log({ loginStep });
  console.log({ state });

  // On dev mode this will be invoked twice, due to strict mode. But on prod, it will be invoked just once (tested)
  // Another way to go with this is to use `onSubmit` on form instead, which allow us to `await` server action
  // Though not sure which one is the "right" approach for password field
  if (state && state.success) {
    alert("Login successful!");
  }

  return (
    <div>
      {loginStep === "username" ? <UsernameForm /> : null}
      {loginStep === "secureWord" || loginStep === "password" ? (
        <div className="flex flex-col items-center gap-y-4 w-[400px] px-6 py-8 mx-auto">
          <div>Hi, {username}</div>
          <div>
            Your Secure Word is:{" "}
            <span className="font-bold italic">{secureWord}</span>
          </div>

          {loginStep === "secureWord" && (
            <Button onClick={() => setLoginStep("password")}>Next</Button>
          )}

          {loginStep === "password" ? (
            <form
              action={formAction}
              className="flex flex-col items-center gap-y-4"
            >
              {/* Hidden input field for username, with the username value from the provider (set in previous step as the username) */}
              {/* Alternatively, we can directly pass this in the server action, but prefer this way since it requires less step imo */}
              <Input
                name="username"
                id="username"
                type="hidden"
                value={username}
              />
              <div className="flex gap-x-2 items-center">
                <label htmlFor="password">Password: </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-[240px]"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
