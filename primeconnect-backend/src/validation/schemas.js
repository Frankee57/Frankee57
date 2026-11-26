import { z } from 'zod';

const consentement = z.literal(true, 'Votre accord est nécessaire pour traiter votre demande.');
const email = z.string().trim().min(1, "L'e-mail est requis.").email('Adresse e-mail invalide.');
const requiredText = (label, max = 120) => z.string().trim().min(1, `Indiquez ${label}.`).max(max);
const optionalText = (max) => z.string().trim().max(max).optional().default('');

function toE164Cameroon(raw) {
  let t = raw.replace(/\D/g, '');
  if (t.startsWith('00237')) t = t.slice(5);
  else if (t.startsWith('237') && t.length === 12) t = t.slice(3);
  return /^[26]\d{8}$/.test(t) ? `+237${t}` : null;
}

export const contactSchema = z.object({
  nom: requiredText('votre nom'),
  societe: optionalText(120),
  fonction: optionalText(80),
  email,
  pays: z.enum(['FR', 'BE', 'CH', 'LU', 'CA', 'XX'], 'Choisissez votre pays.'),
  sujet: z.enum(['projet', 'devis', 'debordement', 'partenariat', 'donnees', 'autre'], "Choisissez l'objet de votre message."),
  message: z.string().trim().min(20, 'Votre message est trop court (20 caractères minimum).').max(3000, '3 000 caractères au maximum.'),
  consentement,
});

export const careerSchema = z
  .object({
    prenom: requiredText('votre prénom'),
    nom: requiredText('votre nom'),
    email,
    telephone: z.string().trim().min(9, 'Indiquez votre numéro de téléphone.').max(20),
    ville: z.enum(['Douala', 'Yaoundé', 'Autre'], 'Choisissez une ville.'),
    poste: z.enum(['teleconseiller', 'superviseur', 'back-office', 'autre'], 'Choisissez un poste.'),
    experience: z.enum(['aucune', 'moins-1-an', '1-3-ans', 'plus-3-ans'], 'Indiquez votre expérience.'),
    langues: z.array(z.enum(['français', 'anglais', 'allemand', 'espagnol'])).min(1, 'Cochez au moins une langue.'),
    message: optionalText(1500),
    consentement,
  })
  .transform((value) => ({ ...value, telephoneE164: toE164Cameroon(value.telephone) }));

export const partnerApplicationSchema = z.object({
  centre: requiredText('le nom du centre'),
  pays_centre: requiredText('le pays'),
  ville: requiredText('la ville'),
  contact: requiredText('votre nom'),
  email,
  telephone: z.string().trim().min(9, 'Indiquez votre numéro de téléphone.').max(20),
  positions_dispo: z.coerce.number().int().min(0).max(5000),
  langues: z.array(z.enum(['français', 'anglais', 'allemand', 'espagnol'])).min(1, 'Cochez au moins une langue.'),
  activites: z.array(z.enum(['relation-client', 'teleprospection', 'leads', 'back-office'])).min(1, 'Choisissez au moins une activité.'),
  horaires: requiredText('vos horaires et votre capacité de production', 400),
  equipements: requiredText('vos équipements et outils', 600),
  description: optionalText(2000),
  consentement,
});

const projectMission = z.object({
  missions: z.array(z.string()).min(1, 'Choisissez au moins un type de mission.'),
  mission_autre: optionalText(200),
  description: optionalText(2000),
});

const projectOrganisation = z.object({
  pays: requiredText('votre pays', 80),
  pays_autre: optionalText(80),
  secteur: z.string().trim().min(2, "Indiquez votre secteur d'activité.").max(120),
  langues: z.array(z.string()).min(1, 'Choisissez au moins une langue.'),
  clientele: requiredText('le type de clientèle', 40),
  horaires: z.string().trim().min(2, 'Indiquez les horaires souhaités.').max(200),
  fuseau_mission: requiredText('le fuseau horaire de référence', 60),
  jours: z.array(z.string()).min(1, 'Choisissez au moins un jour.'),
  demarrage: optionalText(40),
  volume: optionalText(40),
  volume_unite: optionalText(40),
  volume_periode: optionalText(40),
  outils: optionalText(300),
  contraintes: optionalText(1000),
});

const projectEffectif = z.object({
  pilote: z.enum(['oui', 'non']).default('oui'),
  positions: z.coerce.number().int('Nombre entier de positions.').min(1).max(1000),
  duree_pilote: optionalText(40),
  objectifs: optionalText(1000),
  criteres: optionalText(1000),
});

const projectPrimes = z.object({
  primes: z.enum(['oui', 'non']).default('non'),
  prime_type: optionalText(40),
  prime_montant: optionalText(40),
  prime_unite: optionalText(40),
  prime_resultats: optionalText(40),
  prime_periodicite: optionalText(40),
  prime_criteres: optionalText(1000),
});

const projectCoordonnees = z.object({
  nom: requiredText('votre nom et prénom'),
  fonction: z.string().trim().min(2, 'Indiquez votre fonction.').max(80),
  societe: requiredText('votre société'),
  email,
  pays_contact: requiredText('votre pays', 80),
  telephone: z
    .string()
    .trim()
    .max(25)
    .regex(/^[+\d][\d .()-]{5,24}$|^$/, 'Numéro de téléphone invalide.')
    .optional()
    .default(''),
  site: optionalText(200),
  consentement,
});

export const projectSchema = projectMission
  .extend(projectOrganisation.shape)
  .extend(projectEffectif.shape)
  .extend(projectPrimes.shape)
  .extend(projectCoordonnees.shape)
  .superRefine((value, ctx) => {
    if (value.missions.includes('autre') && !value.mission_autre) {
      ctx.addIssue({ code: 'custom', path: ['mission_autre'], message: 'Précisez le type de mission.' });
    }
    if (value.pays === 'XX' && !value.pays_autre) {
      ctx.addIssue({ code: 'custom', path: ['pays_autre'], message: 'Précisez le pays.' });
    }
    if (value.primes === 'oui') {
      if (!value.prime_type) ctx.addIssue({ code: 'custom', path: ['prime_type'], message: 'Choisissez un type de prime.' });
      if (!value.prime_unite) ctx.addIssue({ code: 'custom', path: ['prime_unite'], message: 'Choisissez une unité.' });
      if (!value.prime_montant) ctx.addIssue({ code: 'custom', path: ['prime_montant'], message: 'Indiquez un montant estimé.' });
    }
  });

export const bookingSchema = z.object({
  start: z.iso.datetime({ message: 'Créneau invalide.' }),
  fuseau: z.string().trim().min(1).max(60),
  nom: requiredText('votre nom et prénom'),
  email,
  societe: optionalText(120),
  demande: optionalText(600),
  report: optionalText(200),
  consentement,
});
