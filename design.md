---
name: Système de Design IncubLink
version: 1.0.0
colors:
  primary:
    main: "#2563EB"
    light: "#EFF6FF"
    dark: "#1E40AF"
    gradient: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)"
  accent:
    orange: "#F97316"
    indigo: "#4F46E5"
    green: "#10B981"
  neutral:
    white: "#FFFFFF"
    gray-50: "#F9FAFB"
    gray-100: "#F3F4F6"
    gray-200: "#E5E7EB"
    gray-600: "#4B5563"
    gray-900: "#111827"
  semantic:
    success: "#10B981"
    warning: "#F59E0B"
    error: "#EF4444"
    info: "#3B82F6"
typography:
  fontFamily: "Outfit, Inter, sans-serif"
  headings:
    h1: { size: "4rem", weight: 800, letterSpacing: "-0.02em" }
    h2: { size: "2.5rem", weight: 700, letterSpacing: "-0.01em" }
    h3: { size: "1.5rem", weight: 600 }
  body:
    base: { size: "1rem", weight: 400, lineHeight: "1.6" }
    small: { size: "0.875rem", weight: 400 }
    large: { size: "1.125rem", weight: 500 }
spacing:
  unit: 4px
  container: "1280px"
  gutter: "24px"
radius:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
shadows:
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  blue: "0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)"
---

# Spécification de Design Incub Link

Incub Link est une plateforme tunisienne moderne de jobbing. Le système de design se concentre sur la **confiance, l'efficacité et une esthétique professionnelle**. Il utilise une interface claire et lumineuse avec des accents vibrants et des transitions fluides.

## 🎨 Identité Visuelle et Philosophie

- **La Confiance Avant Tout** : Utiliser des lignes épurées, un espace blanc généreux et une typographie professionnelle pour instaurer la confiance.
- **Accents Vibrants** : Utiliser le `Bleu Incub` et l'`Orange Incub` pour mettre en évidence les actions et l'énergie.
- **Glassmorphisme** : Utiliser un flou et une transparence subtils pour les éléments secondaires de l'interface comme les superpositions, les barres de navigation et les menus mobiles pour créer de la profondeur.
- **Retour Dynamique** : Chaque interaction doit sembler vivante. Utiliser `framer-motion` pour les animations d'entrée et les états de survol.

## 📐 Disposition de la Page d'Accueil (Layout)

La page d'accueil suit une structure narrative descendante.

### 1. Section Héro (Hero)
- **Titre** : "Des services experts pour chaque besoin".
- **Sous-titre** : "Connectez-vous avec les meilleurs talents tunisiens. Trouvez des professionnels vérifiés ou votre prochain grand projet à Tunis, Sousse et au-delà."
- **Actions** : Bouton bleu "Explorer les services" et bouton contour "Devenir un talent".
- **Visuel** : Image premium avec effet de profondeur (glassmorphism) illustrant un environnement de travail moderne.

### 2. Parcourir les Talents Locaux
- **Titre** : "Parcourez les talents locaux".
- **Grille de Catégories** : Cartes épurées avec icônes colorées :
  - IT & Logiciels.
  - Arts Créatifs.
  - Conseil aux entreprises.
  - Services à domicile.
  - Éducation.

### 3. Solutions Premium
- **Titre** : "Solutions Premium".
- **Cartes de Solution** : Deux grandes cartes avec images d'arrière-plan sombres :
  - "Solutions Entreprise" (Bleu).
  - "Gestion de Projet" (Gris foncé).

### 4. Processus "Simple comme 1-2-3"
- **Étapes** :
  1. **Publier** : Décrivez votre besoin en quelques minutes.
  2. **Connecter** : Discutez avec les meilleurs prestataires.
  3. **Payer** : Libérez le paiement une fois satisfait.

### 5. Appel à l'Action Final (CTA)
- **Titre** : "Prêt à commencer ?".
- **Actions** : Bouton blanc "S'inscrire" et bouton contour "Nous contacter".

### 7. Pied de Page (Footer)
- Logo et description courte.
- Colonnes de liens : Entreprise, Ressources, Légal.
- Copyright en bas : "© 2026 IncubLink Tunisian Jobbing. Tous droits réservés."

## 🧱 Composants

- **Boutons** : Coins arrondis (24px), ombres portées douces, transitions de couleur au survol.
- **Cartes** : Coins arrondis (32px), bordures très fines (`gray-100`), élévation au survol.
- **Champs de saisie** : Fond gris très clair (`gray-50`), icônes intégrées (Lucide-react).

## 🚫 Règles de Design (Don'ts)
- **Pas de coins saillants** : Éviter `rounded-none`. Rayon minimum de 8px.
- **Pas de noir pur** : Utiliser `gray-900` pour le texte.
- **Pas d'ombres lourdes** : Garder les ombres diffuses et subtiles.

## 📐 Disposition de la Page d'Inscription (Layout)

La page d'inscription utilise une carte à deux colonnes pour une expérience immersive.

### 1. Panneau Latéral Gauche (Branding)
- **Fond** : Bleu primaire (`primary.main`) avec des formes géométriques et une image en opacité réduite.
- **Contenu** :
  - Accroche : "Élevez le paysage professionnel tunisien".
  - Description : "Rejoignez une communauté où l'expertise traditionnelle rencontre l'agilité moderne de l'économie du jobbing."
  - Cartes de bénéfices (Glassmorphism) :
    - **Évoluez rapidement** : "Accédez aux meilleurs talents tunisiens en quelques minutes."
    - **La confiance d'abord** : "Des professionnels vérifiés garantissant la qualité de chaque projet."

