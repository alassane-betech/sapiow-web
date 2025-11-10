/**
 * Utilitaire pour nettoyer toutes les connexions Stream Chat/Video
 * À appeler lors de la déconnexion pour éviter les connexions orphelines
 */

// Référence globale vers la fonction de nettoyage
let globalCleanupFunction: (() => Promise<void>) | null = null;
let globalGetConnectionCount: (() => number) | null = null;

export const registerStreamCleanup = (
  cleanupFn: () => Promise<void>,
  getCountFn?: () => number
) => {
  globalCleanupFunction = cleanupFn;
  if (getCountFn) {
    globalGetConnectionCount = getCountFn;
  }
};

export const cleanupAllStreamConnections = async () => {
  if (globalCleanupFunction) {
    console.log("🧹 Nettoyage de toutes les connexions Stream...");
    try {
      await globalCleanupFunction();
      console.log("✅ Toutes les connexions Stream nettoyées");
    } catch (err) {
      console.warn("⚠️ Erreur lors du nettoyage Stream:", err);
    }
  }
};

export const getActiveConnectionCount = (): number => {
  if (globalGetConnectionCount) {
    return globalGetConnectionCount();
  }
  return 0;
};

// Fonction utilitaire pour déboguer dans la console
if (typeof window !== "undefined") {
  (window as any).debugStreamConnections = () => {
    const count = getActiveConnectionCount();
    console.log(`📊 Connexions Stream actives: ${count}`);
    return count;
  };
}
