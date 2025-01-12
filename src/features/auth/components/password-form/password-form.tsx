import { Input } from "@/components/input/input";
import { loginUser } from "../../actions/login-user";
import { useActionState } from "react";
import { useAuth } from "../../contexts/auth-provider";
import { Button } from "@/components/button/button";

export const PasswordForm = () => {
  const { loginStep, username } = useAuth();

  const [state, formAction] = useActionState(loginUser, undefined);

  console.log({ loginStep });
  console.log({ state });

  // On dev mode this will be invoked twice, due to strict mode. But on prod, it will be invoked just once (tested)
  // Another way to go with this is to use `onSubmit` on form instead, which allow us to `await` server action
  // Though not sure which one is the "right" approach for password field
  if (state && state.success) {
    console.log("Login successful");
  }

  return (
    <form action={formAction} className="flex flex-col items-center gap-y-4">
      {/* Hidden input field for username, with the username value from the provider (set in previous step as the username) */}
      {/* Alternatively, we can directly pass this in the server action, but prefer this way since it requires less step imo */}
      <Input name="username" id="username" type="hidden" value={username} />
      <div>
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

        {/* Error message */}
        {state && !state.success && state.errors?.password ? (
          <span className="text-red-600 text-sm font-semibold">
            {state.errors?.password}
          </span>
        ) : null}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
