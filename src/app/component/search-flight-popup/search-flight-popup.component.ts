import { Component, Input, ViewChild } from '@angular/core';
import { SearchFlightButtonComponent } from '../search-flight-button/search-flight-button.component';
import { FlightSearchService } from '../../services/flight-search.service';
import { Router } from '@angular/router';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DestinationPickerComponent } from '../destination-picker/destination-picker.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-flight-popup',
  imports: [SearchFlightButtonComponent, DatePickerComponent, DestinationPickerComponent, FormsModule],
  templateUrl: './search-flight-popup.component.html',
  styleUrl: './search-flight-popup.component.scss'
})
export class SearchFlightPopupComponent {
  @Input() buttonText = 'Search flights';
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  selectedFlightType = 'Round-trip';

  constructor(
    private flightSearchService: FlightSearchService,
    private router: Router
  ) {}

  onSearchClick() {
    const fromIata = this.flightSearchService.fromIataSubject.value;
    const toIata = this.flightSearchService.toIataSubject.value;
  
    // Always require departure and arrival locations
    if (!fromIata || !toIata) {
      alert('Please select both departure and arrival locations');
      return;
    }
  
    // Always require departure date
    if (!this.datePicker.selectedDepartDate) {
      alert('Please select a departure date');
      return;
    }
  
   
    if (this.selectedFlightType === 'Round-trip' && !this.datePicker.selectedReturnDate) {
      alert('Please select a return date for round-trip flights');
      return;
    }
  
    // Proceed with navigation
    const queryParams: any = {
      departure: fromIata,
      arrival: toIata,
      departDate: this.datePicker.selectedDepartDate.toISOString(),
      flightType: this.selectedFlightType
    };
  
    if (this.selectedFlightType === 'Round-trip' && this.datePicker.selectedReturnDate) {
      queryParams.returnDate = this.datePicker.selectedReturnDate.toISOString();
    }
  
    this.router.navigate(['/flights'], { queryParams });
  }
}
