import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-svc-flip-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './svc-flip-card.component.html',
  styleUrl: './svc-flip-card.component.scss'
})
export class SvcFlipCardComponent {
  @Input() frontKey = '';
  @Input() backKey = '';
}
