# Documentation du Système d'Authentification - Sapiow Web

## Vue d'ensemble

Le système d'authentification de Sapiow Web est basé sur trois composants principaux :
- `AuthGuard` : Composant de protection des routes
- `useAuth` : Hook de gestion de l'état d'authentification  
- `authUtils` : Utilitaires de gestion des tokens en localStorage

## 🛡️ AuthGuard Component

### Localisation
`src/components/common/AuthGuard.tsx`

### Fonctionnalité
Composant wrapper qui protège les routes nécessitant une authentification.

### Interface
```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

### Logique de fonctionnement
1. **Loading State** : Affiche un spinner pendant la vérification d'auth
2. **Non authentifié + fallback** : Affiche le composant fallback fourni
3. **Non authentifié sans fallback** : Redirige vers `/login`
4. **Authentifié** : Affiche le contenu protégé (`children`)

### Code complet
```tsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-cobalt"></div>
      </div>
    );
  }

  // Si pas authentifié et fallback fourni
  if (!isAuthenticated && fallback) {
    return <>{fallback}</>;
  }

  // Si pas authentifié sans fallback, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null;
  }

  // Si authentifié, afficher le contenu
  return <>{children}</>;
};
```

## 🎣 useAuth Hook

### Localisation
`src/hooks/useAuth.ts`

### Interface de retour
```typescript
interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (token: string, refreshToken: string, userId: string) => void;
  logout: () => void;
}
```

### États gérés
- `isAuthenticated` : État de connexion
- `isLoading` : État de chargement initial
- `accessToken` : Token d'accès actuel
- `userId` : ID de l'utilisateur connecté

### Méthodes
- `login(token, refreshToken, userId)` : Connecter un utilisateur
- `logout()` : Déconnecter et rediriger vers `/login`

### Code complet
```typescript
import { authUtils } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (token: string, refreshToken: string, userId: string) => void;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = authUtils.getAccessToken();
    const user = authUtils.getUserId();
    
    if (token && user) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserId(user);
    } else {
      setIsAuthenticated(false);
      setAccessToken(null);
      setUserId(null);
    }
    
    setIsLoading(false);
  }, []);

  const login = (token: string, refreshToken: string, userId: string) => {
    authUtils.setTokens(token, refreshToken, userId);
    setIsAuthenticated(true);
    setAccessToken(token);
    setUserId(userId);
  };

  const logout = () => {
    authUtils.clearTokens();
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserId(null);
    router.push("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    accessToken,
    userId,
    login,
    logout,
  };
};
```

## 🔧 authUtils Utilitaires

### Localisation
`src/utils/auth.ts`

### Fonctions disponibles
- `setTokens(accessToken, refreshToken, userId)` : Stocker les tokens
- `getAccessToken()` : Récupérer le token d'accès
- `getRefreshToken()` : Récupérer le token de refresh
- `getUserId()` : Récupérer l'ID utilisateur
- `isAuthenticated()` : Vérifier si authentifié
- `clearTokens()` : Nettoyer tous les tokens
- `getAuthHeaders()` : Headers pour les requêtes API

### Stockage
Utilise **localStorage** pour persister les données :
- `access_token` : Token d'accès
- `refresh_token` : Token de rafraîchissement  
- `user_id` : ID de l'utilisateur

### Code complet
```typescript
export const authUtils = {
  setTokens: (access_token: string, refreshToken: string, userId: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_id", userId);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refresh_token");
  },

  getUserId: (): string | null => {
    return localStorage.getItem("user_id");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },

  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
  },

  getAuthHeaders: (): Record<string, string> => {
    const access_token = authUtils.getAccessToken();
    return access_token ? { Authorization: `Bearer ${access_token}` } : {};
  },
};
```

## 🚀 Utilisation pratique

### Protéger une route
```tsx
import { AuthGuard } from "@/components/common/AuthGuard";

function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Contenu protégé</div>
    </AuthGuard>
  );
}
```

### Avec fallback personnalisé
```tsx
<AuthGuard fallback={<div>Vous devez être connecté</div>}>
  <ProtectedContent />
</AuthGuard>
```

### Dans un composant
```tsx
function MyComponent() {
  const { isAuthenticated, login, logout, accessToken } = useAuth();
  
  const handleLogin = async () => {
    // Après appel API de connexion
    login(responseToken, responseRefreshToken, responseUserId);
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Se déconnecter</button>
      ) : (
        <button onClick={handleLogin}>Se connecter</button>
      )}
    </div>
  );
}
```

### Pour les requêtes API
```typescript
import { authUtils } from "@/utils/auth";

const headers = authUtils.getAuthHeaders();
// Résultat: { Authorization: "Bearer your_token_here" }

fetch("/api/protected-endpoint", {
  headers: {
    ...headers,
    "Content-Type": "application/json"
  }
});
```

## ⚠️ Points importants

1. **localStorage** : Les tokens sont stockés en localStorage (persistant)
2. **Redirection automatique** : AuthGuard redirige vers `/login` si non authentifié
3. **Loading state** : Gestion du chargement initial pour éviter les flashs
4. **Headers automatiques** : `getAuthHeaders()` pour les requêtes API
5. **Déconnexion complète** : `logout()` nettoie tout et redirige

## 🔄 Flow d'authentification

1. **Page load** → `useAuth` vérifie localStorage
2. **Si tokens valides** → `isAuthenticated = true`
3. **Si pas de tokens** → `isAuthenticated = false`
4. **AuthGuard** vérifie l'état et redirige si nécessaire
5. **Login réussi** → `login()` stocke les tokens et met à jour l'état
6. **Logout** → `logout()` nettoie tout et redirige

## 📦 Dépendances

- `next/navigation` : Pour la navigation programmatique
- `react` : Hooks useState, useEffect
- Aucune dépendance externe supplémentaire

---

*Documentation créée le 23/08/2025 - Système d'authentification Sapiow Web*
