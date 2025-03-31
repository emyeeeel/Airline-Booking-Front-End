import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-location-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-popup.component.html',
  styleUrl: './location-popup.component.scss'
})
export class LocationPopupComponent {
  @Output() locationSelected = new EventEmitter<string>();
  countries: Country[] = [];
  isLoading = true;
  expandedCountries = new Set<number>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Country[]>('http://127.0.0.1:8000/api/countries/').subscribe({
      next: (data) => {
        this.countries = data
          .map(country => ({
            ...country,
            cities: country.cities.sort((a, b) => a.name.localeCompare(b.name))
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        this.isLoading = false;
      }
    });
  }

  toggleCountry(countryId: number): void {
    const newSet = new Set(this.expandedCountries);
    newSet.has(countryId) ? newSet.delete(countryId) : newSet.add(countryId);
    this.expandedCountries = newSet;
  }

  selectCity(cityName: string): void {
    this.locationSelected.emit(cityName);
  }
}