### 2. Formulaire d'Inscription (Droite)
- **Titre** : "Créez votre compte".
- **Sous-titre** : "Commencez votre voyage avec la première plateforme de jobbing en Tunisie."
- **Sélecteur de Rôle** : Boutons switch entre "Je suis un Talent" (Prestataire) et "Je recrute" (Client).
- **Champs de saisie** :
  - Nom complet.
  - Adresse e-mail.
  - Mot de passe (avec icône de visibilité).
- **Validation** : Case à cocher pour les conditions d'utilisation.
- **Bouton Primaire** : "Créer un compte".
- **Séparateur** : "OU INSCRIVEZ-VOUS AVEC".
- **Boutons Sociaux** : Google et LinkedIn.
- **Lien de redirection** : "Vous avez déjà un compte ? Connectez-vous".

## 📐 Disposition de la Page de Connexion (Layout)

La page de connexion utilise une carte centrée épurée.

### Carte Centrale
- **Titre** : "Bon retour !".
- **Sous-titre** : "Connectez-vous à votre compte pour continuer."
- **Champs de saisie** :
  - Adresse e-mail.
  - Mot de passe (avec lien "Mot de passe oublié ?" au-dessus du champ ou à droite).
- **Bouton Primaire** : "Se connecter".
- **Séparateur** : "OU CONTINUER AVEC".
- **Boutons Sociaux** : Google et LinkedIn (boutons côte à côte).
- **Lien de redirection** : "Vous n'avez pas de compte ? Inscrivez-vous gratuitement".

## 📐 Disposition du Tableau de Bord / Flux de Jobs (Layout)

Le tableau de bord utilise une structure à trois colonnes pour une gestion efficace.

### 1. Barre Latérale Gauche (Navigation)
- **Profil** : Photo de profil, nom et statut.
- **Menu** :
  - Flux d'emplois (Actif).
  - Jobs enregistrés.
  - Mes candidatures.
  - Messages.
- **Action** : Bouton orange "Publier une offre".

### 2. Flux Central (Contenu Principal)
- **Barre de Recherche** : Filtres par mot-clé, catégorie et localisation (Tunis, Tunisie).
- **Liste des Jobs** : Cartes horizontales épurées :
  - Icône/Logo de l'entreprise.
  - Titre du poste (ex: "Architecte Frontend Senior").
  - Métadonnées : Localisation, Salaire (DT), Type (Temps plein/Hybride).
  - Badges de compétences (ex: React, Tailwind).
  - Bouton "Voir les détails".

### 3. Panneau Latéral Droit (Widgets)
- **Recommandations** : Liste de jobs basés sur le profil de l'utilisateur.
- **Entreprises à la Une** : Logos et noms des entreprises recrutant activement.
- **Action** : Bouton "Explorer toutes les entreprises".

## 📐 Disposition des Détails du Job (Layout)

La page de détails d'un job utilise une structure asymétrique (70/30) pour une lecture claire.

### 1. En-tête (Header)
- **Logo** : Logo de l'entreprise en grand.
- **Titre** : Titre du poste (ex: "Architecte Frontend Senior").
- **Métadonnées** : Nom de l'entreprise, Localisation (Hybride/Remote), Date de publication.
- **Actions** : Boutons d'enregistrement (favoris) et de partage.

### 2. Corps Principal (Gauche - 70%)
- **À propos du rôle** : Description narrative des objectifs du poste.
- **Missions principales** : Liste à puces avec icônes de validation (checks) pour les responsabilités.
- **Profil recherché** : Liste à puces pour les exigences et l'expérience.
- **Tags** : Liste de badges de compétences techniques.

### 3. Barre Latérale (Droite - 30%)
- **Résumé financier** : Fourchette de salaire par mois (ex: "6.5k - 9k DT / Mois").
- **Détails rapides** : Type de poste (Temps plein) et politique de télétravail.
- **Actions directes** :
  - Bouton primaire "Candidature rapide".
  - Bouton contour "Message au recruteur".
- **À propos de l'entreprise** : Logo, nom, secteur et brève description de l'entreprise avec lien vers le profil complet.

## 📐 Disposition de Publication de Demande (Layout)

Le formulaire de publication utilise une carte large et aérée pour faciliter la saisie.

### 1. En-tête de Formulaire
- **Titre** : "Publier une Demande".
- **Sous-titre** : "Décrivez votre besoin pour recevoir des offres de nos prestataires qualifiés."

### 2. Sélection du Service
- **Grille (2 colonnes)** :
  - **Catégorie** : Menu déroulant avec icône de liste.
  - **Région** : Menu déroulant avec icône de localisation (ex: Tunis, Sousse).

### 3. Détails et Urgence
- **Description** : Zone de texte large avec coins arrondis (`rounded-[24px]`).
- **Urgence** : Sélecteur horizontal avec badges cliquables (Basse, Moyenne, Urgente).
- **Média** : Zone de téléchargement de photos avec icône de caméra et style pointillé.

### 4. Validation et Sécurité
- **Avis de Sécurité** : Encadré informatif sur l'interdiction d'échange de coordonnées.
- **Bouton d'Action** : Bouton large bleu avec icône d'envoi.

---
*Créé pour l'intégration Google Stitch*
