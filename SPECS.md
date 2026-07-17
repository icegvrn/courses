# Générateur de Liste de Courses — Spécifications Fonctionnelles & Techniques

## Vue d'ensemble

Application web Angular permettant de planifier des repas sur une semaine et de générer automatiquement une liste de courses consolidée, en tenant compte du nombre de personnes par repas.

---

## Contexte & Logique métier

L'application reproduit le comportement d'un fichier Excel à 4 feuilles :

| Feuille Excel | Rôle |
|---|---|
| **Planning** | Associe une recette à un nombre de personnes |
| **Recettes** | Stocke les ingrédients et quantités par personne pour chaque recette |
| **Ingrédients** | Référentiel des ingrédients avec leur unité de mesure |
| **Courses** | Liste générée : ingrédient + quantité totale + unité |

**Règle de calcul :** `quantité totale = quantité_par_personne × nombre_de_personnes` — agrégée sur tous les repas du planning.

---

## Architecture technique

- **Framework :** Angular 21 (standalone components)
- **Stockage :** `localStorage` (persistance côté client, pas de backend)
- **Styles :** SCSS avec design system custom (variables CSS, tokens de design)
- **Responsive :** Mobile-first, breakpoints sm/md/lg/xl
- **Accessibilité :** ARIA labels, focus visible, contraste WCAG AA

---

## Structure des données

```typescript
interface Ingredient {
  id: string;
  nom: string;
  unite: string; // ex: "g", "L", "pièce(s)", "c. à soupe"
}

interface RecetteIngredient {
  ingredientId: string;
  quantiteParPersonne: number;
}

interface Recette {
  id: string;
  nom: string;
  description?: string;
  emoji?: string; // optionnel, pour l'affichage
  ingredients: RecetteIngredient[];
}

interface PlanningItem {
  id: string;
  recetteId: string;
  nombrePersonnes: number;
  repas?: 'midi' | 'soir'; // optionnel
  jour?: string; // optionnel : "Lundi", "Mardi"...
}

interface CourseItem {
  ingredient: Ingredient;
  quantiteTotale: number;
  recettes: string[]; // noms des recettes sources (pour l'info-bulle)
}
```

---

## Pages & Navigation

### Navigation principale (sidebar ou bottom nav mobile)

| Icône | Label | Route |
|---|---|---|
| 📅 | Planning | `/planning` |
| 🛒 | Liste de courses | `/courses` |
| 🍽️ | Recettes | `/recettes` |
| 🥕 | Ingrédients | `/ingredients` |

---

## Page 1 — Planning (`/planning`)

### Objectif
Page d'accueil principale. L'utilisateur sélectionne ses repas de la semaine et le nombre de convives.

### Comportement
- Affiche une liste de **cards de repas** (un item = une ligne du planning)
- Chaque card permet de :
  - Sélectionner une recette (dropdown avec recherche)
  - Définir le nombre de personnes (stepper +/-)
  - Indiquer le jour et le type de repas (midi/soir) — optionnel
  - Supprimer le repas
- Bouton **"+ Ajouter un repas"** pour ajouter une ligne
- Bouton CTA principal **"Générer ma liste de courses"** → navigue vers `/courses`
- Indicateur dynamique : nombre total de repas planifiés et nombre de personnes moyen

### UI/UX
- Cards avec drag & drop pour réordonner (optionnel v2)
- Le stepper de personnes est large et tactile-friendly (min 40×40px)
- Recettes avec 0 personne sont visuellement grisées mais conservées
- Animation subtile sur ajout/suppression de card
- Si aucune recette n'est configurée, afficher un état vide avec CTA vers `/recettes`

---

## Page 2 — Liste de courses (`/courses`)

### Objectif
Afficher la liste consolidée générée depuis le planning, prête à être utilisée pour le drive.

