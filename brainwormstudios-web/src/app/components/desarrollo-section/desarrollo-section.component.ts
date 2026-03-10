import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BwsButtonComponent } from '../bws-button/bws-button.component';
import { CtaCardComponent } from '../cta-card/cta-card.component';
import { SvcFlipCardComponent } from '../svc-flip-card/svc-flip-card.component';
import { CommonModule } from '@angular/common';

export interface ProcessCard {
  frontKey: string;
  backKey: string;
}

export interface DesarrolloService {
  id: number;
  icon: string;
  titleKey: string;
  microKey: string;
  descKey: string;
  processCards?: ProcessCard[];
}

@Component({
  selector: 'app-desarrollo-section',
  standalone: true,
  imports: [TranslateModule, CommonModule, BwsButtonComponent, CtaCardComponent, SvcFlipCardComponent],
  templateUrl: './desarrollo-section.component.html',
  styleUrl: './desarrollo-section.component.scss'
})
export class DesarrolloSectionComponent implements AfterViewChecked {
  view: 'grid' | 'detalle' = 'grid';
  selectedService: DesarrolloService | null = null;
  @ViewChild('viewport') viewport?: ElementRef<HTMLElement>;

  services: DesarrolloService[] = [
    {
      id: 1, icon: '🎮', titleKey: 'DEV_SVC_1_TITLE', microKey: 'DEV_SVC_1_MICRO', descKey: 'DEV_SVC_1_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_PIPELINE', backKey: 'DEV_SVC_1_PROC1' },
        { frontKey: 'DEV_PROC_RESULT', backKey: 'DEV_SVC_1_PROC2' },
      ],
    },
    {
      id: 2, icon: '🧩', titleKey: 'DEV_SVC_2_TITLE', microKey: 'DEV_SVC_2_MICRO', descKey: 'DEV_SVC_2_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_INTEGRATION', backKey: 'DEV_SVC_2_PROC1' },
        { frontKey: 'DEV_PROC_METHOD', backKey: 'DEV_SVC_2_PROC2' },
      ],
    },
    {
      id: 3, icon: '⚙️', titleKey: 'DEV_SVC_3_TITLE', microKey: 'DEV_SVC_3_MICRO', descKey: 'DEV_SVC_3_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_ITERATION', backKey: 'DEV_SVC_3_PROC1' },
        { frontKey: 'DEV_PROC_DELIVER', backKey: 'DEV_SVC_3_PROC2' },
      ],
    },
    {
      id: 4, icon: '🎨', titleKey: 'DEV_SVC_4_TITLE', microKey: 'DEV_SVC_4_MICRO', descKey: 'DEV_SVC_4_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_STYLE', backKey: 'DEV_SVC_4_PROC1' },
        { frontKey: 'DEV_PROC_ASSETS', backKey: 'DEV_SVC_4_PROC2' },
      ],
    },
    {
      id: 5, icon: '🧠', titleKey: 'DEV_SVC_5_TITLE', microKey: 'DEV_SVC_5_MICRO', descKey: 'DEV_SVC_5_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_TOOLS', backKey: 'DEV_SVC_5_PROC1' },
        { frontKey: 'DEV_PROC_OPTIMIZE', backKey: 'DEV_SVC_5_PROC2' },
      ],
    },
    {
      id: 6, icon: '🌐', titleKey: 'DEV_SVC_6_TITLE', microKey: 'DEV_SVC_6_MICRO', descKey: 'DEV_SVC_6_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_DESIGN', backKey: 'DEV_SVC_6_PROC1' },
        { frontKey: 'DEV_PROC_TECH', backKey: 'DEV_SVC_6_PROC2' },
      ],
    },
    {
      id: 7, icon: '🎓', titleKey: 'DEV_SVC_7_TITLE', microKey: 'DEV_SVC_7_MICRO', descKey: 'DEV_SVC_7_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_HANDS', backKey: 'DEV_SVC_7_PROC1' },
        { frontKey: 'DEV_PROC_TOPICS', backKey: 'DEV_SVC_7_PROC2' },
      ],
    },
    {
      id: 8, icon: '🦾', titleKey: 'DEV_SVC_8_TITLE', microKey: 'DEV_SVC_8_MICRO', descKey: 'DEV_SVC_8_DESC',
      processCards: [
        { frontKey: 'DEV_PROC_WORKFLOW', backKey: 'DEV_SVC_8_PROC1' },
        { frontKey: 'DEV_PROC_EXPORT', backKey: 'DEV_SVC_8_PROC2' },
      ],
    },
  ];

  private shouldScrollToTop = false;

  openDetalle(svc: DesarrolloService): void {
    this.selectedService = svc;
    this.view = 'detalle';
    this.shouldScrollToTop = true;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToTop && this.viewport?.nativeElement) {
      this.viewport.nativeElement.scrollTop = 0;
      this.shouldScrollToTop = false;
    }
  }

  volver(): void {
    this.view = 'grid';
    this.selectedService = null;
  }
}
