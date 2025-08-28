# AuthGuard - Protection des Routes

Le composant AuthGuard protège automatiquement vos pages en vérifiant l'authentification via `authUtils`.

## Utilisation

### Méthode 1: Avec le HOC `withAuth` (Recommandée)

```tsx
// src/app/dashboard/page.tsx
"use client";

import { withAuth } from "@/components/common/withAuth";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Cette page est protégée automatiquement</p>
    </div>
  );
};

export default withAuth(DashboardPage);
```

### Méthode 2: Avec le composant `AuthGuard`

```tsx
// src/app/profile/page.tsx
"use client";

import { AuthGuard } from "@/components/common/AuthGuard";

const ProfilePage = () => {
  return (
    <AuthGuard>
      <div>
        <h1>Mon Profil</h1>
        <p>Page protégée</p>
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;
```

### Méthode 3: Avec fallback personnalisé

```tsx
// src/app/settings/page.tsx
"use client";

import { AuthGuard } from "@/components/common/AuthGuard";

const SettingsPage = () => {
  const customLoader = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2">Vérification...</span>
    </div>
  );

  return (
    <AuthGuard fallback={customLoader}>
      <div>
        <h1>Paramètres</h1>
        <p>Configuration du compte</p>
      </div>
    </AuthGuard>
  );
};

export default SettingsPage;
```

## Pages à NE PAS protéger

- `/login` - Page de connexion
- `/register` - Page d'inscription  
- `/forgot-password` - Mot de passe oublié
- Pages publiques (landing, à propos, etc.)

## Fonctionnement

1. **Vérification**: Le composant utilise `authUtils.isAuthenticated()` pour vérifier la présence d'un token
2. **Redirection**: Si non authentifié, redirige automatiquement vers `/login`
3. **Fallback**: Affiche un loader pendant la vérification
4. **Protection**: Empêche l'affichage du contenu sans authentification

## Intégration avec le layout

Pour protéger plusieurs pages d'un coup, vous pouvez utiliser AuthGuard dans un layout :

```tsx
// src/app/(protected)/layout.tsx
"use client";

import { AuthGuard } from "@/components/common/AuthGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="protected-layout">
        {children}
      </div>
    </AuthGuard>
  );
}
```

Puis toutes les pages dans le dossier `(protected)` seront automatiquement protégées.
