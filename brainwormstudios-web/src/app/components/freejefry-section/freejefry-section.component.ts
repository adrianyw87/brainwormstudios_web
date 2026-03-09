import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BwsButtonComponent } from '../bws-button/bws-button.component';
import { FjCardDeckComponent, FjCardItem } from '../fj-card-deck/fj-card-deck.component';
import { FjRevealDirective } from '../../directives/fj-reveal.directive';
import { FjAnimatedTitleComponent } from '../fj-animated-title/fj-animated-title.component';

const IMG = 'img/FreeJefryImagenes/';

@Component({
  selector: 'app-freejefry-section',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    BwsButtonComponent,
    FjCardDeckComponent,
    FjRevealDirective,
    FjAnimatedTitleComponent,
  ],
  templateUrl: './freejefry-section.component.html',
  styleUrl: './freejefry-section.component.scss'
})
export class FreeJefrySectionComponent {
  /** ID del video de YouTube para el trailer */
  trailerVideoId = '3l8uKeziu1g';

  constructor(private sanitizer: DomSanitizer) { }

  get trailerUrl(): SafeResourceUrl | null {
    if (!this.trailerVideoId) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.trailerVideoId}?start=12`
    );
  }

  /** Carrusel: quiénes han creado esta locura */
  quienesDeck: FjCardItem[] = [
    { imageSrc: IMG + 'JJ02.jpg', titleKey: '' },
    { imageSrc: IMG + 'Disfraces03.jpg', titleKey: '' },
    { imageSrc: IMG + 'Leveldesing.jpg', titleKey: '' },
    { imageSrc: IMG + 'Escenarios conept.jpg', titleKey: '' },
    { imageSrc: IMG + 'evolucion01.jpg', titleKey: '' },
    { imageSrc: IMG + 'Mundo01.jpg', titleKey: '' },
    { imageSrc: IMG + 'Bocetos01.jpg', titleKey: '' },
    { imageSrc: IMG + 'Bocetos02.jpg', titleKey: '' },
    { imageSrc: IMG + 'Bocetos03.jpg', titleKey: '' }
  ];

  /** Carrusel: mecánicas (disfraces, comidas, objetos, poderes) */
  mecanicasDeck: FjCardItem[] = [
    { imageSrc: IMG + 'Disfraces02.jpg', titleKey: '' },
    { imageSrc: IMG + 'Comidas.jpg', titleKey: '' },
    { imageSrc: IMG + 'Objetos.jpg', titleKey: '' },
    { imageSrc: IMG + 'Poderes01.jpg', titleKey: '' }
  ];

  /** Carrusel: Rey Yobtar */
  reyDeck: FjCardItem[] = [
    { imageSrc: IMG + 'Rey01.jpg', titleKey: '' },
    { imageSrc: IMG + 'Rey03.jpg', titleKey: '' }
  ];

  /** Carrusel: enemigos */
  enemigosDeck: FjCardItem[] = [
    { imageSrc: IMG + 'Animales01.jpg', titleKey: '' },
    { imageSrc: IMG + 'CArtelesRatas01.jpg', titleKey: '' },
    { imageSrc: IMG + 'Animales03.jpg', titleKey: '' }
  ];

  /** Carrusel: amigos (presos) */
  amigosDeck: FjCardItem[] = [
    { imageSrc: IMG + 'Rey04.jpg', titleKey: '' },
    { imageSrc: IMG + 'Rey05.jpg', titleKey: '' },
    { imageSrc: IMG + 'Rey06.jpg', titleKey: '' },
    { imageSrc: IMG + 'Gnomos01.jpg', titleKey: '' }
  ];
}
