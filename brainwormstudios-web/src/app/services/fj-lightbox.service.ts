import { Injectable } from '@angular/core';

export interface LightboxState {
  open: boolean;
  src: string | null;
}

@Injectable({ providedIn: 'root' })
export class FjLightboxService {
  private state = { open: false, src: null as string | null };
  private listeners: ((s: LightboxState) => void)[] = [];

  open(src: string): void {
    this.state = { open: true, src };
    this.emit();
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.state = { open: false, src: null };
    this.emit();
    document.body.style.overflow = '';
  }

  subscribe(fn: (s: LightboxState) => void): () => void {
    this.listeners.push(fn);
    fn(this.state);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn(this.state));
  }
}
