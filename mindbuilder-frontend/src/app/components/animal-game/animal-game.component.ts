import { Component } from '@angular/core';

@Component({
  selector: 'app-animal-game',
  templateUrl: './animal-game.component.html',
  styleUrls: ['./animal-game.component.css'],
  standalone: false
})
export class AnimalGameComponent {
  animals = [
    { name: 'Cat', sound: 'Meow', emoji: '🐱' },
    { name: 'Dog', sound: 'Woof', emoji: '🐶' },
    { name: 'Cow', sound: 'Moo', emoji: '🐮' },
    { name: 'Lion', sound: 'Roar', emoji: '🦁' },
    { name: 'Duck', sound: 'Quack', emoji: '🦆' },
    { name: 'Sheep', sound: 'Baa', emoji: '🐑' }
  ];

  currentAnimal = this.animals[0];
  message = 'Which animal says Meow?';
  score = 0;

  constructor() {
    this.pickRandomAnimal();
  }

  pickRandomAnimal(): void {
    this.currentAnimal = this.animals[Math.floor(Math.random() * this.animals.length)];
    this.message = `Which animal says ${this.currentAnimal.sound}?`;
  }

  onAnimalClick(animal: any): void {
    if (animal.name === this.currentAnimal.name) {
      this.message = `Correct! ${animal.emoji} ${animal.name} says ${animal.sound}!`;
      this.score += 5;
      setTimeout(() => {
        this.pickRandomAnimal();
      }, 1500);
    } else {
      this.message = `Try again! Looking for the animal that says ${this.currentAnimal.sound}`;
    }
  }

  playSound(): void {
    // In a real app, you would play actual animal sounds here
    alert(`The ${this.currentAnimal.name} says ${this.currentAnimal.sound}!`);
  }
}
