import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { CourseItem } from '../../models/models';

interface GroupedCourses {
  categorie: string;
  items: (CourseItem & { checked: boolean })[];
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class CoursesComponent {
  dataService = inject(DataService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  checked = signal<Set<string>>(new Set());

  courses = this.dataService.courses;

  grouped = computed<GroupedCourses[]>(() => {
    const map = new Map<string, (CourseItem & { checked: boolean })[]>();
    for (const item of this.courses()) {
      const cat = item.ingredient.categorie ?? 'Autres';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push({ ...item, checked: this.checked().has(item.ingredient.id) });
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([categorie, items]) => ({ categorie, items }));
  });

  totalCount = computed(() => this.courses().length);
  checkedCount = computed(() => this.checked().size);

  uncheckedCount = computed(() => this.totalCount() - this.checkedCount());

  toggle(ingredientId: string): void {
    this.checked.update(s => {
      const copy = new Set(s);
      if (copy.has(ingredientId)) copy.delete(ingredientId);
      else copy.add(ingredientId);
      return copy;
    });
  }

  resetChecked(): void {
    this.checked.set(new Set());
  }

  exportListe(): void {
    const lines: string[] = ['LISTE DE COURSES', '================', ''];
    for (const group of this.grouped()) {
      lines.push(`[${group.categorie}]`);
      for (const item of group.items) {
        const qty = this.dataService.formatQuantite(item.quantiteTotale);
        const check = item.checked ? '✓' : '☐';
        lines.push(`  ${check} ${item.ingredient.nom} — ${qty} ${item.ingredient.unite}`);
      }
      lines.push('');
    }
    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.show('Liste copiée dans le presse-papier !');
    }).catch(() => {
      // fallback: download
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste-courses.txt';
      a.click();
      URL.revokeObjectURL(url);
      this.toastService.show('Liste téléchargée !');
    });
  }

  formatQty(val: number): string {
    return this.dataService.formatQuantite(val);
  }

  goToPlanning(): void {
    this.router.navigate(['/planning']);
  }
}
