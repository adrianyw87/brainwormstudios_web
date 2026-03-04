import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() currentLang = 'es';
  @Input() onEstudioNavClick: () => void = () => { };
  @Output() languageChange = new EventEmitter<string>();

  langOpen = false;

  readonly languages = [
    { code: 'es', label: 'LANG_ES' },
    { code: 'en', label: 'LANG_EN' }
  ];

  constructor(public translate: TranslateService) { }

  setLanguage(code: string): void {
    this.translate.use(code);
    localStorage.setItem('lang', code);
    document.documentElement.lang = code;
    this.languageChange.emit(code);
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
