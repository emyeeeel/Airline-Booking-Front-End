import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {LocationPopupComponent} from '../location-popup/location-popup.component';

@Component({
  selector: 'app-main-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    LocationPopupComponent
  ],
  templateUrl: './main-search.component.html',
  styleUrl: './main-search.component.scss'
})
export class MainSearchComponent {
  selectedFrom: string | null = null;
  selectedTo: string | null = null;
  showFromPopup = false;
  showToPopup = false;

  get displayFromValue(): string {
    return this.selectedFrom || 'Select Origin';
  }

  get displayToValue(): string {
    return this.selectedTo || 'Select Destination';
  }

  handleFromClick(): void {
    this.showFromPopup = true;
    this.showToPopup = false;
  }

  handleToClick(): void {
    this.showToPopup = true;
    this.showFromPopup = false;
  }

  handleLocationSelected(location: string, type: 'from' | 'to'): void {
    if (type === 'from') {
      this.selectedFrom = location;
      this.showFromPopup = false;
    } else {
      this.selectedTo = location;
      this.showToPopup = false;
    }
  }
}