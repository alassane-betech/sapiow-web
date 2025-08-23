"use client";

import { ComponentType } from "react";
import { AuthGuard } from "./AuthGuard";

/**
 * HOC pour protéger automatiquement les pages
 * Usage: export default withAuth(MyPageComponent);
 */
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const AuthenticatedComponent = (props: P) => {
    return (
      <AuthGuard>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };

  // Préserver le nom du composant pour le debugging
  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
}

export default withAuth;
