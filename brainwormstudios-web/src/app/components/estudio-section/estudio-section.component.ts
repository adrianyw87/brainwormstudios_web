import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CtaCardComponent } from '../cta-card/cta-card.component';
import { BwsButtonComponent } from '../bws-button/bws-button.component';
import { CrewFlipCardComponent } from '../crew-flip-card/crew-flip-card.component';
import { RotatingTitleComponent } from '../rotating-title/rotating-title.component';

@Component({
  selector: 'app-estudio-section',
  standalone: true,
  imports: [TranslateModule, CommonModule, CtaCardComponent, BwsButtonComponent, CrewFlipCardComponent, RotatingTitleComponent],
  templateUrl: './estudio-section.component.html',
  styleUrl: './estudio-section.component.scss'
})
export class EstudioSectionComponent implements OnChanges {
  @Input() view: 'cta' | 'detalle' = 'cta';
  @Input() animationTrigger = 0;

  ctaCards = [
    { titleKey: 'CTA_EXPLORAR', descKey: 'CTA_CARD_ESTUDIO_DESC', buttonKey: 'NAV_CONOCENOS_BUTTON', href: null as string | null, imageSrc: null as string | null, hideTitle: false },
    { titleKey: 'NAV_FREEJEFRY', descKey: 'CTA_CARD_FREEJEFRY_DESC', buttonKey: 'CTA_ENTRAR', href: '/free-jefry', imageSrc: 'img/FreeJefryLogoPNG.png', hideTitle: true },
    { titleKey: 'NAV_DESARROLLO', descKey: 'CTA_CARD_DESARROLLO_DESC', buttonKey: 'NAV_DESARROLLO_SHORT', href: '/development', imageSrc: null as string | null, hideTitle: false },
  ];
  flippedIndex: number | null = null;
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

  onCrewCardFlip(index: number): void {
    this.flippedIndex = this.flippedIndex === index ? null : index;
  }
}
