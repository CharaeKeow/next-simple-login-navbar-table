import { Navbar } from "@/components/navbar/navbar";
import { AuthProvider } from "@/features/auth/contexts/auth-provider";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
