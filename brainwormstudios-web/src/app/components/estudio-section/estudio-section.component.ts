import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BwsButtonComponent } from '../bws-button/bws-button.component';

@Component({
  selector: 'app-estudio-section',
  standalone: true,
  imports: [TranslateModule, CommonModule, BwsButtonComponent],
  templateUrl: './estudio-section.component.html',
  styleUrl: './estudio-section.component.scss'
})
export class EstudioSectionComponent implements OnInit, OnChanges {
  @Input() view: 'cta' | 'detalle' = 'cta';
  @Input() animationTrigger = 0;

  titleChars: string[] = [];

  constructor(public translate: TranslateService) {
    this.updateTitleChars();
    this.translate.onLangChange.subscribe(() => this.updateTitleChars());
  }

  ngOnInit(): void {
    this.updateTitleChars();
  }

  private updateTitleChars(): void {
    const t = this.translate.instant('SECTION_ESTUDIO_TITLE') || '';
    this.titleChars = t.split('');
  }

  /** Resalta B, W y la primera S (BrainWorm Studios) */
  isHighlightChar(i: number): boolean {
    const c = this.titleChars[i];
    if (!c || c === ' ') return false;
    if (c === 'B' || c === 'W') return true;
    if (c === 'S') {
      const title = this.titleChars.join('');
      return title.indexOf('S') === i;
    }
    return false;
  }

  crew = [
    { initial: 'ESTUDIO_MEMBER_1_INITIAL', name: 'ESTUDIO_MEMBER_1_NAME', role: 'ESTUDIO_MEMBER_1_ROLE', past: 'ESTUDIO_MEMBER_1_PAST' },
    { initial: 'ESTUDIO_MEMBER_2_INITIAL', name: 'ESTUDIO_MEMBER_2_NAME', role: 'ESTUDIO_MEMBER_2_ROLE', past: 'ESTUDIO_MEMBER_2_PAST' },
    { initial: 'ESTUDIO_MEMBER_3_INITIAL', name: 'ESTUDIO_MEMBER_3_NAME', role: 'ESTUDIO_MEMBER_3_ROLE', past: 'ESTUDIO_MEMBER_3_PAST' },
  ];
  @Output() explorarClick = new EventEmitter<void>();
  @Output() volverClick = new EventEmitter<void>();

  get shouldAnimateCta(): boolean {
    return this._shouldAnimateCta;
  }
  private _shouldAnimateCta = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animationTrigger'] && this.animationTrigger > 0 && this.view === 'cta') {
      this._shouldAnimateCta = false;
      setTimeout(() => (this._shouldAnimateCta = true), 0);
    }
  }

  onExplorarClick(): void {
    this.explorarClick.emit();
  }

  onVolverClick(): void {
    this.volverClick.emit();
  }
}
