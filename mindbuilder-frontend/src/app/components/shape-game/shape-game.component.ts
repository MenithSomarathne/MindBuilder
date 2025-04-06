import { Component } from '@angular/core';

@Component({
  selector: 'app-shape-game',
  templateUrl: './shape-game.component.html',
  styleUrls: ['./shape-game.component.css'],
  standalone: false
})
export class ShapeGameComponent {
  shapes = [
    { name: 'Circle', sides: 'Round' },
    { name: 'Square', sides: '4 equal sides' },
    { name: 'Triangle', sides: '3 sides' },
    { name: 'Rectangle', sides: '4 sides (2 long, 2 short)' },
    { name: 'Star', sides: '5 points' },
    { name: 'Heart', sides: 'No straight sides' }
  ];

  currentShape = this.shapes[0];
  message = 'Find the shape with round sides!';
  score = 0;

  constructor() {
    this.pickRandomShape();
  }

  pickRandomShape(): void {
    this.currentShape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
    this.message = `Find the shape with ${this.currentShape.sides}!`;
  }

  onShapeClick(shape: any): void {
    if (shape.name === this.currentShape.name) {
      this.message = `Great job! ${shape.name} has ${shape.sides}!`;
      this.score += 5;
      setTimeout(() => {
        this.pickRandomShape();
      }, 1500);
    } else {
      this.message = `Try again! Looking for the shape with ${this.currentShape.sides}`;
    }
  }
}
