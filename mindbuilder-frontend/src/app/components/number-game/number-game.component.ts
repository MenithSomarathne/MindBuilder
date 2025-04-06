import { Component } from '@angular/core';

@Component({
  selector: 'app-number-game',
  templateUrl: './number-game.component.html',
  styleUrls: ['./number-game.component.css'],
  standalone: false
})
export class NumberGameComponent {
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentNumber: number = 1;
  message: string = 'Find number 1!';
  score: number = 0;
  showDots: boolean = true;

  constructor() {
    this.pickRandomNumber();
  }

  pickRandomNumber(): void {
    this.currentNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];
    this.message = `Can you find ${this.showDots ? '•'.repeat(this.currentNumber) : this.currentNumber}?`;
  }

  onNumberClick(number: number): void {
    if (number === this.currentNumber) {
      this.message = `Great! ${number} is correct!`;
      this.score += 5;
      setTimeout(() => {
        this.pickRandomNumber();
      }, 1000);
    } else {
      this.message = `Oops! Looking for ${this.showDots ? '•'.repeat(this.currentNumber) : this.currentNumber}`;
    }
  }

  toggleDisplay(): void {
    this.showDots = !this.showDots;
    this.pickRandomNumber();
  }
}
