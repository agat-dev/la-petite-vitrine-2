// Étapes du tunnel de commande
export const DEFAULT_FORM_STEPS = [
  {
    id: "step-1",
    title: "Informations de contact",
    description: "Vos coordonnées personnelles et professionnelles",
    isCompleted: false,
    fields: [
      { id: "nom", type: "text", label: "Nom", placeholder: "Votre nom", required: true, validation: { minLength: 2 } },
      { id: "prenom", type: "text", label: "Prénom", placeholder: "Votre prénom", required: true, validation: { minLength: 2 } },
      { id: "mail", type: "email", label: "Mail", placeholder: "votre@email.com", required: true },
      { id: "password", type: "password", label: "Mot de passe", placeholder: "Choisissez un mot de passe sécurisé", required: true, validation: { minLength: 6 } },
      { id: "telephone", type: "tel", label: "Téléphone", placeholder: "06 12 34 56 78", required: true },
      { id: "entreprise", type: "text", label: "Entreprise", placeholder: "Nom de votre entreprise", required: true },
    ],
  },
  {
    id: "step-2",
    title: "Activité et localisation",
    description: "Votre secteur d'activité et votre zone d'intervention",
    isCompleted: false,
    fields: [
      { id: "secteur_activite", type: "select", label: "Secteur d'activité", required: true, options: [
        { value: "batiment", label: "Bâtiment & Rénovation" },
        { value: "electricien", label: "Électricien" },
        { value: "plombier", label: "Plombier / Chauffagiste" },
        { value: "paysagiste", label: "Paysagiste / Jardinier" },
        { value: "coiffeur", label: "Coiffeur / Esthéticienne" },
        { value: "restauration", label: "Hôtellerie / Restauration" },
        { value: "artisan", label: "Artisan manuel" },
        { value: "commerce", label: "Commerce de détail" },
        { value: "services", label: "Services aux particuliers" },
        { value: "sante", label: "Santé / Bien-être" },
        { value: "autre", label: "Autre" },
      ] },
      { id: "adresse_complete", type: "textarea", label: "Adresse complète", placeholder: "Adresse complète de votre entreprise (rue, ville, code postal)", required: true, validation: { minLength: 10, maxLength: 200 } },
      { id: "zone_intervention", type: "textarea", label: "Zone d'intervention", placeholder: "Décrivez votre zone d'intervention géographique (villes, départements, rayon en km...)", required: true, validation: { minLength: 10, maxLength: 300 } },
    ],
  },
  {
    id: "step-3",
    title: "Positionnement et concurrence",
    description: "Votre positionnement sur le marché et vos concurrents",
    isCompleted: false,
    fields: [
      { id: "concurrents_principaux", type: "textarea", label: "Concurrents principaux", placeholder: "Listez vos principaux concurrents (noms d'entreprises, sites web...)", required: true, validation: { minLength: 20, maxLength: 500 } },
      { id: "services_proposes", type: "textarea", label: "Services proposés", placeholder: "Listez tous vos services et prestations", required: true, validation: { minLength: 30, maxLength: 800 } },
      { id: "specificite_positionnement", type: "textarea", label: "Spécificité / Positionnement", placeholder: "Qu'est-ce qui vous différencie de vos concurrents ? Votre valeur ajoutée unique ?", required: true, validation: { minLength: 30, maxLength: 500 } },
    ],
  },
  {
    id: "step-4",
    title: "Clientèle et communication",
    description: "Votre cible client et le ton de communication souhaité",
    isCompleted: false,
    fields: [
      { id: "types_clients", type: "radio", label: "Types de clients", required: true, options: [
        { value: "particuliers", label: "Particuliers uniquement" },
        { value: "professionnels", label: "Professionnels uniquement" },
        { value: "mixte", label: "Particuliers et professionnels" },
      ] },
      { id: "ton_communication", type: "select", label: "Ton souhaité pour la communication", required: true, options: [
        { value: "professionnel", label: "Professionnel et sérieux" },
        { value: "convivial", label: "Convivial et accessible" },
        { value: "moderne", label: "Moderne et dynamique" },
        { value: "traditionnel", label: "Traditionnel et rassurant" },
        { value: "premium", label: "Premium et haut de gamme" },
        { value: "familial", label: "Familial et chaleureux" },
      ] },
    ],
  },
  {
    id: "step-5",
    title: "Éléments visuels et contenus",
    description: "Vos fichiers et contenus existants",
    isCompleted: false,
    fields: [
      { id: "elements_visuels", type: "file", label: "Éléments visuels (logo, charte, photos etc.)", required: false },
      { id: "textes_contenus", type: "file", label: "Textes et contenus", required: false },
      { id: "autres_fichiers", type: "file", label: "Autres fichiers", required: false },
      { id: "liens_contenus_existants", type: "textarea", label: "Liens vers contenus existants", required: false },
    ],
  },
];
// Options sociales pour le frontend
export const SOCIAL_OPTIONS = [
  {
    id: "facebook",
    label: "Page Facebook professionnelle",
  },
  {
    id: "instagram",
    label: "Page Instagram professionnelle",
  },
  {
    id: "linkedin",
    label: "Page LinkedIn professionnelle",
  },
];
import { Pack, MaintenanceOption } from "../types/ecommerce";

