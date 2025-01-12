import { Input } from "@/components/input/input";
import { loginUser } from "../../actions/login-user";
import { useActionState, useEffect } from "react";
import { useAuth } from "../../contexts/auth-provider";
import { Button } from "@/components/button/button";
import { useRouter } from "next/navigation";

export const PasswordForm = () => {
  const { loginStep, username, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const [state, formAction] = useActionState(loginUser, undefined);

  console.log({ loginStep });
  console.log({ state });

  useEffect(() => {
    // On dev mode this will be invoked twice, due to strict mode. But on prod, it will be invoked just once (tested)
    // Another way to go with this is to use `onSubmit` on form instead, which allow us to `await` server action and set state inside
    // there instead of relying on `useEffect`
    // TODO: Refactor this to using `onSubmit` later if got time
    if (state && state.success) {
      setIsAuthenticated(true);
      // TODO: Add a simple toast for displaying login successful message

      // Redirect to `transaction-history` page
      router.push("/transaction-history");
    }
  }, [router, setIsAuthenticated, state]);

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
