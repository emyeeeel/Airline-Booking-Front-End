import { Component, Input } from '@angular/core';
import { SearchFlightButtonComponent } from '../search-flight-button/search-flight-button.component';

@Component({
  selector: 'app-cheap-flights',
  imports: [SearchFlightButtonComponent],
  templateUrl: './cheap-flights.component.html',
  styleUrl: './cheap-flights.component.scss'
})
export class CheapFlightsComponent {
  @Input() seeMoreText = 'Search flights';
}
