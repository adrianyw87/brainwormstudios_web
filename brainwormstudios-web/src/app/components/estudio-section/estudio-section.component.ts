import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudio-section',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './estudio-section.component.html',
  styleUrl: './estudio-section.component.scss'
})
export class EstudioSectionComponent {
  @Input() view: 'cta' | 'detalle' = 'cta';
  @Output() explorarClick = new EventEmitter<void>();
}
