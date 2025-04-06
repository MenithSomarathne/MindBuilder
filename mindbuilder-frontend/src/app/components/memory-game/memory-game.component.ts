import { Component } from '@angular/core';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css'],
  standalone: false
})
export class MemoryGameComponent {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves = 0;
  matches = 0;
  gameComplete = false;
  emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  constructor() {
    this.initGame();
  }

  initGame(): void {
    this.cards = [];
    this.flippedCards = [];
    this.moves = 0;
    this.matches = 0;
    this.gameComplete = false;

    // Create pairs of cards
    const values = [...this.emojis, ...this.emojis];

    // Shuffle the cards
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * values.length);
      this.cards.push({
        id: i,
        value: values[randomIndex],
        flipped: false,
        matched: false
      });
      values.splice(randomIndex, 1);
    }
  }

  flipCard(card: Card): void {
    if (card.flipped || card.matched || this.flippedCards.length === 2) {
      return;
    }

    card.flipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkForMatch();
    }
  }

  checkForMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.value === card2.value) {
      card1.matched = true;
      card2.matched = true;
      this.flippedCards = [];
      this.matches++;

      if (this.matches === this.emojis.length) {
        this.gameComplete = true;
      }
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }
}
