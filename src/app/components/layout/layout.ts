import { Component, signal, inject, HostListener } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ToastComponent } from '../toast/toast';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  badge?: () => number;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule, ToastComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent {
  private dataService = inject(DataService);

  isMobile = signal(window.innerWidth < 768);
  sidebarCollapsed = signal(window.innerWidth < 1024 && window.innerWidth >= 768);

  navItems: NavItem[] = [
    { path: '/planning',     label: 'Planning',      icon: '📅', badge: () => this.dataService.planning().length },
    { path: '/courses',      label: 'Ma liste',      icon: '🛒', badge: () => this.dataService.courses().length },
    { path: '/recettes',     label: 'Recettes',      icon: '🍽️', badge: () => this.dataService.recettes().length },
    { path: '/ingredients',  label: 'Ingrédients',   icon: '🥕', badge: () => this.dataService.ingredients().length },
  ];

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile.set(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      this.sidebarCollapsed.set(window.innerWidth < 1024);
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
