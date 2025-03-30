import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-destination-picker',
  imports: [CommonModule],
  templateUrl: './destination-picker.component.html',
  styleUrl: './destination-picker.component.scss'
})
export class DestinationPickerComponent implements OnInit {

  constructor(private http: HttpClient) {}

  countries: Country[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.http.get<Country[]>('http://127.0.0.1:8000/api/countries/').subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        this.isLoading = false;
      }
    });
  }
}