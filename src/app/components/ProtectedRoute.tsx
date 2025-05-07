import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/lib/store";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
      router.push("/login");
    }
  }, [isAuthenticated, role]);

  return <>{children}</>;
}
