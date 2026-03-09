import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { BwsButtonComponent } from '../bws-button/bws-button.component';

@Component({
  selector: 'app-cta-card',
  standalone: true,
  imports: [BwsButtonComponent],
  templateUrl: './cta-card.component.html',
  styleUrl: './cta-card.component.scss',
  host: { class: 'cta-card-host' }
})
export class CtaCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttonLabel = '';
  @Input() href: string | null = null;
  @Input() imageSrc: string | null = null;
  @Input() imageOverflow = false;
  @Input() cardVariant: string | null = null;
  @Input() hideTitle = false;
  @Output() buttonClick = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) { }

  @HostListener('mousemove', ['$event'])
  onMouseMove(ev: MouseEvent): void {
    const card = this.el.nativeElement.querySelector('.cta-card');
    if (!card) return;
    const rect = (card as HTMLElement).getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const rotateY = ((x - w / 2) / (w / 2)) * -8;
    const rotateX = ((y - h / 2) / (h / 2)) * 8;
    (card as HTMLElement).style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const card = this.el.nativeElement.querySelector('.cta-card');
    if (card) {
      (card as HTMLElement).style.transform = 'perspective(600px) rotateX(-3deg) rotateY(2deg) scale(1)';
    }
  }

  onButtonClick(): void {
    if (!this.href) {
      this.buttonClick.emit();
    }
  }
}
