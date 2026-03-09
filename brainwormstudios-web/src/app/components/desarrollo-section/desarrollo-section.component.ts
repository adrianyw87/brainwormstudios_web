import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BwsButtonComponent } from '../bws-button/bws-button.component';
import { CtaCardComponent } from '../cta-card/cta-card.component';
import { CommonModule } from '@angular/common';

export interface DesarrolloService {
  id: number;
  icon: string;
  titleKey: string;
  microKey: string;
  descKey: string;
}

@Component({
  selector: 'app-desarrollo-section',
  standalone: true,
  imports: [TranslateModule, CommonModule, BwsButtonComponent, CtaCardComponent],
  templateUrl: './desarrollo-section.component.html',
  styleUrl: './desarrollo-section.component.scss'
})
export class DesarrolloSectionComponent {
  view: 'grid' | 'detalle' = 'grid';
  selectedService: DesarrolloService | null = null;

  services: DesarrolloService[] = [
    { id: 1, icon: '🎮', titleKey: 'DEV_SVC_1_TITLE', microKey: 'DEV_SVC_1_MICRO', descKey: 'DEV_SVC_1_DESC' },
    { id: 2, icon: '🧩', titleKey: 'DEV_SVC_2_TITLE', microKey: 'DEV_SVC_2_MICRO', descKey: 'DEV_SVC_2_DESC' },
    { id: 3, icon: '⚙️', titleKey: 'DEV_SVC_3_TITLE', microKey: 'DEV_SVC_3_MICRO', descKey: 'DEV_SVC_3_DESC' },
    { id: 4, icon: '🎨', titleKey: 'DEV_SVC_4_TITLE', microKey: 'DEV_SVC_4_MICRO', descKey: 'DEV_SVC_4_DESC' },
    { id: 5, icon: '🧠', titleKey: 'DEV_SVC_5_TITLE', microKey: 'DEV_SVC_5_MICRO', descKey: 'DEV_SVC_5_DESC' },
    { id: 6, icon: '🌐', titleKey: 'DEV_SVC_6_TITLE', microKey: 'DEV_SVC_6_MICRO', descKey: 'DEV_SVC_6_DESC' },
    { id: 7, icon: '🎓', titleKey: 'DEV_SVC_7_TITLE', microKey: 'DEV_SVC_7_MICRO', descKey: 'DEV_SVC_7_DESC' },
    { id: 8, icon: '🦾', titleKey: 'DEV_SVC_8_TITLE', microKey: 'DEV_SVC_8_MICRO', descKey: 'DEV_SVC_8_DESC' },
  ];

  openDetalle(svc: DesarrolloService): void {
    this.selectedService = svc;
    this.view = 'detalle';
  }

  volver(): void {
    this.view = 'grid';
    this.selectedService = null;
  }
}
