import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rotating-title',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './rotating-title.component.html',
  styleUrl: './rotating-title.component.scss'
})
export class RotatingTitleComponent implements OnInit, OnDestroy {
  @Input() prefixKey = 'SECTION_ESTUDIO_PREFIX';
  @Input() suffixKey = 'SECTION_ESTUDIO_SUFFIX';
  @Input() wordsKey = 'SECTION_ESTUDIO_WORDS';
  @Input() intervalMs = 1750;

  prefix = '';
  suffix = '';
  words: string[] = [];
  currentIndex = 0;
  letterStates: Record<number, Record<number, 'in' | 'out' | 'behind'>> = {};
  isShaking = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.translate.stream(this.prefixKey).subscribe((t) => { this.prefix = t || ''; this.cdr.markForCheck(); });
    this.translate.stream(this.suffixKey).subscribe((t) => { this.suffix = t || ''; this.cdr.markForCheck(); });
    this.translate.stream(this.wordsKey).subscribe((t) => {
      this.words = (t || '').split(',').map((w: string) => w.trim()).filter(Boolean);
      this.cdr.markForCheck();
    });
    this.intervalId = setInterval(() => this.cycleWord(), this.intervalMs);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  getLetters(word: string): string[] {
    return word ? word.split('') : [];
  }

  getLetterState(wordIndex: number, letterIndex: number): string {
    return this.letterStates[wordIndex]?.[letterIndex] || '';
  }

  cycleWord(): void {
    if (this.words.length < 2) return;
    this.isShaking = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.isShaking = false;
      this.cdr.markForCheck();
    }, 450);
    const prevIndex = this.currentIndex;
    const nextIndex = (this.currentIndex + 1) % this.words.length;
    const prevWord = this.words[prevIndex];
    const nextWord = this.words[nextIndex];

    // Animate letters out (current word)
    const prevLetters = this.getLetters(prevWord);
    if (!this.letterStates[prevIndex]) this.letterStates[prevIndex] = {};
    for (let i = 0; i < prevLetters.length; i++) {
      setTimeout(() => {
        this.letterStates[prevIndex][i] = 'out';
        this.cdr.markForCheck();
      }, i * 80);
    }

    // Animate letters in (next word)
    const nextLetters = this.getLetters(nextWord);
    if (!this.letterStates[nextIndex]) this.letterStates[nextIndex] = {};
    for (let i = 0; i < nextLetters.length; i++) {
      this.letterStates[nextIndex][i] = 'behind';
    }
    this.currentIndex = nextIndex;
    this.cdr.markForCheck();

    for (let i = 0; i < nextLetters.length; i++) {
      setTimeout(() => {
        this.letterStates[nextIndex][i] = 'in';
        this.cdr.markForCheck();
      }, 340 + i * 80);
    }

    // Reset prev word letters after animation
    setTimeout(() => {
      if (this.letterStates[prevIndex]) {
        for (let i = 0; i < prevLetters.length; i++) {
          delete this.letterStates[prevIndex][i];
        }
      }
      for (let i = 0; i < nextLetters.length; i++) {
        if (this.letterStates[nextIndex]?.[i] === 'in') {
          delete this.letterStates[nextIndex][i];
        }
      }
      this.cdr.markForCheck();
    }, 340 + nextLetters.length * 80 + 400);
  }
}
