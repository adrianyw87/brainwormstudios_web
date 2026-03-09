import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FjLightboxService } from '../../services/fj-lightbox.service';
import { TranslateModule } from '@ngx-translate/core';

export interface FjCardItem {
  imageSrc: string;
  titleKey: string;
  subtitle?: string;
}

@Component({
  selector: 'app-fj-card-deck',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './fj-card-deck.component.html',
  styleUrl: './fj-card-deck.component.scss'
})
export class FjCardDeckComponent {
  @Input() items: FjCardItem[] = [];
  @Input() titleKey = '';
  @Input() hideOverlay = false;

  currentIndex = 0;
  private lightbox = inject(FjLightboxService);

  get currentItem(): FjCardItem | null {
    return this.items[this.currentIndex] ?? null;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev(): void {
    this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
  }

  goTo(index: number): void {
    this.currentIndex = index % this.items.length;
  }

  getCardTransform(i: number): string {
    const len = this.items.length;
    if (len <= 1) return 'translateX(0) scale(1)';
    let delta = (i - this.currentIndex + len) % len;
    if (delta > len / 2) delta -= len;
    if (delta === 0) return 'translateX(0) translateZ(0) scale(1)';
    const tx = delta * 95;
    const scale = 1 - Math.abs(delta) * 0.12;
    return `translateX(${tx}px) scale(${scale})`;
  }

  getCardZIndex(i: number): number {
    const len = this.items.length;
    let delta = (i - this.currentIndex + len) % len;
    if (delta > len / 2) delta = len - delta;
    return 20 - delta;
  }

  onStackClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.fj-card-deck__card--front')) {
      if (this.currentItem) this.openPopup(this.currentItem);
    } else {
      this.next();
    }
  }

  openPopup(item: FjCardItem): void {
    this.lightbox.open(item.imageSrc);
  }
}
