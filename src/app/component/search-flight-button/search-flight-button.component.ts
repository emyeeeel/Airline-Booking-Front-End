import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-flight-button',
  imports: [],
  templateUrl: './search-flight-button.component.html',
  styleUrl: './search-flight-button.component.scss'
})
export class SearchFlightButtonComponent {
  @Output() searchClicked = new EventEmitter<void>();

  onClick() {
    this.searchClicked.emit();
  }
}
