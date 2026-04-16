import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // Allow all users to access protected routes in standalone mode
  return <>{children}</>;
};

