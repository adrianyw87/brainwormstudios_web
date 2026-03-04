import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

/**
 * Servicio centralizado para SEO.
 * Actualiza título y meta tags dinámicamente.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  setMetaDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setMetaKeywords(keywords: string[]): void {
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
  }

  setOpenGraph(tag: string, content: string): void {
    this.meta.updateTag({ property: `og:${tag}`, content });
  }
}
