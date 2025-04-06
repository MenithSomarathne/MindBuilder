import { Component } from '@angular/core';

@Component({
  selector: 'app-alphabet-game',
  templateUrl: './alphabet-game.component.html',
  styleUrls: ['./alphabet-game.component.css'],
  standalone: false
})
export class AlphabetGameComponent {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  currentLetter: string = '';
  message: string = 'Click a letter to start!';
  showUppercase: boolean = true;
  score: number = 0;

  constructor() {
    this.pickRandomLetter();
  }

  pickRandomLetter(): void {
    this.currentLetter = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    this.message = `Can you find ${this.currentLetter}?`;
  }

  onLetterClick(letter: string): void {
    if (letter === this.currentLetter) {
      this.message = `Correct! It's ${letter}!`;
      this.score += 10;
      setTimeout(() => {
        this.pickRandomLetter();
      }, 1000);
    } else {
      this.message = `Try again! Looking for ${this.currentLetter}`;
      this.score = Math.max(0, this.score - 2);
    }
  }

  toggleCase(): void {
    this.showUppercase = !this.showUppercase;
  }
}