export const PACKS: Pack[] = [
  {
    id: "pack-base",
    title: "Pack Essentiel",
    price: 390,
    description: "Site web One Page professionnel responsive",
    features: [
      "Site web One Page professionnel responsive",
      "Google Business",
      "5 Sections : Présentation, Services, Informations pratiques, Map, Contact",
      "Mise à jour des contenus",
      "Nom de domaine + hébergement 1 an",
      "Livraison en 5 jours",
      "Sans engagement",
      "Remboursé sous 48h si non satisfait",
    ],
    deliveryTime: "5 jours"
  },
  {
    id: "pack-presence",
    title: "Pack Pro",
    price: 590,
    description: "Tout le pack de base + réseaux sociaux",
    features: [
      "Tout le pack de base",
      "Facebook + Instagram Business",
      "3 pages additionnelles : Services, Réalisations, A propos, Infos pratiques",
      "Livraison en 7 jours",
      "Sans engagement",
      "Remboursé sous 48h si non satisfait",
    ],
    deliveryTime: "7 jours",
  },
  {
    id: "pack-metier",
    title: "Pack Pro Plus",
    price: 890,
    description: "Solution complète avec modules métier",
    features: [
      "Tout le pack pro",
      "2 modules métier additionnels : Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp, Avis clients",
      "Réseaux sociaux professionnels",
      "Livraison en 9 jours",
      "Sans engagement",
      "Remboursé sous 48h si non satisfait",
    ],
    deliveryTime: "9 jours",
  },
];

export const MAINTENANCE_OPTIONS: MaintenanceOption[] = [
  {
    id: "maintenance-basic",
    title: "Maintenance Basique",
    price: 9,
    description: "Hébergement + nom de domaine",
    billingCycle: "monthly",
    features: [],
  },
  {
    id: "maintenance-premium",
    title: "Maintenance Premium",
    price: 29,
    description: "Hébergement + nom de domaine + modifications du contenu du site",
    billingCycle: "monthly",
    features: [],
  },
  {
    id: "google-business",
    title: "Google My Business",
    price: 25,
    description: "Création et optimisation de votre fiche Google My Business",
    billingCycle: "one-time",
    features: [],
  },
  {
    id: "reseaux-sociaux",
    title: "2 Réseaux Sociaux",
    price: 25,
    description: "Création de 2 pages professionnelles (Facebook, Instagram ou LinkedIn)",
    billingCycle: "one-time",
    features: [],
  },
  {
    id: "annuaires-pro",
    title: "Annuaires Professionnels",
    price: 25,
    description: "Inscription dans les principaux annuaires professionnels",
    billingCycle: "one-time",
    features: [],
  },
  // Nettoyage : ne garder que les objets MaintenanceOption valides
];