### Comportement
- Génération automatique à l'ouverture (basée sur le planning courant)
- Chaque ligne affiche : **nom de l'ingrédient**, **quantité totale**, **unité**
- Checkbox sur chaque ligne pour cocher les articles déjà ajoutés au panier
- Regroupement optionnel par **catégorie** (si l'ingrédient a une catégorie définie)
- Bouton **"Réinitialiser les coches"**
- Bouton **"Exporter"** : copie la liste dans le presse-papier (format texte) ou télécharge un `.txt`
- Tooltip/info au survol d'un ingrédient : liste des recettes sources et quantités détaillées

### UI/UX
- Design épuré façon liste de tâches (inspiré Todoist ou Linear)
- Articles cochés déplacés en bas de liste avec style barré + opacité réduite
- Quantités arrondies intelligemment (ex: 1.5L, pas 1.500000L)
- Badge de compteur : "X articles | Y cochés"
- Bouton flottant (FAB) sur mobile pour régénérer la liste

---

## Page 3 — Recettes (`/recettes`)

### Objectif
Gérer le référentiel de recettes (CRUD complet).

### Liste des recettes
- Grille de cards responsives (2 colonnes mobile, 3 colonnes desktop)
- Chaque card affiche : emoji/icône, nom, nombre d'ingrédients, aperçu des ingrédients
- Barre de recherche filtrante
- Bouton **"+ Nouvelle recette"**

### Formulaire de recette (modale ou page dédiée)
- Champ : **Nom de la recette** (requis)
- Champ : **Emoji/icône** (optionnel)
- Champ : **Description** (optionnel, textarea)
- Tableau d'ingrédients :
  - Chaque ligne : dropdown ingrédient + input quantité par personne
  - Bouton "+" pour ajouter un ingrédient
  - Bouton poubelle pour supprimer
- Validation : au moins un ingrédient requis, quantités > 0
- Boutons : **Enregistrer** / **Annuler** / **Supprimer** (si modification)

### UI/UX
- Formulaire dynamique avec animations sur ajout/suppression de lignes
- Confirmation avant suppression (modale ou snackbar avec undo)
- Prévisualisation en temps réel du nombre d'ingrédients

---

## Page 4 — Ingrédients (`/ingredients`)

### Objectif
Gérer le référentiel d'ingrédients avec leurs unités de mesure.

### Liste des ingrédients
- Table avec colonnes : **Nom**, **Unité**, **Catégorie** (optionnel), **Actions**
- Tri par colonne
- Recherche/filtre en temps réel
- Bouton **"+ Nouvel ingrédient"**

### Formulaire d'ingrédient (inline ou modale)
- Champ : **Nom** (requis, unique)
- Champ : **Unité** (requis) — liste de suggestions : g, kg, mL, L, pièce(s), c. à soupe, c. à café, sachet(s), tranche(s)
- Champ : **Catégorie** (optionnel) — ex: Légumes, Viandes, Produits laitiers, Épicerie, Surgelés

### UI/UX
- Édition inline dans le tableau (click-to-edit)
- Import/export JSON pour sauvegarder le référentiel
- Indicateur si un ingrédient est utilisé dans des recettes (badge nombre de recettes)

---

## Design System

### Palette de couleurs
```
Primary    : #4F7942  (vert nature, appétissant)
Secondary  : #F4A261  (orange chaleureux)
Accent     : #2A9D8F  (teal frais)
Background : #FAFAF7  (blanc cassé doux)
Surface    : #FFFFFF
Text       : #1A1A2E  (presque noir)
Muted      : #6B7280  (gris texte secondaire)
Error      : #E63946
Success    : #52B788
```

### Typographie
- **Titres :** `Playfair Display` ou `DM Serif Display` (serif élégant)
- **Corps/UI :** `Inter` ou `DM Sans` (sans-serif lisible)
- Taille de base : 16px, échelle modulaire 1.25

### Composants clés
- **Card** : border-radius 16px, shadow légère `0 2px 12px rgba(0,0,0,0.08)`, hover lift
- **Button primary** : fond Primary, radius 12px, padding 12px 24px, hover darken 8%
- **Button secondary** : bordure 1.5px Primary, fond transparent
- **Input** : border-radius 10px, focus ring Primary, transition smooth
- **Stepper** : boutons carrés 40px, valeur centrale en gras
- **Badge** : pill shape, couleurs sémantiques
- **Modale** : backdrop blur, animation slide-up, max-width 560px

### Iconographie
- Librairie : `Lucide Icons` (SVG, tree-shakable)
- Taille standard : 20px dans les boutons, 24px standalone

### Animations
- Transitions globales : `200ms ease-out`
- Apparition de liste items : `stagger 50ms` + `fade + translateY(8px)`
- Page transitions : fade doux `150ms`
- Feedback tactile : ripple sur les boutons

---

## Responsivité

| Breakpoint | Layout |
|---|---|
| < 640px (mobile) | Navigation bottom bar, 1 colonne, cards plein largeur |
| 640–1024px (tablette) | Navigation sidebar collapsée, 2 colonnes grille |
| > 1024px (desktop) | Navigation sidebar étendue, 3 colonnes grille |

- Touch targets minimum : 44×44px
- Pas de hover-only interactions sur mobile
- Swipe pour supprimer un item (optionnel v2)

---

## États & Feedback utilisateur

- **État vide** : illustration SVG + texte encourageant + CTA contextuel (pour chaque page)
- **Loading** : skeleton screens (pas de spinners)
- **Erreur de validation** : message inline sous le champ, couleur Error
- **Succès** : toast/snackbar non-bloquant en bas de l'écran, auto-dismiss 3s
- **Confirmation destructive** : modale avec bouton danger explicite

---

## Fonctionnalités optionnelles (v2)

- [ ] Import du fichier `.xlsx` existant pour migration des données
- [ ] Partage de la liste de courses par lien ou QR code
- [ ] Mode PWA (installable sur mobile, offline)
- [ ] Thème sombre (dark mode)
- [ ] Historique des plannings (sauvegardes nommées)
- [ ] Multi-semaines : planifier sur 2 semaines
- [ ] Drag & drop pour réordonner le planning
- [ ] Swipe-to-delete sur mobile

---

## Données de démonstration

Pré-charger l'application avec quelques recettes et ingrédients exemples pour onboarding :

**Recettes exemples :**
- Pâtes bolognaise (bœuf haché, pâtes, tomates pelées, oignon, ail, concentré de tomates)
- Poulet rôti (poulet entier, ail, citron, thym, huile d'olive)
- Salade César (salade romaine, poulet, parmesan, croutons, sauce César)

**Ingrédients exemples :**
- Bœuf haché : g
- Pâtes : g
- Tomates pelées : boîte(s)
- Oignon : pièce(s)
- Ail : gousse(s)

---

## Contraintes techniques

- Aucun backend, aucune authentification — tout en `localStorage`
- Bundle size optimisé (lazy loading des routes)
- Compatible Chrome, Firefox, Safari, Edge (2 dernières versions majeures)
- Lighthouse score cible : Performance ≥ 90, Accessibilité ≥ 90
