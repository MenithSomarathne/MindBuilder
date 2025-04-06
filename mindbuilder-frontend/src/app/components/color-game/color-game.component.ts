import { Component } from '@angular/core';

@Component({
  selector: 'app-color-game',
  templateUrl: './color-game.component.html',
  styleUrls: ['./color-game.component.css'],
  standalone: false
})
export class ColorGameComponent {
  colors = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#800080' },
    { name: 'Orange', value: '#FFA500' }
  ];

  currentColor = this.colors[0];
  message = 'Find the color Red!';
  score = 0;

  constructor() {
    this.pickRandomColor();
  }

  pickRandomColor(): void {
    this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.message = `Find ${this.currentColor.name}!`;
  }

  onColorClick(color: any): void {
    if (color.name === this.currentColor.name) {
      this.message = `Yes! ${color.name} is correct!`;
      this.score += 5;
      setTimeout(() => {
        this.pickRandomColor();
      }, 1000);
    } else {
      this.message = `Try again! Looking for ${this.currentColor.name}`;
    }
  }
}
