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
  }

  ngOnDestroy(): void {
    this.lightboxUnsub?.();
  }

  closeLightbox(): void {
    this.lightbox.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightboxState.open) this.lightbox.close();
  }
}
