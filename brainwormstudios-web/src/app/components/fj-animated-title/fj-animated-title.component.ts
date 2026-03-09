import { Component, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'span[fjAnimatedTitle]',
  standalone: true,
  imports: [TranslateModule, AsyncPipe],
  template: `
    @for (char of letters$ | async; track $index) {
      @if (char === ' ') {
        <span class="fj-animated-title__space">&#160;</span>
      } @else {
        <span class="fj-animated-title__char" [style.animation-delay.ms]="$index * 50">{{ char }}</span>
      }
    }
  `,
  styleUrls: ['./fj-animated-title.component.scss'],
})
export class FjAnimatedTitleComponent {
  private translate = inject(TranslateService);

  @Input({ required: true }) set fjAnimatedTitle(key: string) {
    this.letters$ = this.translate.stream(key).pipe(
      map((text) => (text || '').split(''))
    );
  }

  letters$: Observable<string[]> = new Observable();
}
