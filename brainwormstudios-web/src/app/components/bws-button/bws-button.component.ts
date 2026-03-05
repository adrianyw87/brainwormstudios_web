import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bws-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bws-button.component.html',
  styleUrl: './bws-button.component.scss'
})
export class BwsButtonComponent implements AfterViewInit, OnDestroy {
  @Input() href: string | null = null;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clicked = new EventEmitter<void>();
  private ro: ResizeObserver | null = null;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this.updateSize();
    this.ro = new ResizeObserver(() => this.updateSize());
    const btn = this.el.nativeElement.querySelector('.bws-btn');
    if (btn) this.ro.observe(btn);
  }

  ngOnDestroy(): void {
    this.ro?.disconnect();
  }

  private updateSize(): void {
    const btn = this.el.nativeElement.querySelector('.bws-btn');
    if (btn) {
      const w = btn.getBoundingClientRect().width;
      const h = btn.getBoundingClientRect().height;
      (btn as HTMLElement).style.setProperty('--btn-w', String(w));
      (btn as HTMLElement).style.setProperty('--btn-h', String(h));
    }
  }

  onClick(): void {
    this.clicked.emit();
  }
}
