import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-provider";

const SUCCESSFUL_COUNTDOWN_REDIRECT_IN_SECONDS = 3;

export const SuccessfulAuthMessage = () => {
  const { isAuthenticated } = useAuth();

  const [countdown, setCountdown] = useState(
    SUCCESSFUL_COUNTDOWN_REDIRECT_IN_SECONDS
  );
  const router = useRouter();

  // Effect for handling countdown for redirection
  useEffect(() => {
    let countdownIntervalId: NodeJS.Timeout;

    if (isAuthenticated && countdown > 0) {
      countdownIntervalId = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }

    return () => {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    };
  }, [countdown, isAuthenticated]);

  // Effect for redirection when countdown is 0
  useEffect(() => {
    if (isAuthenticated && countdown === 0) {
      // Redirect to `transaction-history` page
      router.push("/transaction-history");
    }
  }, [countdown, isAuthenticated, router]);

  return (
    <div className="flex flex-col items-center gap-y-4 w-[400px] px-6 py-8 mx-auto">
      <span>Login successful. Redirecting in {countdown} second</span>
    </div>
  );
};
