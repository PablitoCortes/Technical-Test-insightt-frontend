import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // 🔥 BYPASS PARA CYPRESS
  if (typeof window !== 'undefined' && (window as any).Cypress) {
    return <>{children}</>;
  }

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};