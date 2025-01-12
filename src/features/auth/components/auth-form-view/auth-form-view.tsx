"use client";

import { Button } from "@/components/button/button";
import { useAuth } from "../../contexts/auth-provider";
import { UsernameForm } from "../username-form/username-form";
import { PasswordForm } from "../password-form/password-form";
import { SuccessfulAuthMessage } from "../successful-auth-message/successful-auth-message";

export const AuthFormView = () => {
  const { secureWord, username, loginStep, isAuthenticated, setLoginStep } =
    useAuth();

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

          {loginStep === "password" ? <PasswordForm /> : null}
        </div>
      ) : null}

      {isAuthenticated ? <SuccessfulAuthMessage /> : null}
    </div>
  );
};
