export interface Ingredient {
  id: string;
  nom: string;
  unite: string;
  categorie?: string;
}

export interface RecetteIngredient {
  ingredientId: string;
  quantiteParPersonne: number;
}

export interface Recette {
  id: string;
  nom: string;
  description?: string;
  emoji?: string;
  ingredients: RecetteIngredient[];
}

export interface PlanningItem {
  id: string;
  recetteId: string;
  nombrePersonnes: number;
}

export interface CourseItem {
  ingredient: Ingredient;
  quantiteTotale: number;
  recettes: string[];
}

export const CATEGORIES: string[] = [
  'Légumes', 'Fruits', 'Viandes', 'Poissons', 'Produits laitiers',
  'Épicerie', 'Surgelés', 'Boulangerie', 'Boissons', 'Autres',
];

export const UNITES: string[] = [
  'g', 'kg', 'mL', 'L', 'pièce(s)', 'c. à soupe', 'c. à café',
  'sachet(s)', 'tranche(s)', 'gousse(s)', 'boîte(s)', 'pincée(s)',
];

// ─── Données issues de l'Excel ──────────────────────────────────
export const DEMO_INGREDIENTS: Ingredient[] = [
  { id: 'i001', nom: 'Saumon fumé',                     unite: 'Tranche(s)',    categorie: 'Poissons' },
  { id: 'i002', nom: 'Poireau(x)',                       unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i003', nom: 'Oeuf(s)',                          unite: 'unité(s)',      categorie: 'Produits laitiers' },
  { id: 'i004', nom: 'Yahourt 0%',                       unite: 'unité(s)',      categorie: 'Produits laitiers' },
  { id: 'i005', nom: 'Noix de muscade',                  unite: 'Pincée(s)',     categorie: 'Épicerie' },
  { id: 'i006', nom: 'Carotte(s)',                       unite: 'g',             categorie: 'Légumes' },
  { id: 'i007', nom: 'Concentré de tomates',             unite: 'g',             categorie: 'Épicerie' },
  { id: 'i008', nom: 'Epinards',                         unite: 'g',             categorie: 'Légumes' },
  { id: 'i009', nom: 'Oignons',                          unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i010', nom: 'Pommes de terre',                  unite: 'g',             categorie: 'Légumes' },
  { id: 'i011', nom: 'Crevettes roses décortiquées',     unite: 'g',             categorie: 'Poissons' },
  { id: 'i012', nom: 'Bouillon de légume',               unite: 'ml',            categorie: 'Épicerie' },
  { id: 'i013', nom: 'Lait de coco',                     unite: 'ml',            categorie: 'Épicerie' },
  { id: 'i014', nom: 'Citron(s) vert(s)',                unite: 'g',             categorie: 'Fruits' },
  { id: 'i015', nom: 'Gingembre',                        unite: 'cm',            categorie: 'Épicerie' },
  { id: 'i016', nom: 'Ail',                              unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i017', nom: 'Courgette(s)',                     unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i018', nom: 'Tomate(s)',                        unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i019', nom: 'Fines herbes',                     unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i020', nom: 'Fromage blanc 0%',                 unite: 'g',             categorie: 'Produits laitiers' },
  { id: 'i021', nom: 'Crème fraiche allégée 4%',         unite: 'ml',            categorie: 'Produits laitiers' },
  { id: 'i022', nom: 'Filets de Cabillaud',              unite: 'unité(s)',      categorie: 'Poissons' },
  { id: 'i023', nom: 'Fenouil',                          unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i024', nom: 'Citron jaune',                     unite: 'unité(s)',      categorie: 'Fruits' },
  { id: 'i025', nom: 'Herbe de provence',                unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i026', nom: 'Escalope de dinde',                unite: 'unité(s)',      categorie: 'Viandes' },
  { id: 'i027', nom: 'Thym',                             unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i028', nom: 'Laurier',                          unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i029', nom: 'Poivron jaune',                    unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i030', nom: 'Sauce soja',                       unite: 'ml',            categorie: 'Épicerie' },
  { id: 'i031', nom: 'Boeuf haché 5% MG',               unite: 'g',             categorie: 'Viandes' },
  { id: 'i032', nom: 'Tomates pelées concassées',        unite: 'petite boite',  categorie: 'Épicerie' },
  { id: 'i033', nom: 'Bouillon de boeuf',                unite: 'ml',            categorie: 'Épicerie' },
  { id: 'i034', nom: 'Bacon maigre',                     unite: 'Tranche(s)',    categorie: 'Viandes' },
  { id: 'i035', nom: 'Ciboulette',                       unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i036', nom: 'Pain complet',                     unite: 'tranche(s)',    categorie: 'Boulangerie' },
  { id: 'i037', nom: 'Thon naturel',                     unite: 'g',             categorie: 'Poissons' },
  { id: 'i038', nom: 'Lait demi-écrémé',                 unite: 'ml',            categorie: 'Produits laitiers' },
  { id: 'i039', nom: 'Farine',                           unite: 'g',             categorie: 'Épicerie' },
  { id: 'i040', nom: 'Concombre(s)',                     unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i041', nom: 'Oignon(s) rouge(s)',               unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i042', nom: 'Haricot(s) rouge(s)',              unite: 'g (cuits)',     categorie: 'Épicerie' },
  { id: 'i043', nom: 'Cumin en poudre',                  unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i044', nom: 'Paprika',                          unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i045', nom: 'Piment',                           unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i046', nom: 'Riz complet',                      unite: 'g (cru)',       categorie: 'Épicerie' },
  { id: 'i047', nom: 'Persil',                           unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i048', nom: 'Pâtes (protéinés pour S.)',        unite: 'g (cru)',       categorie: 'Épicerie' },
  { id: 'i049', nom: 'Avocat',                           unite: 'unité(s)',      categorie: 'Fruits' },
  { id: 'i050', nom: 'Echalotte',                        unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i051', nom: 'Allumettes de bacon',              unite: 'g',             categorie: 'Viandes' },
  { id: 'i052', nom: 'Nouilles chinoises de riz',        unite: 'g (cru)',       categorie: 'Épicerie' },
  { id: 'i053', nom: 'Escalope de poulet',               unite: 'g',             categorie: 'Viandes' },
  { id: 'i054', nom: 'Poivron rouge',                    unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i055', nom: 'Poivron vert',                     unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i056', nom: 'Brocoli',                          unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i057', nom: 'Coriandre',                        unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i058', nom: 'Sésame',                           unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i059', nom: 'Saumon frais',                     unite: 'pavé(s)',       categorie: 'Poissons' },
  { id: 'i060', nom: 'Vinaigre de riz',                  unite: 'c. à soupe',    categorie: 'Épicerie' },
  { id: 'i061', nom: 'Edamame (ou pois chiche)',         unite: 'g',             categorie: 'Épicerie' },
  { id: 'i062', nom: 'Tomates cerises',                  unite: 'barquette',     categorie: 'Légumes' },
  { id: 'i063', nom: 'Polenta',                          unite: 'g',             categorie: 'Épicerie' },
  { id: 'i064', nom: 'Basilic',                          unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i065', nom: 'Petits pois',                      unite: 'g',             categorie: 'Légumes' },
  { id: 'i066', nom: 'Gruyère',                          unite: 'g',             categorie: 'Produits laitiers' },
  { id: 'i067', nom: 'Maïzena',                          unite: 'g',             categorie: 'Épicerie' },
  { id: 'i068', nom: 'Aneth',                            unite: 'pincée(s)',     categorie: 'Épicerie' },
  { id: 'i069', nom: 'Lentilles',                        unite: 'g (cru)',       categorie: 'Épicerie' },
  { id: 'i070', nom: 'Fêta (brebis)',                    unite: 'g',             categorie: 'Produits laitiers' },
  { id: 'i071', nom: 'Curcuma',                          unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i072', nom: 'Maïs',                             unite: 'g',             categorie: 'Épicerie' },
  { id: 'i073', nom: 'Paleron de boeuf',                 unite: 'g',             categorie: 'Viandes' },
  { id: 'i074', nom: 'Ras el hanout',                    unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i075', nom: 'Ail en poudre',                    unite: 'c. à café',     categorie: 'Épicerie' },
  { id: 'i076', nom: 'Jarret de boeuf',                  unite: 'g',             categorie: 'Viandes' },
  { id: 'i077', nom: 'Navet',                            unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i078', nom: 'Chou',                             unite: 'unité(s)',      categorie: 'Légumes' },
  { id: 'i079', nom: 'Semoule',                          unite: 'g (cru)',       categorie: 'Épicerie' },
  { id: 'i080', nom: 'Pois chiche',                      unite: 'g',             categorie: 'Épicerie' },
  { id: 'i081', nom: 'Biscotte émiettées',               unite: 'c. à soupe',    categorie: 'Boulangerie' },
  { id: 'i082', nom: 'Salade',                           unite: 'part',          categorie: 'Légumes' },
  { id: 'i083', nom: 'Grosses pommes de terre',          unite: 'unité',         categorie: 'Légumes' },
  { id: 'i084', nom: 'Chou rouge',                       unite: 'unité(s)',      categorie: 'Légumes' },
];

export const DEMO_RECETTES: Recette[] = [
  {
    id: 'r001', nom: 'Quiche saumon fumé poireau dunkan', emoji: '🥧',
    ingredients: [
      { ingredientId: 'i001', quantiteParPersonne: 2 },
      { ingredientId: 'i002', quantiteParPersonne: 0.5 },
      { ingredientId: 'i003', quantiteParPersonne: 1.5 },
      { ingredientId: 'i004', quantiteParPersonne: 0.5 },
      { ingredientId: 'i005', quantiteParPersonne: 0.5 },
    ],
  },
  {
    id: 'r002', nom: 'Soupe crevettes et coco', emoji: '🍜',
    ingredients: [
      { ingredientId: 'i006', quantiteParPersonne: 200 },
      { ingredientId: 'i007', quantiteParPersonne: 40 },
      { ingredientId: 'i008', quantiteParPersonne: 100 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i010', quantiteParPersonne: 100 },
      { ingredientId: 'i011', quantiteParPersonne: 100 },
      { ingredientId: 'i012', quantiteParPersonne: 200 },
      { ingredientId: 'i013', quantiteParPersonne: 20 },
      { ingredientId: 'i014', quantiteParPersonne: 20 },
      { ingredientId: 'i015', quantiteParPersonne: 1 },
      { ingredientId: 'i016', quantiteParPersonne: 0.5 },
    ],
  },
  {
    id: 'r003', nom: 'Flans courgettes-tomates et fondue de poireau', emoji: '🫕',
    ingredients: [
      { ingredientId: 'i017', quantiteParPersonne: 0.5 },
      { ingredientId: 'i018', quantiteParPersonne: 0.5 },
      { ingredientId: 'i019', quantiteParPersonne: 0.25 },
      { ingredientId: 'i005', quantiteParPersonne: 0.25 },
      { ingredientId: 'i020', quantiteParPersonne: 25 },
      { ingredientId: 'i002', quantiteParPersonne: 1 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i021', quantiteParPersonne: 15 },
    ],
  },
  {
    id: 'r004', nom: 'Cabaillaud à la tomate et au fenouil', emoji: '🐟',
    ingredients: [
      { ingredientId: 'i022', quantiteParPersonne: 1 },
      { ingredientId: 'i023', quantiteParPersonne: 0.5 },
      { ingredientId: 'i024', quantiteParPersonne: 0.25 },
      { ingredientId: 'i025', quantiteParPersonne: 0.5 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i016', quantiteParPersonne: 0.25 },
      { ingredientId: 'i018', quantiteParPersonne: 2 },
    ],
  },
  {
    id: 'r005', nom: 'Escalope de dinde au citron et légumes citronnelle', emoji: '🍗',
    ingredients: [
      { ingredientId: 'i026', quantiteParPersonne: 1 },
      { ingredientId: 'i027', quantiteParPersonne: 0.25 },
      { ingredientId: 'i028', quantiteParPersonne: 0.25 },
      { ingredientId: 'i024', quantiteParPersonne: 0.5 },
      { ingredientId: 'i006', quantiteParPersonne: 63 },
      { ingredientId: 'i017', quantiteParPersonne: 0.5 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i029', quantiteParPersonne: 0.5 },
      { ingredientId: 'i030', quantiteParPersonne: 7.5 },
    ],
  },
  {
    id: 'r006', nom: 'Courgettes farcies gratinées + tomates provencales', emoji: '🥒',
    ingredients: [
      { ingredientId: 'i017', quantiteParPersonne: 0.75 },
      { ingredientId: 'i031', quantiteParPersonne: 100 },
      { ingredientId: 'i032', quantiteParPersonne: 0.5 },
      { ingredientId: 'i033', quantiteParPersonne: 200 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i016', quantiteParPersonne: 1 },
      { ingredientId: 'i025', quantiteParPersonne: 0.25 },
      { ingredientId: 'i018', quantiteParPersonne: 1.5 },
      { ingredientId: 'i027', quantiteParPersonne: 0.25 },
    ],
  },
  {
    id: 'r007', nom: 'Oeufs cocotte au bacon', emoji: '🥚',
    ingredients: [
      { ingredientId: 'i003', quantiteParPersonne: 2 },
      { ingredientId: 'i034', quantiteParPersonne: 2 },
      { ingredientId: 'i021', quantiteParPersonne: 30 },
      { ingredientId: 'i005', quantiteParPersonne: 1 },
      { ingredientId: 'i035', quantiteParPersonne: 1 },
      { ingredientId: 'i036', quantiteParPersonne: 2 },
    ],
  },
  {
    id: 'r008', nom: 'Quiche au thon tomate moutarde sans pâte + salade tomates concombre', emoji: '🥗',
    ingredients: [
      { ingredientId: 'i037', quantiteParPersonne: 30 },
      { ingredientId: 'i038', quantiteParPersonne: 75 },
      { ingredientId: 'i039', quantiteParPersonne: 17 },
      { ingredientId: 'i018', quantiteParPersonne: 1.75 },
      { ingredientId: 'i021', quantiteParPersonne: 30 },
      { ingredientId: 'i003', quantiteParPersonne: 0.5 },
      { ingredientId: 'i040', quantiteParPersonne: 0.25 },
      { ingredientId: 'i041', quantiteParPersonne: 0.25 },
    ],
  },
  {
    id: 'r009', nom: 'Chili Con Carne + riz le midi', emoji: '🌶️',
    ingredients: [
      { ingredientId: 'i031', quantiteParPersonne: 100 },
      { ingredientId: 'i042', quantiteParPersonne: 150 },
      { ingredientId: 'i009', quantiteParPersonne: 0.5 },
      { ingredientId: 'i016', quantiteParPersonne: 0.5 },
      { ingredientId: 'i007', quantiteParPersonne: 15 },
      { ingredientId: 'i033', quantiteParPersonne: 75 },
      { ingredientId: 'i043', quantiteParPersonne: 0.25 },
      { ingredientId: 'i044', quantiteParPersonne: 0.25 },
      { ingredientId: 'i045', quantiteParPersonne: 0.25 },
      { ingredientId: 'i046', quantiteParPersonne: 30 },
      { ingredientId: 'i047', quantiteParPersonne: 0.25 },
    ],
  },
  {
    id: 'r010', nom: 'Salade de pâtes au thon-tomates-avocat', emoji: '🥗',
    ingredients: [
      { ingredientId: 'i048', quantiteParPersonne: 50 },
      { ingredientId: 'i037', quantiteParPersonne: 70 },
      { ingredientId: 'i018', quantiteParPersonne: 1 },
      { ingredientId: 'i049', quantiteParPersonne: 0.5 },
      { ingredientId: 'i050', quantiteParPersonne: 0.1 },
    ],
  },
  {
    id: 'r011', nom: 'Pâtes à la Carbonara', emoji: '🍝',
    ingredients: [
      { ingredientId: 'i048', quantiteParPersonne: 50 },
      { ingredientId: 'i051', quantiteParPersonne: 75 },
      { ingredientId: 'i009', quantiteParPersonne: 0.5 },
      { ingredientId: 'i021', quantiteParPersonne: 50 },
      { ingredientId: 'i005', quantiteParPersonne: 0.5 },
      { ingredientId: 'i003', quantiteParPersonne: 1 },
    ],
  },
  {
    id: 'r012', nom: 'Wok de nouilles chinoises au poulet', emoji: '🥢',
    ingredients: [
      { ingredientId: 'i052', quantiteParPersonne: 50 },
      { ingredientId: 'i053', quantiteParPersonne: 100 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i054', quantiteParPersonne: 0.25 },
      { ingredientId: 'i055', quantiteParPersonne: 0.25 },
      { ingredientId: 'i056', quantiteParPersonne: 0.25 },
      { ingredientId: 'i016', quantiteParPersonne: 0.25 },
      { ingredientId: 'i015', quantiteParPersonne: 1 },
      { ingredientId: 'i030', quantiteParPersonne: 20 },
      { ingredientId: 'i057', quantiteParPersonne: 2 },
      { ingredientId: 'i012', quantiteParPersonne: 150 },
      { ingredientId: 'i058', quantiteParPersonne: 1 },
    ],
  },
  {
    id: 'r013', nom: 'Poke Bowl saumon snacké', emoji: '🍱',
    ingredients: [
      { ingredientId: 'i059', quantiteParPersonne: 1 },
      { ingredientId: 'i046', quantiteParPersonne: 35 },
      { ingredientId: 'i060', quantiteParPersonne: 1 },
      { ingredientId: 'i061', quantiteParPersonne: 30 },
      { ingredientId: 'i049', quantiteParPersonne: 0.5 },
      { ingredientId: 'i058', quantiteParPersonne: 1 },
      { ingredientId: 'i030', quantiteParPersonne: 45 },
      { ingredientId: 'i024', quantiteParPersonne: 0.5 },
      { ingredientId: 'i084', quantiteParPersonne: 0.15 },
      { ingredientId: 'i062', quantiteParPersonne: 0.25 },
      { ingredientId: 'i040', quantiteParPersonne: 0.15 },
    ],
  },
  {
    id: 'r014', nom: 'Gratin de cabillaud au basilic + courgettes', emoji: '🐟',
    ingredients: [
      { ingredientId: 'i063', quantiteParPersonne: 12.5 },
      { ingredientId: 'i022', quantiteParPersonne: 1 },
      { ingredientId: 'i018', quantiteParPersonne: 1.5 },
      { ingredientId: 'i021', quantiteParPersonne: 15 },
      { ingredientId: 'i064', quantiteParPersonne: 0.5 },
      { ingredientId: 'i016', quantiteParPersonne: 1 },
      { ingredientId: 'i017', quantiteParPersonne: 1 },
    ],
  },
  {
    id: 'r015', nom: "Poêlée Croq'Kilos de torsettes complètes aux brocoli, tomates et poivrons", emoji: '🍝',
    ingredients: [
      { ingredientId: 'i048', quantiteParPersonne: 50 },
      { ingredientId: 'i056', quantiteParPersonne: 0.25 },
      { ingredientId: 'i054', quantiteParPersonne: 0.25 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i016', quantiteParPersonne: 0.5 },
      { ingredientId: 'i064', quantiteParPersonne: 0.5 },
    ],
  },
  {
    id: 'r016', nom: 'Hachis parmentier allégé aux petits pois et carottes', emoji: '🥘',
    ingredients: [
      { ingredientId: 'i031', quantiteParPersonne: 83 },
      { ingredientId: 'i010', quantiteParPersonne: 66 },
      { ingredientId: 'i006', quantiteParPersonne: 33 },
      { ingredientId: 'i065', quantiteParPersonne: 20 },
      { ingredientId: 'i009', quantiteParPersonne: 0.15 },
      { ingredientId: 'i016', quantiteParPersonne: 0.3 },
      { ingredientId: 'i033', quantiteParPersonne: 40 },
      { ingredientId: 'i007', quantiteParPersonne: 10 },
      { ingredientId: 'i066', quantiteParPersonne: 10 },
    ],
  },
  {
    id: 'r017', nom: 'Poulet vite fait à la tomate au four + tagliatelle de courgettes', emoji: '🍅',
    ingredients: [
      { ingredientId: 'i053', quantiteParPersonne: 100 },
      { ingredientId: 'i009', quantiteParPersonne: 0.15 },
      { ingredientId: 'i032', quantiteParPersonne: 0.5 },
      { ingredientId: 'i016', quantiteParPersonne: 0.5 },
      { ingredientId: 'i027', quantiteParPersonne: 1 },
      { ingredientId: 'i017', quantiteParPersonne: 1 },
      { ingredientId: 'i064', quantiteParPersonne: 0.25 },
      { ingredientId: 'i062', quantiteParPersonne: 0.25 },
    ],
  },
  {
    id: 'r018', nom: 'Pâtes au saumon sans crème fraiche + poireaux', emoji: '🐟',
    ingredients: [
      { ingredientId: 'i048', quantiteParPersonne: 50 },
      { ingredientId: 'i059', quantiteParPersonne: 1 },
      { ingredientId: 'i038', quantiteParPersonne: 125 },
      { ingredientId: 'i067', quantiteParPersonne: 4 },
      { ingredientId: 'i024', quantiteParPersonne: 0.5 },
      { ingredientId: 'i068', quantiteParPersonne: 1 },
      { ingredientId: 'i002', quantiteParPersonne: 0.5 },
    ],
  },
  {
    id: 'r019', nom: 'Salade de lentilles-saumon-fêta', emoji: '🥗',
    ingredients: [
      { ingredientId: 'i059', quantiteParPersonne: 1 },
      { ingredientId: 'i069', quantiteParPersonne: 50 },
      { ingredientId: 'i070', quantiteParPersonne: 40 },
      { ingredientId: 'i062', quantiteParPersonne: 0.25 },
      { ingredientId: 'i050', quantiteParPersonne: 0.5 },
      { ingredientId: 'i041', quantiteParPersonne: 0.25 },
    ],
  },
  {
    id: 'r020', nom: 'Sauté de crevettes aux brocolis', emoji: '🦐',
    ingredients: [
      { ingredientId: 'i056', quantiteParPersonne: 0.5 },
      { ingredientId: 'i011', quantiteParPersonne: 125 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i058', quantiteParPersonne: 1 },
    ],
  },
  {
    id: 'r021', nom: 'Filets de poulet aux épinards équilibrés', emoji: '🍗',
    ingredients: [
      { ingredientId: 'i053', quantiteParPersonne: 125 },
      { ingredientId: 'i008', quantiteParPersonne: 125 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i030', quantiteParPersonne: 15 },
      { ingredientId: 'i016', quantiteParPersonne: 0.75 },
      { ingredientId: 'i071', quantiteParPersonne: 0.25 },
      { ingredientId: 'i047', quantiteParPersonne: 0.25 },
      { ingredientId: 'i072', quantiteParPersonne: 50 },
      { ingredientId: 'i046', quantiteParPersonne: 30 },
    ],
  },
  {
    id: 'r022', nom: 'Mijoté de boeuf aux carottes pommes de terre', emoji: '🥘',
    ingredients: [
      { ingredientId: 'i073', quantiteParPersonne: 100 },
      { ingredientId: 'i010', quantiteParPersonne: 200 },
      { ingredientId: 'i006', quantiteParPersonne: 120 },
      { ingredientId: 'i009', quantiteParPersonne: 0.25 },
      { ingredientId: 'i007', quantiteParPersonne: 35 },
    ],
  },
  {
    id: 'r023', nom: 'Couscous léger de boeuf', emoji: '🫕',
    ingredients: [
      { ingredientId: 'i031', quantiteParPersonne: 87.5 },
      { ingredientId: 'i003', quantiteParPersonne: 0.25 },
      { ingredientId: 'i074', quantiteParPersonne: 1.625 },
      { ingredientId: 'i075', quantiteParPersonne: 0.125 },
      { ingredientId: 'i043', quantiteParPersonne: 0.25 },
      { ingredientId: 'i044', quantiteParPersonne: 0.75 },
      { ingredientId: 'i009', quantiteParPersonne: 0.75 },
      { ingredientId: 'i057', quantiteParPersonne: 1.25 },
      { ingredientId: 'i076', quantiteParPersonne: 75 },
      { ingredientId: 'i017', quantiteParPersonne: 0.5 },
      { ingredientId: 'i006', quantiteParPersonne: 120 },
      { ingredientId: 'i077', quantiteParPersonne: 0.25 },
      { ingredientId: 'i078', quantiteParPersonne: 0.0625 },
      { ingredientId: 'i071', quantiteParPersonne: 0.5 },
      { ingredientId: 'i079', quantiteParPersonne: 50 },
      { ingredientId: 'i080', quantiteParPersonne: 30 },
    ],
  },
  {
    id: 'r024', nom: 'Poulet aux légumes grillés', emoji: '🍗',
    ingredients: [
      { ingredientId: 'i053', quantiteParPersonne: 125 },
      { ingredientId: 'i017', quantiteParPersonne: 0.5 },
      { ingredientId: 'i018', quantiteParPersonne: 1 },
      { ingredientId: 'i065', quantiteParPersonne: 33 },
      { ingredientId: 'i029', quantiteParPersonne: 0.2 },
      { ingredientId: 'i006', quantiteParPersonne: 25 },
      { ingredientId: 'i009', quantiteParPersonne: 0.15 },
      { ingredientId: 'i016', quantiteParPersonne: 0.25 },
      { ingredientId: 'i081', quantiteParPersonne: 1 },
      { ingredientId: 'i047', quantiteParPersonne: 1.5 },
      { ingredientId: 'i024', quantiteParPersonne: 0.5 },
    ],
  },
  {
    id: 'r025', nom: 'Oeufs cocotte pomme de terre', emoji: '🥚',
    ingredients: [
      { ingredientId: 'i083', quantiteParPersonne: 1 },
      { ingredientId: 'i034', quantiteParPersonne: 2 },
      { ingredientId: 'i003', quantiteParPersonne: 1 },
      { ingredientId: 'i082', quantiteParPersonne: 1 },
      { ingredientId: 'i036', quantiteParPersonne: 1 },
    ],
  },
];
