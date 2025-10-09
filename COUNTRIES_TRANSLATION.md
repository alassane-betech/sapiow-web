# 🌍 Gestion de la traduction des noms de pays

## 📋 Vue d'ensemble

Le système de traduction des pays permet d'afficher les noms de pays dans la langue de l'utilisateur (français ou anglais) tout en conservant les codes ISO et indicatifs téléphoniques.

## 🗂️ Structure

### Fichiers de traduction

Les traductions des noms de pays sont stockées dans :
- **`/src/messages/fr.ts`** : Noms de pays en français
- **`/src/messages/en.ts`** : Noms de pays en anglais

Chaque pays est référencé par son code ISO (ex: `FR`, `US`, `CA`).

### Fichier de constantes

**`/src/constants/countries.ts`** contient :
- Interface `Country` avec les propriétés : `code`, `name`, `dialCode`, `flag`
- Liste complète des pays avec leurs codes ISO et indicatifs
- Fonctions utilitaires : `findCountryByCode()`, `findCountryByDialCode()`, `searchCountries()`, `detectCountryFromPhone()`

### Fonction utilitaire

**`/src/utils/getCountryName.ts`** fournit :
- `useCountryName()` : Hook pour composants clients
- `getCountryName()` : Fonction pour composants serveur

## 🚀 Utilisation

### Dans un composant client

```typescript
"use client";
import { useCountryName } from "@/utils/getCountryName";

export default function MyComponent() {
  const getCountryName = useCountryName();
  
  return (
    <div>
      <p>{getCountryName('FR')}</p>  {/* Affiche "France" ou "France" */}
      <p>{getCountryName('US')}</p>  {/* Affiche "États-Unis" ou "United States" */}
      <p>{getCountryName('CA')}</p>  {/* Affiche "Canada" ou "Canada" */}
    </div>
  );
}
```

### Dans un composant serveur

```typescript
import { getTranslations } from "next-intl/server";
import { getCountryName } from "@/utils/getCountryName";

export default async function MyServerComponent() {
  const t = await getTranslations();
  
  return (
    <div>
      <p>{getCountryName('FR', t)}</p>
      <p>{getCountryName('US', t)}</p>
    </div>
  );
}
```

### Avec la liste complète des pays

```typescript
import { countries } from "@/constants/countries";
import { useCountryName } from "@/utils/getCountryName";

export default function CountryList() {
  const getCountryName = useCountryName();
  
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.code}>
          <img src={`/flags/${country.flag}.svg`} alt={getCountryName(country.code)} />
          <span>{getCountryName(country.code)}</span>
          <span>{country.dialCode}</span>
        </li>
      ))}
    </ul>
  );
}
```

## 📦 Composants intégrés

### PhoneNumber Component

Le composant `PhoneNumber` utilise automatiquement les traductions :

```typescript
import PhoneInput from "@/components/common/PhoneNumber";

<PhoneInput
  value={phone}
  countryCode={countryCode}
  onChange={(value, country, formatted) => {
    setPhone(value);
    setCountryCode(country.code);
  }}
  placeholder="Votre numéro"
  label="Téléphone"
/>
```

Les noms de pays dans le dropdown sont automatiquement traduits selon la locale active.

## 🌐 Pays supportés

### Afrique (55 pays)
Algérie, Angola, Bénin, Botswana, Burkina Faso, Burundi, Cap-Vert, Cameroun, etc.

### Europe (42 pays)
France, Allemagne, Royaume-Uni, Espagne, Italie, Belgique, Suisse, etc.

### Asie (48 pays)
Chine, Japon, Inde, Corée du Sud, Thaïlande, Vietnam, etc.

### Amériques (35 pays)
États-Unis, Canada, Mexique, Brésil, Argentine, Chili, etc.

### Océanie (14 pays)
Australie, Nouvelle-Zélande, Fidji, etc.

**Total : 194 pays**

## 🔧 Maintenance

### Ajouter un nouveau pays

1. **Ajouter dans `/src/constants/countries.ts`** :
```typescript
{ code: 'XX', name: 'Nom temporaire', dialCode: '+XXX', flag: 'xx' }
```

2. **Ajouter les traductions dans `/src/messages/fr.ts`** :
```typescript
countries: {
  // ...
  XX: "Nom en français",
}
```

3. **Ajouter les traductions dans `/src/messages/en.ts`** :
```typescript
countries: {
  // ...
  XX: "Name in English",
}
```

### Modifier un nom de pays

Il suffit de modifier la traduction dans les fichiers `fr.ts` et `en.ts`. Le code ISO et l'indicatif restent inchangés dans `countries.ts`.

## ✅ Avantages

- ✅ **Expérience utilisateur localisée** : Chaque utilisateur voit les noms de pays dans sa langue
- ✅ **Maintenance simplifiée** : Les traductions sont centralisées
- ✅ **Cohérence** : Utilise le même système de traduction que le reste de l'application
- ✅ **Performance** : Les traductions sont chargées de manière optimisée par next-intl
- ✅ **Accessibilité** : Les alt texts des drapeaux sont traduits
- ✅ **Recherche intelligente** : La recherche de pays fonctionne dans la langue de l'utilisateur

## 🎯 Exemple complet : PhoneNumber avec traductions

Le composant `PhoneNumber` intègre automatiquement :
- ✅ Noms de pays traduits dans le dropdown
- ✅ Alt texts traduits pour les drapeaux
- ✅ Message "Aucun pays trouvé" / "No country found" traduit
- ✅ Recherche fonctionnant avec les noms traduits

```typescript
// Le composant utilise automatiquement :
const getCountryName = useCountryName();

// Pour afficher les noms traduits :
{getCountryName(country.code)}

// Pour les alt texts :
alt={getCountryName(country.code)}
```

## 📚 Ressources

- **next-intl** : https://next-intl-docs.vercel.app/
- **Codes ISO 3166-1** : https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
- **Indicatifs téléphoniques** : https://en.wikipedia.org/wiki/List_of_country_calling_codes
