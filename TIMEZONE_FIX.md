# 🌍 Fix du problème de timezone - Blocage de dates

## 🔴 Problème identifié

Les utilisateurs en **France** et **USA** bloquaient une date différente de celle sélectionnée :
- Sélection : **Mardi 11 novembre**
- Date bloquée : **Lundi 10 novembre** ❌

### Cause racine

L'utilisation de `toISOString()` convertit la date en **UTC**, ce qui décale la date d'un jour pour les utilisateurs dans certaines timezones.

#### Exemple concret :

```javascript
// Utilisateur en France (UTC+1) sélectionne "11 Nov 2025 à 00:00" (heure locale)
const selectedDate = new Date(2025, 10, 11, 0, 0, 0);

// ❌ MAUVAIS : toISOString() convertit en UTC
selectedDate.toISOString(); 
// Résultat : "2025-11-10T23:00:00.000Z"
// La date devient le 10 au lieu du 11 !

// ✅ BON : Utiliser les méthodes locales
const year = selectedDate.getFullYear();        // 2025
const month = selectedDate.getMonth() + 1;      // 11
const day = selectedDate.getDate();             // 11
const dateString = `${year}-${month}-${day}`;   // "2025-11-11"
```

## ✅ Solution implémentée

### 1. Fonction utilitaire créée : `formatDateToLocalISO()`

**Fichier** : `src/utils/dateUtils.ts`

```typescript
/**
 * Formate une date en YYYY-MM-DD en utilisant l'heure locale
 * ⚠️ N'utilise PAS toISOString() pour éviter les problèmes de timezone
 */
export const formatDateToLocalISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
```

### 2. Utilisation dans SessionDetailsPanel

**Avant** :
```typescript
const dateString = selectedDate.toISOString().split("T")[0]; // ❌ Problème de timezone
```

**Après** :
```typescript
const dateString = formatDateToLocalISO(selectedDate); // ✅ Préserve la date locale
```

### 3. Comparaison des dates corrigée

**Avant** :
```typescript
const selectedDateString = selectedDate.toISOString().split("T")[0]; // ❌
```

**Après** :
```typescript
const selectedDateString = formatDateToLocalISO(selectedDate); // ✅
```

## 📊 Impact

### Timezones affectées (exemples)

| Timezone | Offset UTC | Problème avant | Après fix |
|----------|-----------|----------------|-----------|
| **France (CET)** | UTC+1 | Décalage -1 jour | ✅ Correct |
| **USA Est (EST)** | UTC-5 | Décalage -1 jour | ✅ Correct |
| **Émirats (GST)** | UTC+4 | Décalage -1 jour | ✅ Correct |
| **Sénégal (GMT)** | UTC+0 | Pas de problème | ✅ Correct |

### Pourquoi le Sénégal n'avait pas le problème ?

Le Sénégal est en **GMT (UTC+0)**, donc `toISOString()` ne décalait pas la date.

## 🔧 Règles pour les développeurs

### ❌ À NE JAMAIS FAIRE

```typescript
// NE PAS utiliser toISOString() pour formater des dates sans heure
const dateString = date.toISOString().split("T")[0]; // ❌
```

### ✅ À FAIRE

```typescript
// Utiliser la fonction utilitaire
import { formatDateToLocalISO } from "@/utils/dateUtils";

const dateString = formatDateToLocalISO(date); // ✅
```

## 🧪 Tests recommandés

Pour tester le fix, simuler différentes timezones :

```javascript
// Dans la console du navigateur
// Changer la timezone du système ou utiliser DevTools

// Test 1 : France (UTC+1)
const date = new Date(2025, 10, 11); // 11 Nov 2025
console.log("toISOString:", date.toISOString().split("T")[0]); // "2025-11-10" ❌
console.log("formatDateToLocalISO:", formatDateToLocalISO(date)); // "2025-11-11" ✅

// Test 2 : USA Est (UTC-5)
// Même résultat : formatDateToLocalISO préserve la date locale
```

## 📝 Fichiers modifiés

1. ✅ `src/utils/dateUtils.ts` - Fonction utilitaire créée
2. ✅ `src/components/common/SessionDetailsPanel.tsx` - Utilisation de la fonction
3. ✅ `TIMEZONE_FIX.md` - Documentation

## 🎯 Validation

Pour valider que le fix fonctionne :

1. **Console logs ajoutés** :
   ```
   🗓️ Détails de la date: {
     année: 2025,
     mois: 11,
     jour: 11,
     formatISO: "2025-11-11",
     timezone: "Europe/Paris",
     offsetMinutes: -60
   }
   ```

2. **Vérifier** que `formatISO` correspond bien au jour sélectionné visuellement dans le calendrier

3. **Tester** avec des utilisateurs en France/USA/Émirats

## 🚀 Déploiement

Ce fix doit être déployé en **priorité haute** car il affecte la fonctionnalité principale de blocage de dates.

---

**Date du fix** : 4 novembre 2025  
**Développeur** : Cascade AI  
**Ticket** : Problème de décalage de dates pour utilisateurs France/USA/Émirats
