import { Component, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LocationPopupComponent } from '../location-popup/location-popup.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlightSearchService } from '../../services/flight-search.service';

@Component({
  selector: 'app-destination-picker',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    LocationPopupComponent ],
  templateUrl: './destination-picker.component.html',
  styleUrl: './destination-picker.component.scss'
})
export class DestinationPickerComponent {
  constructor(private flightSearchService: FlightSearchService) {}
  selectedFrom: string | null = null;
  selectedTo: string | null = null;
  showFromPopup = false;
  showToPopup = false;

  // Add this method for swapping locations
  swapLocations(): void {
    // Swap the values
    const temp = this.selectedFrom;
    this.selectedFrom = this.selectedTo;
    this.selectedTo = temp;
    
    // Close any open popups after swap
    this.showFromPopup = false;
    this.showToPopup = false;
  }

  get displayFromValue(): string {
    return this.selectedFrom || 'Select Origin';
  }

  get displayToValue(): string {
    return this.selectedTo || 'Select Destination';
  }

  handleFromClick(): void {
    this.showFromPopup = !this.showFromPopup;
    this.showToPopup = false;
  }
  
  handleToClick(): void {
    this.showToPopup = !this.showToPopup;
    this.showFromPopup = false;
  }

  handleLocationSelected(location: string, type: 'from' | 'to'): void {
    if (type === 'from') {
      this.selectedFrom = location;
      this.flightSearchService.setFromIata(location);
    } else {
      this.selectedTo = location;
      this.flightSearchService.setToIata(location);
    }
    
    // Close popups
    type === 'from' 
      ? this.showFromPopup = false 
      : this.showToPopup = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideComponent = target.closest('.location-picker-element');
    
    if (!clickedInsideComponent) {
      this.showFromPopup = false;
      this.showToPopup = false;
    }
  }
}