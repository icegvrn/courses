import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { Recette, RecetteIngredient } from '../../models/models';

interface RecetteForm {
  id?: string;
  nom: string;
  description: string;
  emoji: string;
  ingredients: { ingredientId: string; quantiteParPersonne: number | null }[];
}

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recettes.html',
  styleUrl: './recettes.scss',
})
export class RecettesComponent {
  dataService = inject(DataService);
  private toastService = inject(ToastService);

  recettes = this.dataService.recettesSorted;
  ingredients = this.dataService.ingredients;

  search = signal('');
  showModal = signal(false);
  showDeleteConfirm = signal<string | null>(null);

  form = signal<RecetteForm>({
    nom: '', description: '', emoji: '🍽️',
    ingredients: [{ ingredientId: '', quantiteParPersonne: null }],
  });

  filteredRecettes = computed(() => {
    const q = this.search().toLowerCase();
    if (!q) return this.recettes();
    return this.recettes().filter(r =>
      r.nom.toLowerCase().includes(q) ||
      (r.description ?? '').toLowerCase().includes(q)
    );
  });

  openCreate(): void {
    this.form.set({ nom: '', description: '', emoji: '🍽️', ingredients: [{ ingredientId: '', quantiteParPersonne: null }] });
    this.showModal.set(true);
  }

  openEdit(r: Recette): void {
    this.form.set({
      id: r.id,
      nom: r.nom,
      description: r.description ?? '',
      emoji: r.emoji ?? '🍽️',
      ingredients: r.ingredients.map(ri => ({ ingredientId: ri.ingredientId, quantiteParPersonne: ri.quantiteParPersonne })),
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  addIngredientLine(): void {
    this.form.update(f => ({
      ...f,
      ingredients: [...f.ingredients, { ingredientId: '', quantiteParPersonne: null }],
    }));
  }

  removeIngredientLine(index: number): void {
    this.form.update(f => ({
      ...f,
      ingredients: f.ingredients.filter((_, i) => i !== index),
    }));
  }

  updateIngredientLine(index: number, field: 'ingredientId' | 'quantiteParPersonne', value: string | number): void {
    this.form.update(f => {
      const ings = [...f.ingredients];
      ings[index] = { ...ings[index], [field]: value };
      return { ...f, ingredients: ings };
    });
  }

  save(): void {
    const f = this.form();
    if (!f.nom.trim()) { this.toastService.show('Le nom est requis', 'error'); return; }

    const validIngs = f.ingredients.filter(i => i.ingredientId && (i.quantiteParPersonne ?? 0) > 0);
    if (validIngs.length === 0) { this.toastService.show('Ajoutez au moins un ingrédient avec une quantité', 'error'); return; }

    const recette: Recette = {
      id: f.id ?? this.dataService.generateId(),
      nom: f.nom.trim(),
      description: f.description.trim() || undefined,
      emoji: f.emoji || '🍽️',
      ingredients: validIngs as RecetteIngredient[],
    };

    if (f.id) {
      this.dataService.updateRecette(recette);
      this.toastService.show('Recette modifiée !');
    } else {
      this.dataService.addRecette(recette);
      this.toastService.show('Recette ajoutée !');
    }
    this.closeModal();
  }

  confirmDelete(id: string): void {
    this.showDeleteConfirm.set(id);
  }

  cancelDelete(): void {
    this.showDeleteConfirm.set(null);
  }

  executeDelete(): void {
    const id = this.showDeleteConfirm();
    if (id) {
      this.dataService.deleteRecette(id);
      this.toastService.show('Recette supprimée', 'info');
      this.showDeleteConfirm.set(null);
      this.showModal.set(false);
    }
  }

  getIngredientNom(id: string): string {
    return this.dataService.getIngredientById(id)?.nom ?? '—';
  }

  getIngredientUnite(id: string): string {
    return this.dataService.getIngredientById(id)?.unite ?? '';
  }
}
