import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface CrewMember {
  initial: string;
  name: string;
  role: string;
  past: string;
}

@Component({
  selector: 'app-crew-flip-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './crew-flip-card.component.html',
  styleUrl: './crew-flip-card.component.scss'
})
export class CrewFlipCardComponent {
  @Input() member!: CrewMember;
  @Input() isFlipped = false;
  @Output() flipRequest = new EventEmitter<void>();

  onFlipRequest(): void {
    this.flipRequest.emit();
  }
}
