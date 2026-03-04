import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BrainWorm Studios';
  currentLang = 'es';
  langOpen = false;

  readonly languages = [
    { code: 'es', label: 'LANG_ES' },
    { code: 'en', label: 'LANG_EN' }
  ];

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

  setLanguage(code: string): void {
    this.currentLang = code;
    this.translate.use(code);
    localStorage.setItem('lang', code);
    document.documentElement.lang = code;
    this.langOpen = false;
  }

  toggleLangDropdown(): void {
    this.langOpen = !this.langOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.langOpen && !target.closest('.lang-selector')) {
      this.langOpen = false;
    }
  }
}
