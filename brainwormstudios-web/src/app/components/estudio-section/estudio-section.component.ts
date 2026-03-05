import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BwsButtonComponent } from '../bws-button/bws-button.component';

@Component({
  selector: 'app-estudio-section',
  standalone: true,
  imports: [TranslateModule, CommonModule, BwsButtonComponent],
  templateUrl: './estudio-section.component.html',
  styleUrl: './estudio-section.component.scss'
})
export class EstudioSectionComponent implements OnChanges {
  @Input() view: 'cta' | 'detalle' = 'cta';
  @Input() animationTrigger = 0;
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
