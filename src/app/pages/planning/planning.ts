import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

interface RecetteLine {
  recetteId: string;
  nom: string;
  emoji: string;
  nombrePersonnes: number;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
})
export class PlanningComponent {
  private dataService = inject(DataService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Toutes les recettes avec leur quantité courante (0 par défaut)
  lines = computed<RecetteLine[]>(() =>
    this.dataService.recettesSorted().map(r => {
      const planItem = this.dataService.planning().find(p => p.recetteId === r.id);
      return {
        recetteId: r.id,
        nom: r.nom,
        emoji: r.emoji ?? '🍽️',
        nombrePersonnes: planItem?.nombrePersonnes ?? 0,
      };
    })
  );

  activeCount = computed(() =>
    this.dataService.planning().filter(p => p.nombrePersonnes > 0).length
  );

  totalPersonnes = computed(() =>
    this.dataService.planning().reduce((s, p) => s + p.nombrePersonnes, 0)
  );

  setPersonnes(recetteId: string, delta: number): void {
    const existing = this.dataService.planning().find(p => p.recetteId === recetteId);
    const current = existing?.nombrePersonnes ?? 0;
    const next = Math.max(0, current + delta);

    if (existing) {
      if (next === 0) {
        this.dataService.deletePlanningItem(existing.id);
      } else {
        this.dataService.updatePlanningItem({ ...existing, nombrePersonnes: next });
      }
    } else if (next > 0) {
      this.dataService.addPlanningItem({
        id: this.dataService.generateId(),
        recetteId,
        nombrePersonnes: next,
      });
    }
  }

  reset(): void {
    this.dataService.clearPlanning();
    this.toastService.show('Planning réinitialisé');
  }

  generer(): void {
    if (this.activeCount() === 0) {
      this.toastService.show('Sélectionnez au moins un repas !', 'error');
      return;
    }
    this.router.navigate(['/courses']);
  }
}
