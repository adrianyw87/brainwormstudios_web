import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { FjLightboxService } from './services/fj-lightbox.service';
import { TranslateService } from '@ngx-translate/core';
import {
  NavBarComponent,
  EstudioSectionComponent,
  FreeJefrySectionComponent,
  DesarrolloSectionComponent,
  // MerchanSectionComponent, // Comentado - volveremos más adelante
  ContactoSectionComponent
} from './components';

type Section = 'studio' | 'free-jefry' | 'development' | 'contact';

@Component({
  selector: 'app-root',
  imports: [
    NavBarComponent,
    EstudioSectionComponent,
    FreeJefrySectionComponent,
    DesarrolloSectionComponent,
    // MerchanSectionComponent, // Comentado - volveremos más adelante
    ContactoSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BrainWorm Studios';
  currentLang = 'es';
  currentSection: Section = 'studio';
  estudioView: 'cta' | 'detalle' = 'cta';
  estudioAnimationKey = 0;
  lightboxState = { open: false, src: null as string | null };
  private lightboxUnsub?: () => void;

  private lightbox = inject(FjLightboxService);

  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
    const saved = localStorage.getItem('lang');
    if (saved && ['es', 'en'].includes(saved)) {
      this.currentLang = saved;
      translate.use(saved);
      document.documentElement.lang = saved;
    }
  }

  onLanguageChange(code: string): void {
    this.currentLang = code;
  }

  resetEstudioView = (): void => {
    this.estudioView = 'cta';
    this.estudioAnimationKey++;
  };

  goToEstudioDetalle(): void {
    this.estudioView = 'detalle';
  }

  ngOnInit(): void {
    this.lightboxUnsub = this.lightbox.subscribe((s) => {
      this.lightboxState = s;
    });
    this.syncSectionFromPath();
    window.addEventListener('popstate', this.handlePopState);
  }

  ngOnDestroy(): void {
    this.lightboxUnsub?.();
    window.removeEventListener('popstate', this.handlePopState);
  }

  private handlePopState = (): void => {
    this.syncSectionFromPath();
  };

  private syncSectionFromPath(): void {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'studio';
    const valid: Section[] = ['studio', 'free-jefry', 'development', 'contact'];
    this.currentSection = valid.includes(path as Section) ? (path as Section) : 'studio';
  }

  navigateTo(section: Section): void {
    this.currentSection = section;
    const path = section === 'studio' ? '/' : `/${section}`;
    history.pushState(null, '', path);
  }

  closeLightbox(): void {
    this.lightbox.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightboxState.open) this.lightbox.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (e.ctrlKey || e.metaKey || e.button !== 0) return; // permitir abrir en nueva pestaña
    const a = (e.target as HTMLElement).closest?.('a[href^="/"]');
    if (!a || a.getAttribute('href') === null || (a as HTMLAnchorElement).target === '_blank') return;
    const href = (a as HTMLAnchorElement).getAttribute('href')!;
    if (href === '/' || href === '') {
      e.preventDefault();
      this.navigateTo('studio');
      if (a.closest('.nav-logo, #nav-uno')) this.resetEstudioView();
      return;
    }
    const section = href.replace(/^\/+|\/+$/g, '') as Section;
    if (['studio', 'free-jefry', 'development', 'contact'].includes(section)) {
      e.preventDefault();
      this.navigateTo(section === 'studio' ? 'studio' : section);
    }
  }
}
