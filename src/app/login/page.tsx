import { AuthFormView } from "@/features/auth/components/auth-form-view/auth-form-view";

import { AuthProvider } from "@/features/auth/contexts/auth-provider";

export default function LoginPage() {
  return (
    <div>
      <AuthProvider>
        <AuthFormView />
      </AuthProvider>
    </div>
  );
}
