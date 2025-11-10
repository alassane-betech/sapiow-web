# Résolution de l'erreur "Too Many Connections" Stream

## Problème

```
Error: {"code":71,"StatusCode":403,"message":"WS failed with code: 71: ErrTooManyConnections 
and reason: The maximum number of connections allowed per user (for development apps) is 30."}
```

## Cause

En mode développement, Stream limite à **30 connexions simultanées** par utilisateur. Cette erreur survient quand :
- Le hot reload crée de nouvelles connexions sans fermer les anciennes
- Les composants ne nettoient pas correctement les connexions au démontage
- Plusieurs instances du client Stream sont créées pour le même utilisateur

## Solutions implémentées

### 1. Singleton Pattern ✅

**Fichier**: `src/app/[locale]/VideoCall/hooks/useVideoCallSimple.ts`

```typescript
// Map globale pour stocker UNE instance par utilisateur
const clientInstances = new Map<string, StreamVideoClient>();

const getOrCreateClient = async (apiKey, user, token) => {
  // Réutilise le client existant si disponible
  const existingClient = clientInstances.get(user.id);
  if (existingClient) {
    return existingClient; // ♻️ Réutilisation
  }
  
  // Crée un nouveau client seulement si nécessaire
  const newClient = new StreamVideoClient({ apiKey, user, token });
  clientInstances.set(user.id, newClient);
  return newClient;
};
```

### 2. Nettoyage global lors de la déconnexion ✅

**Fichier**: `src/utils/streamCleanup.ts`

Fonction utilitaire pour nettoyer TOUTES les connexions :

```typescript
export const cleanupAllStreamConnections = async () => {
  // Ferme toutes les connexions Stream actives
};
```

**Intégration dans AccountSidebar** :

```typescript
const handleLogout = async () => {
  // 0. Nettoyer TOUTES les connexions Stream
  await cleanupAllStreamConnections();
  
  // 1. Déconnexion Supabase
  await supabase.auth.signOut();
  
  // 2. Nettoyer localStorage et caches
  // ...
};
```

### 3. Nettoyage au démontage des composants ✅

Chaque composant vidéo nettoie ses ressources :

```typescript
useEffect(() => {
  return () => {
    if (call) {
      call.leave();
    }
    if (client && userId) {
      cleanupClient(userId);
    }
  };
}, []);
```

## Actions immédiates

### Option 1 : Nettoyer manuellement (RAPIDE)

1. **Ouvrir la console du navigateur** (F12)
2. **Exécuter ce script** :

```javascript
// Recharger la page pour fermer toutes les connexions
window.location.reload();

// OU déconnecter/reconnecter votre compte
```

### Option 2 : Attendre l'expiration

Les connexions expirent automatiquement après **quelques minutes** d'inactivité.

### Option 3 : Redémarrer le serveur de développement

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

## Prévention future

### ✅ Bonnes pratiques

1. **Toujours déconnecter** avant de fermer l'application
2. **Éviter les refresh** pendant un appel vidéo actif
3. **Utiliser le bouton de déconnexion** au lieu de fermer l'onglet

### ❌ À éviter

1. **Ne pas** ouvrir plusieurs onglets avec le même compte
2. **Ne pas** rafraîchir la page pendant un appel
3. **Ne pas** fermer l'onglet sans terminer l'appel

## Vérification

Pour vérifier le nombre de connexions actives :

```javascript
// Dans la console du navigateur (F12)
window.debugStreamConnections();
// Affiche: 📊 Connexions Stream actives: X
```

Ou regardez les logs dans la console :
- `📊 Nombre de connexions avant création: X`
- `📊 Nombre de connexions après création: X`
- `📋 IDs des clients actifs: [...]`
- `♻️ Réutilisation du client existant pour: user123`

## Passage en production

En production, la limite est **beaucoup plus élevée** (généralement illimitée selon votre plan Stream). Cette erreur ne devrait **pas** se produire en production.

## Support

Si le problème persiste :
1. Vider le cache du navigateur
2. Supprimer les cookies
3. Redémarrer le navigateur
4. Contacter le support Stream si nécessaire

## Logs utiles

Les logs suivants indiquent un bon fonctionnement :

```
♻️ Réutilisation du client existant pour: user123
🧹 Nettoyage du client pour: user123
✅ Client nettoyé pour: user123
✅ Toutes les connexions Stream nettoyées
```
