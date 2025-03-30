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

  get displayFromValue(): string {
    return this.selectedFrom || 'Select Origin';
  }

  get displayToValue(): string {
    return this.selectedTo || 'Select Destination';
  }

  handleFromClick(): void {
    // TODO: Implement country/city selection logic here
    console.log('Open country selection dialog');
  }
}