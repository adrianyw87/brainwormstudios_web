import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type FjRevealVariant = 'fade' | 'slideLeft' | 'slideRight' | 'slideUp' | 'scale' | 'slideDown';

@Directive({
  selector: '[fjReveal]',
  standalone: true,
  host: {
    '[class.fj-reveal]': 'true',
    '[class.fj-reveal--visible]': 'visible',
    '[class.fj-reveal--fade]': "variant === 'fade'",
    '[class.fj-reveal--slideLeft]': "variant === 'slideLeft'",
    '[class.fj-reveal--slideRight]': "variant === 'slideRight'",
    '[class.fj-reveal--slideUp]': "variant === 'slideUp'",
    '[class.fj-reveal--slideDown]': "variant === 'slideDown'",
    '[class.fj-reveal--scale]': "variant === 'scale'",
  }
})
export class FjRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  @Input() fjReveal: FjRevealVariant = 'fade';
  @Input() fjRevealThreshold = 0.15;
  @Input() fjRevealRootMargin = '0px 0px -40px 0px';

  variant: FjRevealVariant = 'fade';
  visible = false;
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.variant = this.fjReveal;
    if (!isPlatformBrowser(this.platformId)) {
      this.visible = true;
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.visible = true;
            this.observer?.unobserve(e.target);
          }
        }
      },
      {
        threshold: this.fjRevealThreshold,
        rootMargin: this.fjRevealRootMargin,
      }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
