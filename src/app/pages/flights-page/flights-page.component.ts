import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Flight } from '../../models/flight.model';
import { ActivatedRoute } from '@angular/router';
import { FlightSearchService } from '../../services/flight-search.service';
import { HeaderComponent } from "../../component/header/header.component";
import { City } from '../../models/city.model';
import { combineLatest, map } from 'rxjs';


@Component({
  selector: 'app-flights-page',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './flights-page.component.html',
  styleUrl: './flights-page.component.scss'
})
export class FlightsPageComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  cities = new Map<number, City>();
  departureCityName = 'Loading...';
  arrivalCityName = 'Loading...';
  loading = true;
  error: string | null = null;

  private apiBase = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const cities$ = this.http.get<City[]>(`${this.apiBase}cities/`);
    const flights$ = this.http.get<Flight[]>(`${this.apiBase}flights/`);
    const params$ = this.route.queryParams;

    combineLatest([cities$, flights$, params$]).pipe(
      map(([cities, flights, params]) => {
        // Map cities for quick lookup
        this.cities.clear();
        cities.forEach(city => this.cities.set(city.id, city));
        
        return { flights, params };
      })
    ).subscribe({
      next: ({ flights, params }) => {
        this.flights = flights;
        this.applyFilters(params['departure'], params['arrival']);
        this.setCityNames();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load flight data. Please try again later.';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  private applyFilters(departureIata?: string, arrivalIata?: string): void {
    this.filteredFlights = this.flights.filter(flight => {
      const matchesDeparture = !departureIata || 
        flight.departure_airport.IATA_code === departureIata;
      const matchesArrival = !arrivalIata || 
        flight.arrival_airport.IATA_code === arrivalIata;
      return matchesDeparture && matchesArrival;
    });
  }

  private setCityNames(): void {
    if (this.filteredFlights.length === 0) {
      this.departureCityName = 'N/A';
      this.arrivalCityName = 'N/A';
      return;
    }

    const firstFlight = this.filteredFlights[0];
    
    // Get departure city
    const depCity = this.cities.get(firstFlight.departure_airport.city);
    this.departureCityName = depCity?.name || 'Unknown City';
    
    // Get arrival city
    const arrCity = this.cities.get(firstFlight.arrival_airport.city);
    this.arrivalCityName = arrCity?.name || 'Unknown City';
  }

  formatDuration(duration: string): string {
    if (/^\d+$/.test(duration)) {
      const totalMinutes = parseInt(duration, 10);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
    }

    if (duration.startsWith('PT')) {
      const hoursMatch = duration.match(/(\d+)H/);
      const minutesMatch = duration.match(/(\d+)M/);
      const hours = hoursMatch ? hoursMatch[1] : '0';
      const minutes = minutesMatch ? minutesMatch[1] : '00';
      return `${parseInt(hours, 10)}h ${minutes.padStart(2, '0')}m`;
    }

    const [hours, minutes] = duration.split(':');
    return `${parseInt(hours, 10)}h ${minutes.padStart(2, '0')}m`;
  }
}