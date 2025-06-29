export interface Country {
    code: string;
    name: string;
    dialCode: string;
    flag: string;
  }
  
  // Liste complète des pays avec indicatifs et codes pour les drapeaux
  export const countries: Country[] = [
    // Afrique
    { code: 'DZ', name: 'Algérie', dialCode: '+213', flag: 'dz' },
    { code: 'AO', name: 'Angola', dialCode: '+244', flag: 'ao' },
    { code: 'BJ', name: 'Bénin', dialCode: '+229', flag: 'bj' },
    { code: 'BW', name: 'Botswana', dialCode: '+267', flag: 'bw' },
    { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: 'bf' },
    { code: 'BI', name: 'Burundi', dialCode: '+257', flag: 'bi' },
    { code: 'CV', name: 'Cap-Vert', dialCode: '+238', flag: 'cv' },
    { code: 'CM', name: 'Cameroun', dialCode: '+237', flag: 'cm' },
    { code: 'CF', name: 'République centrafricaine', dialCode: '+236', flag: 'cf' },
    { code: 'TD', name: 'Tchad', dialCode: '+235', flag: 'td' },
    { code: 'KM', name: 'Comores', dialCode: '+269', flag: 'km' },
    { code: 'CG', name: 'Congo', dialCode: '+242', flag: 'cg' },
    { code: 'CD', name: 'République démocratique du Congo', dialCode: '+243', flag: 'cd' },
    { code: 'CI', name: 'Côte d\'Ivoire', dialCode: '+225', flag: 'ci' },
    { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: 'dj' },
    { code: 'EG', name: 'Égypte', dialCode: '+20', flag: 'eg' },
    { code: 'GQ', name: 'Guinée équatoriale', dialCode: '+240', flag: 'gq' },
    { code: 'ER', name: 'Érythrée', dialCode: '+291', flag: 'er' },
    { code: 'ET', name: 'Éthiopie', dialCode: '+251', flag: 'et' },
    { code: 'GA', name: 'Gabon', dialCode: '+241', flag: 'ga' },
    { code: 'GM', name: 'Gambie', dialCode: '+220', flag: 'gm' },
    { code: 'GH', name: 'Ghana', dialCode: '+233', flag: 'gh' },
    { code: 'GN', name: 'Guinée', dialCode: '+224', flag: 'gn' },
    { code: 'GW', name: 'Guinée-Bissau', dialCode: '+245', flag: 'gw' },
    { code: 'KE', name: 'Kenya', dialCode: '+254', flag: 'ke' },
    { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: 'ls' },
    { code: 'LR', name: 'Libéria', dialCode: '+231', flag: 'lr' },
    { code: 'LY', name: 'Libye', dialCode: '+218', flag: 'ly' },
    { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: 'mg' },
    { code: 'MW', name: 'Malawi', dialCode: '+265', flag: 'mw' },
    { code: 'ML', name: 'Mali', dialCode: '+223', flag: 'ml' },
    { code: 'MR', name: 'Mauritanie', dialCode: '+222', flag: 'mr' },
    { code: 'MU', name: 'Maurice', dialCode: '+230', flag: 'mu' },
    { code: 'MA', name: 'Maroc', dialCode: '+212', flag: 'ma' },
    { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: 'mz' },
    { code: 'NA', name: 'Namibie', dialCode: '+264', flag: 'na' },
    { code: 'NE', name: 'Niger', dialCode: '+227', flag: 'ne' },
    { code: 'NG', name: 'Nigéria', dialCode: '+234', flag: 'ng' },
    { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: 'rw' },
    { code: 'ST', name: 'Sao Tomé-et-Principe', dialCode: '+239', flag: 'st' },
    { code: 'SN', name: 'Sénégal', dialCode: '+221', flag: 'sn' },
    { code: 'SC', name: 'Seychelles', dialCode: '+248', flag: 'sc' },
    { code: 'SL', name: 'Sierra Leone', dialCode: '+232', flag: 'sl' },
    { code: 'SO', name: 'Somalie', dialCode: '+252', flag: 'so' },
    { code: 'ZA', name: 'Afrique du Sud', dialCode: '+27', flag: 'za' },
    { code: 'SS', name: 'Soudan du Sud', dialCode: '+211', flag: 'ss' },
    { code: 'SD', name: 'Soudan', dialCode: '+249', flag: 'sd' },
    { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: 'sz' },
    { code: 'TZ', name: 'Tanzanie', dialCode: '+255', flag: 'tz' },
    { code: 'TG', name: 'Togo', dialCode: '+228', flag: 'tg' },
    { code: 'TN', name: 'Tunisie', dialCode: '+216', flag: 'tn' },
    { code: 'UG', name: 'Ouganda', dialCode: '+256', flag: 'ug' },
    { code: 'ZM', name: 'Zambie', dialCode: '+260', flag: 'zm' },
    { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: 'zw' },
  
    // Europe
    { code: 'AD', name: 'Andorre', dialCode: '+376', flag: 'ad' },
    { code: 'AL', name: 'Albanie', dialCode: '+355', flag: 'al' },
    { code: 'AT', name: 'Autriche', dialCode: '+43', flag: 'at' },
    { code: 'BY', name: 'Biélorussie', dialCode: '+375', flag: 'by' },
    { code: 'BE', name: 'Belgique', dialCode: '+32', flag: 'be' },
    { code: 'BA', name: 'Bosnie-Herzégovine', dialCode: '+387', flag: 'ba' },
    { code: 'BG', name: 'Bulgarie', dialCode: '+359', flag: 'bg' },
    { code: 'HR', name: 'Croatie', dialCode: '+385', flag: 'hr' },
    { code: 'CY', name: 'Chypre', dialCode: '+357', flag: 'cy' },
    { code: 'CZ', name: 'République tchèque', dialCode: '+420', flag: 'cz' },
    { code: 'DK', name: 'Danemark', dialCode: '+45', flag: 'dk' },
    { code: 'EE', name: 'Estonie', dialCode: '+372', flag: 'ee' },
    { code: 'FI', name: 'Finlande', dialCode: '+358', flag: 'fi' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: 'fr' },
    { code: 'DE', name: 'Allemagne', dialCode: '+49', flag: 'de' },
    { code: 'GR', name: 'Grèce', dialCode: '+30', flag: 'gr' },
    { code: 'HU', name: 'Hongrie', dialCode: '+36', flag: 'hu' },
    { code: 'IS', name: 'Islande', dialCode: '+354', flag: 'is' },
    { code: 'IE', name: 'Irlande', dialCode: '+353', flag: 'ie' },
    { code: 'IT', name: 'Italie', dialCode: '+39', flag: 'it' },
    { code: 'LV', name: 'Lettonie', dialCode: '+371', flag: 'lv' },
    { code: 'LI', name: 'Liechtenstein', dialCode: '+423', flag: 'li' },
    { code: 'LT', name: 'Lituanie', dialCode: '+370', flag: 'lt' },
    { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: 'lu' },
    { code: 'MT', name: 'Malte', dialCode: '+356', flag: 'mt' },
    { code: 'MD', name: 'Moldavie', dialCode: '+373', flag: 'md' },
    { code: 'MC', name: 'Monaco', dialCode: '+377', flag: 'mc' },
    { code: 'ME', name: 'Monténégro', dialCode: '+382', flag: 'me' },
    { code: 'NL', name: 'Pays-Bas', dialCode: '+31', flag: 'nl' },
    { code: 'MK', name: 'Macédoine du Nord', dialCode: '+389', flag: 'mk' },
    { code: 'NO', name: 'Norvège', dialCode: '+47', flag: 'no' },
    { code: 'PL', name: 'Pologne', dialCode: '+48', flag: 'pl' },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: 'pt' },
    { code: 'RO', name: 'Roumanie', dialCode: '+40', flag: 'ro' },
    { code: 'RU', name: 'Russie', dialCode: '+7', flag: 'ru' },
    { code: 'SM', name: 'Saint-Marin', dialCode: '+378', flag: 'sm' },
    { code: 'RS', name: 'Serbie', dialCode: '+381', flag: 'rs' },
    { code: 'SK', name: 'Slovaquie', dialCode: '+421', flag: 'sk' },
    { code: 'SI', name: 'Slovénie', dialCode: '+386', flag: 'si' },
    { code: 'ES', name: 'Espagne', dialCode: '+34', flag: 'es' },
    { code: 'SE', name: 'Suède', dialCode: '+46', flag: 'se' },
    { code: 'CH', name: 'Suisse', dialCode: '+41', flag: 'ch' },
    { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: 'ua' },
    { code: 'GB', name: 'Royaume-Uni', dialCode: '+44', flag: 'gb' },
    { code: 'VA', name: 'Vatican', dialCode: '+39', flag: 'va' },
  
    // Asie
    { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: 'af' },
    { code: 'AM', name: 'Arménie', dialCode: '+374', flag: 'am' },
    { code: 'AZ', name: 'Azerbaïdjan', dialCode: '+994', flag: 'az' },
    { code: 'BH', name: 'Bahreïn', dialCode: '+973', flag: 'bh' },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: 'bd' },
    { code: 'BT', name: 'Bhoutan', dialCode: '+975', flag: 'bt' },
    { code: 'BN', name: 'Brunéi', dialCode: '+673', flag: 'bn' },
    { code: 'KH', name: 'Cambodge', dialCode: '+855', flag: 'kh' },
    { code: 'CN', name: 'Chine', dialCode: '+86', flag: 'cn' },
    { code: 'GE', name: 'Géorgie', dialCode: '+995', flag: 'ge' },
    { code: 'IN', name: 'Inde', dialCode: '+91', flag: 'in' },
    { code: 'ID', name: 'Indonésie', dialCode: '+62', flag: 'id' },
    { code: 'IR', name: 'Iran', dialCode: '+98', flag: 'ir' },
    { code: 'IQ', name: 'Irak', dialCode: '+964', flag: 'iq' },
    { code: 'IL', name: 'Israël', dialCode: '+972', flag: 'il' },
    { code: 'JP', name: 'Japon', dialCode: '+81', flag: 'jp' },
    { code: 'JO', name: 'Jordanie', dialCode: '+962', flag: 'jo' },
    { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: 'kz' },
    { code: 'KW', name: 'Koweït', dialCode: '+965', flag: 'kw' },
    { code: 'KG', name: 'Kirghizistan', dialCode: '+996', flag: 'kg' },
    { code: 'LA', name: 'Laos', dialCode: '+856', flag: 'la' },
    { code: 'LB', name: 'Liban', dialCode: '+961', flag: 'lb' },
    { code: 'MY', name: 'Malaisie', dialCode: '+60', flag: 'my' },
    { code: 'MV', name: 'Maldives', dialCode: '+960', flag: 'mv' },
    { code: 'MN', name: 'Mongolie', dialCode: '+976', flag: 'mn' },
    { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: 'mm' },
    { code: 'NP', name: 'Népal', dialCode: '+977', flag: 'np' },
    { code: 'KP', name: 'Corée du Nord', dialCode: '+850', flag: 'kp' },
    { code: 'OM', name: 'Oman', dialCode: '+968', flag: 'om' },
    { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: 'pk' },
    { code: 'PS', name: 'Palestine', dialCode: '+970', flag: 'ps' },
    { code: 'PH', name: 'Philippines', dialCode: '+63', flag: 'ph' },
    { code: 'QA', name: 'Qatar', dialCode: '+974', flag: 'qa' },
    { code: 'SA', name: 'Arabie saoudite', dialCode: '+966', flag: 'sa' },
    { code: 'SG', name: 'Singapour', dialCode: '+65', flag: 'sg' },
    { code: 'KR', name: 'Corée du Sud', dialCode: '+82', flag: 'kr' },
    { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: 'lk' },
    { code: 'SY', name: 'Syrie', dialCode: '+963', flag: 'sy' },
    { code: 'TW', name: 'Taïwan', dialCode: '+886', flag: 'tw' },
    { code: 'TJ', name: 'Tadjikistan', dialCode: '+992', flag: 'tj' },
    { code: 'TH', name: 'Thaïlande', dialCode: '+66', flag: 'th' },
    { code: 'TL', name: 'Timor oriental', dialCode: '+670', flag: 'tl' },
    { code: 'TR', name: 'Turquie', dialCode: '+90', flag: 'tr' },
    { code: 'TM', name: 'Turkménistan', dialCode: '+993', flag: 'tm' },
    { code: 'AE', name: 'Émirats arabes unis', dialCode: '+971', flag: 'ae' },
    { code: 'UZ', name: 'Ouzbékistan', dialCode: '+998', flag: 'uz' },
    { code: 'VN', name: 'Viêt Nam', dialCode: '+84', flag: 'vn' },
    { code: 'YE', name: 'Yémen', dialCode: '+967', flag: 'ye' },
  
    // Amérique du Nord
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'ca' },
    { code: 'MX', name: 'Mexique', dialCode: '+52', flag: 'mx' },
    { code: 'US', name: 'États-Unis', dialCode: '+1', flag: 'us' },
  
    // Amérique centrale
    { code: 'BZ', name: 'Belize', dialCode: '+501', flag: 'bz' },
    { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: 'cr' },
    { code: 'SV', name: 'Salvador', dialCode: '+503', flag: 'sv' },
    { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: 'gt' },
    { code: 'HN', name: 'Honduras', dialCode: '+504', flag: 'hn' },
    { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: 'ni' },
    { code: 'PA', name: 'Panama', dialCode: '+507', flag: 'pa' },
  
    // Amérique du Sud
    { code: 'AR', name: 'Argentine', dialCode: '+54', flag: 'ar' },
    { code: 'BO', name: 'Bolivie', dialCode: '+591', flag: 'bo' },
    { code: 'BR', name: 'Brésil', dialCode: '+55', flag: 'br' },
    { code: 'CL', name: 'Chili', dialCode: '+56', flag: 'cl' },
    { code: 'CO', name: 'Colombie', dialCode: '+57', flag: 'co' },
    { code: 'EC', name: 'Équateur', dialCode: '+593', flag: 'ec' },
    { code: 'FK', name: 'Îles Malouines', dialCode: '+500', flag: 'fk' },
    { code: 'GF', name: 'Guyane française', dialCode: '+594', flag: 'gf' },
    { code: 'GY', name: 'Guyana', dialCode: '+592', flag: 'gy' },
    { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: 'py' },
    { code: 'PE', name: 'Pérou', dialCode: '+51', flag: 'pe' },
    { code: 'SR', name: 'Suriname', dialCode: '+597', flag: 'sr' },
    { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: 'uy' },
    { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: 've' },
  
    // Caraïbes
    { code: 'AG', name: 'Antigua-et-Barbuda', dialCode: '+1268', flag: 'ag' },
    { code: 'BS', name: 'Bahamas', dialCode: '+1242', flag: 'bs' },
    { code: 'BB', name: 'Barbade', dialCode: '+1246', flag: 'bb' },
    { code: 'CU', name: 'Cuba', dialCode: '+53', flag: 'cu' },
    { code: 'DM', name: 'Dominique', dialCode: '+1767', flag: 'dm' },
    { code: 'DO', name: 'République dominicaine', dialCode: '+1', flag: 'do' },
    { code: 'GD', name: 'Grenade', dialCode: '+1473', flag: 'gd' },
    { code: 'HT', name: 'Haïti', dialCode: '+509', flag: 'ht' },
    { code: 'JM', name: 'Jamaïque', dialCode: '+1876', flag: 'jm' },
    { code: 'KN', name: 'Saint-Christophe-et-Niévès', dialCode: '+1869', flag: 'kn' },
    { code: 'LC', name: 'Sainte-Lucie', dialCode: '+1758', flag: 'lc' },
    { code: 'VC', name: 'Saint-Vincent-et-les Grenadines', dialCode: '+1784', flag: 'vc' },
    { code: 'TT', name: 'Trinité-et-Tobago', dialCode: '+1868', flag: 'tt' },
  
    // Océanie
    { code: 'AU', name: 'Australie', dialCode: '+61', flag: 'au' },
    { code: 'FJ', name: 'Fidji', dialCode: '+679', flag: 'fj' },
    { code: 'KI', name: 'Kiribati', dialCode: '+686', flag: 'ki' },
    { code: 'MH', name: 'Îles Marshall', dialCode: '+692', flag: 'mh' },
    { code: 'FM', name: 'Micronésie', dialCode: '+691', flag: 'fm' },
    { code: 'NR', name: 'Nauru', dialCode: '+674', flag: 'nr' },
    { code: 'NZ', name: 'Nouvelle-Zélande', dialCode: '+64', flag: 'nz' },
    { code: 'PW', name: 'Palaos', dialCode: '+680', flag: 'pw' },
    { code: 'PG', name: 'Papouasie-Nouvelle-Guinée', dialCode: '+675', flag: 'pg' },
    { code: 'WS', name: 'Samoa', dialCode: '+685', flag: 'ws' },
    { code: 'SB', name: 'Îles Salomon', dialCode: '+677', flag: 'sb' },
    { code: 'TO', name: 'Tonga', dialCode: '+676', flag: 'to' },
    { code: 'TV', name: 'Tuvalu', dialCode: '+688', flag: 'tv' },
    { code: 'VU', name: 'Vanuatu', dialCode: '+678', flag: 'vu' },
  ];
  
  // Utilitaires pour les pays
  export const findCountryByCode = (code: string): Country | undefined => {
    return countries.find(country => country.code === code);
  };
  
  export const findCountryByDialCode = (dialCode: string): Country | undefined => {
    return countries.find(country => country.dialCode === dialCode);
  };
  
  export const searchCountries = (searchTerm: string): Country[] => {
    if (!searchTerm.trim()) return countries;
    
    const term = searchTerm.toLowerCase();
    return countries.filter(country =>
      country.name.toLowerCase().includes(term) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(term)
    );
  };
  
  // Détecter automatiquement le pays basé sur un numéro de téléphone existant
  export const detectCountryFromPhone = (phone: string, savedCountryCode?: string): Country => {
    // Si on a le code du pays sauvegardé, l'utiliser en priorité
    if (savedCountryCode) {
      const savedCountry = findCountryByCode(savedCountryCode);
      if (savedCountry) return savedCountry;
    }
  
    // Si le numéro commence par un indicatif, essayer de le détecter
    if (phone.startsWith('+')) {
      // Trier les pays par longueur d'indicatif (plus long en premier)
      const sortedCountries = [...countries].sort((a, b) => b.dialCode.length - a.dialCode.length);
      
      for (const country of sortedCountries) {
        if (phone.startsWith(country.dialCode)) {
          return country;
        }
      }
    }
  
    // Par défaut, retourner la France
    return findCountryByCode('FR') || countries[0];
  }; 