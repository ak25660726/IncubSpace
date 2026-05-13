# INCUB LINK — Plateforme Tunisienne de Jobbing

## 🚀 Présentation
INCUB LINK est une infrastructure d'intermédiation et de coordination de services locale, développée pour le hackathon IMSET x INCUB SPACE. Elle connecte clients et prestataires tout en garantissant un contrôle opérationnel centralisé.

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), TailwindCSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Design System**: Premium, Modern, Mobile-first

## 📦 Fonctionnalités Clés
- **Authentification**: Rôles Client, Prestataire et Administrateur.
- **Publication de Services**: Demandes avec catégorie, région et urgence.
- **Profils Prestataires**: Système de badges, portfolio et évaluations.
- **Anti-Contournement**: Filtrage automatique des coordonnées personnelles (emails, téléphones) dans la messagerie.
- **Dashboard Admin**: Suivi des commissions (15% standard, 10% premium), validation des profils et modération.

## ⚙️ Installation
1. Cloner le repo : `git clone [url]`
2. Installer les dépendances : `npm install`
3. Configurer les variables d'environnement dans `.env.local` :
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=votre_clef
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_domaine
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
   ```
4. Lancer le projet : `npm run dev`

## 🔒 Sécurité & Business
- **Firestore Rules** à configurer pour sécuriser les données.
- **Filtrage des messages**: `lib/utils.ts` contient la logique `filterSensitiveContent`.
- **Modèle Économique**: Régularisation automatique des commissions à partir de 100 DT.

---
© 2026 INCUB SPACE. Tous droits réservés.
