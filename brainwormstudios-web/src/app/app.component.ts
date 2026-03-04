import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  NavBarComponent,
  EstudioSectionComponent,
  FreeJefrySectionComponent,
  DesarrolloSectionComponent,
  ContactoSectionComponent
} from './components';

@Component({
  selector: 'app-root',
  imports: [
    NavBarComponent,
    EstudioSectionComponent,
    FreeJefrySectionComponent,
    DesarrolloSectionComponent,
    ContactoSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BrainWorm Studios';
  currentLang = 'es';
  estudioView: 'cta' | 'detalle' = 'cta';

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
  };

  goToEstudioDetalle(): void {
    this.estudioView = 'detalle';
  }
}
