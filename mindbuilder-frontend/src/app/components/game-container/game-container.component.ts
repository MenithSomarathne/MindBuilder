import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css'],
  standalone: false
})
export class GameContainerComponent {
  gameId: number = 1; // Default to alphabet game

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['gameId']) {
        this.gameId = +params['gameId']; // Convert to number
      }
    });
  }
}
