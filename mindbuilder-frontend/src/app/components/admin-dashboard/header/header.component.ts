import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,

})
export class HeaderComponent {
  @Output() toggleEvent = new EventEmitter<void>();

  toggle() {
    this.toggleEvent.emit();
  }
}
