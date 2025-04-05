import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Flight } from '../../models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../component/header/header.component";
import { City } from '../../models/city.model';
import { combineLatest, map } from 'rxjs';
import { isValid } from 'date-fns';

@Component({
  selector: 'app-flights-page',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './flights-page.component.html',
  styleUrl: './flights-page.component.scss'
})
export class FlightsPageComponent implements OnInit {
  flights: Flight[] = [];
  departingFlights: Flight[] = [];
  returningFlights: Flight[] = [];
  cities = new Map<number, City>();
  departureCityName = 'Loading...';
  arrivalCityName = 'Loading...';
  loading = true;
  error: string | null = null;
  selectedDepartDate?: Date;
  selectedReturnDate?: Date;
  selectedDepartingFlight: Flight | null = null;
  selectedReturningFlight: Flight | null = null;

  private apiBase = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onDepartingFlightSelect(flight: Flight): void {
    this.selectedDepartingFlight = 
      this.selectedDepartingFlight === flight ? null : flight;
  }
  
  onReturningFlightSelect(flight: Flight): void {
    this.selectedReturningFlight = 
      this.selectedReturningFlight === flight ? null : flight;
  }

  ngOnInit(): void {
    this.loadData();
  }

  scrollTo(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }

  private loadData(): void {
    const cities$ = this.http.get<City[]>(`${this.apiBase}cities/`);
    const flights$ = this.http.get<Flight[]>(`${this.apiBase}flights/`);
    const params$ = this.route.queryParams;

    combineLatest([cities$, flights$, params$]).pipe(
      map(([cities, flights, params]) => {
        if (!this.validateParameters(params)) {
          throw new Error('Invalid parameters');
        }

        this.cities.clear();
        cities.forEach(city => this.cities.set(city.id, city));
        
        if (params['departDate']) {
          this.selectedDepartDate = new Date(params['departDate']);
        }
        if (params['returnDate']) {
          this.selectedReturnDate = new Date(params['returnDate']);
        }
        
        return { flights, params };
      })
    ).subscribe({
      next: ({ flights, params }) => {
        this.flights = flights;
        this.departingFlights = this.applyFilters(params['departure'], params['arrival']);
        this.returningFlights = this.applyFilters(params['arrival'], params['departure']);
        this.setCityNames();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load flight data. Please try again later.';
        this.loading = false;
        console.error('API Error:', err);
        this.router.navigate(['/']);
      }
    });
  }

  private validateParameters(params: any): boolean {
    const requiredParams = [
      'departure', 
      'arrival', 
      'departDate', 
      'returnDate'
    ];

    // Check all parameters exist
    if (!requiredParams.every(p => params[p])) {
      return false;
    }

    // Validate date formats
    const departDate = new Date(params['departDate']);
    const returnDate = new Date(params['returnDate']);
    
    return isValid(departDate) && isValid(returnDate);
  }

  private applyFilters(departureIata?: string, arrivalIata?: string): Flight[] {
    return this.flights.filter(flight => {
      const matchesDeparture = !departureIata || 
        flight.departure_airport.IATA_code === departureIata;
      const matchesArrival = !arrivalIata || 
        flight.arrival_airport.IATA_code === arrivalIata;
      return matchesDeparture && matchesArrival;
    });
  }

  private setCityNames(): void {
    if (this.departingFlights.length > 0) {
      const firstFlight = this.departingFlights[0];
      const depCity = this.cities.get(firstFlight.departure_airport.city);
      this.departureCityName = depCity?.name || 'Unknown City';
      const arrCity = this.cities.get(firstFlight.arrival_airport.city);
      this.arrivalCityName = arrCity?.name || 'Unknown City';
    }
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