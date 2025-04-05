import { Component } from '@angular/core';
import { SearchFlightButtonComponent } from '../search-flight-button/search-flight-button.component';

@Component({
  selector: 'app-search-flight-popup',
  imports: [SearchFlightButtonComponent],
  templateUrl: './search-flight-popup.component.html',
  styleUrl: './search-flight-popup.component.scss'
})
export class SearchFlightPopupComponent {

}
