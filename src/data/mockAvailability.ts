import { AvailabilityEvents } from '@/types/availability';

// Avatars centralisés pour éviter la duplication
const AVATARS = {
  PROF_1: '/assets/prof.jpg',
  PROF_2: '/assets/prof1.jpg',
} as const;

// Fonction helper pour générer des données sans duplication
const createUser = (
  id: number,
  name: string,
  avatar: string,
  time: string,
  description: string,
  duration: string
) => ({
  id,
  name,
  avatar,
  time,
  description,
  duration,
});

export const mockAvailabilityEvents: AvailabilityEvents = {
  6: {
    type: 'active',
    users: [
      createUser(1, 'Marie Dubois', AVATARS.PROF_1, '10:00', '60-minute Deep Dive', '60mn'),
      createUser(2, 'Jean Martin', AVATARS.PROF_2, '14:00', 'Session développement personnel', '45mn'),
    ],
  },
  8: {
    type: 'unavailable',
    users: [],
  },
  9: {
    type: 'active',
    users: [
      createUser(3, 'Sophie Leroy', AVATARS.PROF_1, '09:00', 'Entretien d\'orientation', '30mn'),
      createUser(4, 'Pierre Dupont', AVATARS.PROF_2, '16:00', 'Coaching professionnel', '60mn'),
    ],
  },
  11: {
    type: 'unavailable',
    users: [],
  },
  12: {
    type: 'unavailable',
    users: [],
  },
  13: {
    type: 'unavailable',
    users: [],
  },
  14: {
    type: 'unavailable',
    users: [],
  },
  15: {
    type: 'unavailable',
    users: [],
  },
  19: {
    type: 'complete',
    users: [
      createUser(5, 'Lucien Moreau', AVATARS.PROF_1, '11:00', 'Session de suivi', '45mn'),
      createUser(6, 'Camille Petit', AVATARS.PROF_2, '15:00', 'Consultation spécialisée', '90mn'),
    ],
  },
  22: {
    type: 'unavailable',
    users: [],
  },
  29: {
    type: 'unavailable',
    users: [],
  },
};
