import { Injectable, signal, computed } from '@angular/core';
import {
  Ingredient, Recette, PlanningItem, CourseItem,
  DEMO_INGREDIENTS, DEMO_RECETTES,
} from '../models/models';

const KEYS = {
  ingredients: 'mc_ingredients_v2',
  recettes:    'mc_recettes_v2',
  planning:    'mc_planning_v2',
};

@Injectable({ providedIn: 'root' })
export class DataService {
  // ── State ──────────────────────────────────────────────────
  ingredients = signal<Ingredient[]>(this.load(KEYS.ingredients, DEMO_INGREDIENTS));
  recettes    = signal<Recette[]>(this.load(KEYS.recettes, DEMO_RECETTES));
  planning    = signal<PlanningItem[]>(this.load(KEYS.planning, []));

  // Recettes triées alphabétiquement — utilisé par toutes les pages
  recettesSorted = computed<Recette[]>(() =>
    [...this.recettes()].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  );

  // ── Computed ────────────────────────────────────────────────
  courses = computed<CourseItem[]>(() => this.genererCourses());

  // ── Persistence ─────────────────────────────────────────────
  private load<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  private save(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ── Ingredient CRUD ─────────────────────────────────────────
  addIngredient(ing: Ingredient): void {
    this.ingredients.update(list => { const n = [...list, ing]; this.save(KEYS.ingredients, n); return n; });
  }

  updateIngredient(ing: Ingredient): void {
    this.ingredients.update(list => { const n = list.map(i => i.id === ing.id ? ing : i); this.save(KEYS.ingredients, n); return n; });
  }

  deleteIngredient(id: string): void {
    this.ingredients.update(list => { const n = list.filter(i => i.id !== id); this.save(KEYS.ingredients, n); return n; });
  }

  // ── Recette CRUD ─────────────────────────────────────────────
  addRecette(r: Recette): void {
    this.recettes.update(list => { const n = [...list, r]; this.save(KEYS.recettes, n); return n; });
  }

  updateRecette(r: Recette): void {
    this.recettes.update(list => { const n = list.map(x => x.id === r.id ? r : x); this.save(KEYS.recettes, n); return n; });
  }

  deleteRecette(id: string): void {
    this.recettes.update(list => { const n = list.filter(r => r.id !== id); this.save(KEYS.recettes, n); return n; });
    // Remove from planning too
    this.planning.update(list => { const n = list.filter(p => p.recetteId !== id); this.save(KEYS.planning, n); return n; });
  }

  // ── Planning CRUD ────────────────────────────────────────────
  addPlanningItem(item: PlanningItem): void {
    this.planning.update(list => { const n = [...list, item]; this.save(KEYS.planning, n); return n; });
  }

  updatePlanningItem(item: PlanningItem): void {
    this.planning.update(list => { const n = list.map(p => p.id === item.id ? item : p); this.save(KEYS.planning, n); return n; });
  }

  deletePlanningItem(id: string): void {
    this.planning.update(list => { const n = list.filter(p => p.id !== id); this.save(KEYS.planning, n); return n; });
  }

  clearPlanning(): void {
    this.planning.set([]);
    this.save(KEYS.planning, []);
  }

  // ── Generation ──────────────────────────────────────────────
  private genererCourses(): CourseItem[] {
    const quantities: Record<string, { total: number; recettes: string[] }> = {};

    for (const planItem of this.planning()) {
      if (planItem.nombrePersonnes <= 0) continue;

      const recette = this.recettes().find(r => r.id === planItem.recetteId);
      if (!recette) continue;

      for (const ri of recette.ingredients) {
        const qty = ri.quantiteParPersonne * planItem.nombrePersonnes;
        if (!quantities[ri.ingredientId]) {
          quantities[ri.ingredientId] = { total: 0, recettes: [] };
        }
        quantities[ri.ingredientId].total += qty;
        if (!quantities[ri.ingredientId].recettes.includes(recette.nom)) {
          quantities[ri.ingredientId].recettes.push(recette.nom);
        }
      }
    }

    const result: CourseItem[] = [];
    for (const [id, data] of Object.entries(quantities)) {
      const ingredient = this.ingredients().find(i => i.id === id);
      if (ingredient) {
        result.push({ ingredient, quantiteTotale: data.total, recettes: data.recettes });
      }
    }

    // Sort by category then name
    return result.sort((a, b) => {
      const catA = a.ingredient.categorie ?? 'Autres';
      const catB = b.ingredient.categorie ?? 'Autres';
      if (catA !== catB) return catA.localeCompare(catB);
      return a.ingredient.nom.localeCompare(b.ingredient.nom);
    });
  }

  // ── Helpers ─────────────────────────────────────────────────
  getIngredientById(id: string): Ingredient | undefined {
    return this.ingredients().find(i => i.id === id);
  }

  getRecetteById(id: string): Recette | undefined {
    return this.recettes().find(r => r.id === id);
  }

  isIngredientUsed(id: string): number {
    return this.recettes().filter(r => r.ingredients.some(ri => ri.ingredientId === id)).length;
  }

  formatQuantite(val: number): string {
    if (Number.isInteger(val)) return val.toString();
    const rounded = Math.round(val * 100) / 100;
    return rounded.toString().replace('.', ',');
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
}
