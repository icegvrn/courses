import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { Ingredient, CATEGORIES, UNITES } from '../../models/models';

interface IngredientForm {
  id?: string;
  nom: string;
  unite: string;
  categorie: string;
}

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredients.html',
  styleUrl: './ingredients.scss',
})
export class IngredientsComponent {
  dataService = inject(DataService);
  private toastService = inject(ToastService);

  ingredients = this.dataService.ingredients;
  categories = CATEGORIES;
  unites = UNITES;

  search = signal('');
  sortField = signal<'nom' | 'categorie'>('categorie');
  showModal = signal(false);
  showDeleteConfirm = signal<string | null>(null);
  filterCat = signal('');

  form = signal<IngredientForm>({ nom: '', unite: '', categorie: '' });

  allCats = computed(() => {
    const cats = new Set(this.ingredients().map(i => i.categorie ?? 'Autres'));
    return ['', ...Array.from(cats).sort()];
  });

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    const cat = this.filterCat();
    let list = this.ingredients();
    if (q) list = list.filter(i => i.nom.toLowerCase().includes(q) || (i.categorie ?? '').toLowerCase().includes(q));
    if (cat) list = list.filter(i => (i.categorie ?? 'Autres') === cat);
    return [...list].sort((a, b) => {
      if (this.sortField() === 'categorie') {
        const ca = a.categorie ?? 'Autres', cb = b.categorie ?? 'Autres';
        if (ca !== cb) return ca.localeCompare(cb);
      }
      return a.nom.localeCompare(b.nom);
    });
  });

  openCreate(): void {
    this.form.set({ nom: '', unite: 'pièce(s)', categorie: '' });
    this.showModal.set(true);
  }

  openEdit(ing: Ingredient): void {
    this.form.set({ id: ing.id, nom: ing.nom, unite: ing.unite, categorie: ing.categorie ?? '' });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  save(): void {
    const f = this.form();
    if (!f.nom.trim()) { this.toastService.show('Le nom est requis', 'error'); return; }
    if (!f.unite.trim()) { this.toastService.show('L\'unité est requise', 'error'); return; }

    // Check uniqueness (for new)
    if (!f.id) {
      const exists = this.ingredients().some(i => i.nom.toLowerCase() === f.nom.toLowerCase().trim());
      if (exists) { this.toastService.show('Un ingrédient avec ce nom existe déjà', 'error'); return; }
    }

    const ing: Ingredient = {
      id: f.id ?? this.dataService.generateId(),
      nom: f.nom.trim(),
      unite: f.unite.trim(),
      categorie: f.categorie || undefined,
    };

    if (f.id) {
      this.dataService.updateIngredient(ing);
      this.toastService.show('Ingrédient modifié !');
    } else {
      this.dataService.addIngredient(ing);
      this.toastService.show('Ingrédient ajouté !');
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
      this.dataService.deleteIngredient(id);
      this.toastService.show('Ingrédient supprimé', 'info');
      this.showDeleteConfirm.set(null);
      this.showModal.set(false);
    }
  }

  usageCount(id: string): number {
    return this.dataService.isIngredientUsed(id);
  }
}
