import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { HeaderComponent } from '../../component/header/header.component';
import { BookingProgressComponent } from '../../component/booking-progress/booking-progress.component';
import { FlightDetailsComponent } from '../../component/flight-details/flight-details.component';
import { SearchFlightButtonComponent } from '../../component/search-flight-button/search-flight-button.component';
import { FlightFooterComponent } from '../../component/flight-footer/flight-footer.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { Flight } from '../../models/flight.model';
import { City } from '../../models/city.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { isValid } from 'date-fns';
import { GuestInfoComponent } from "../../component/guest-info/guest-info.component";
import { ContactInfoComponent } from "../../component/contact-info/contact-info.component";
import { Passenger } from '../../models/passenger.model';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-guest-details-page',
  imports: [CommonModule, HeaderComponent, FooterComponent, BookingProgressComponent, FlightDetailsComponent, SearchFlightButtonComponent, LoaderComponent, GuestInfoComponent, ContactInfoComponent],
  templateUrl: './guest-details-page.component.html',
  styleUrl: './guest-details-page.component.scss'
})
export class GuestDetailsPageComponent implements OnInit {
  searchButtonText = "Continue";
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
  currentStepIndex = 1;
  flightType = 'Round-trip'; 
  isButtonEnabled = true;

  adults = 0;
  children = 0;
  infants = 0;
  totalPassengers = 0;

  private apiBase = 'http://127.0.0.1:8000/api/';

  passengers: Passenger[] = [];
  selectedPassenger?: Passenger;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private passengerService: PassengerService
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
    this.passengerService.currentPassengers.subscribe(p => {
      this.passengers = p;
    });
    console.log(this.route.snapshot.queryParams);
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
        this.flightType = params['flightType'] || 'Round-trip';
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
        this.adults = Number(params['adults']) || 0;
        this.children = Number(params['children']) || 0;
        this.infants = Number(params['infants']) || 0;
        this.totalPassengers = this.adults + this.children + this.infants;
        this.flights = flights;
        this.departingFlights = this.applyFilters(params['departure'], params['arrival']);
        this.returningFlights = this.applyFilters(params['arrival'], params['departure']);
        this.passengers; //not showing list
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
    const requiredParams = ['departure', 'arrival', 'departDate'];
    const flightType = params['flightType'] || 'Round-trip';
  
    if (flightType === 'Round-trip') {
      requiredParams.push('returnDate');
    }
  
    if (!requiredParams.every(p => params[p])) {
      return false;
    }
  
    // Passenger validation
    const adults = Number(params['adults']) || 0;
    const children = Number(params['children']) || 0;
    const infants = Number(params['infants']) || 0;
    const total = adults + children + infants;
  
    if (
      adults < 0 || 
      children < 0 || 
      infants < 0 ||
      total < 1
    ) {
      return false;
    }
  
    // Date validation
    const departDate = new Date(params['departDate']);
    if (!isValid(departDate)) return false;
  
    if (flightType === 'Round-trip') {
      const returnDate = new Date(params['returnDate']);
      if (!isValid(returnDate)) return false;
    }
  
    return true;
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

  navigateToAddOns(event?: Event) {
    event?.preventDefault();
    if (!this.isButtonEnabled) return;

    const currentParams = { ...this.route.snapshot.queryParams };

    if (this.selectedDepartingFlight) {
      currentParams['departFlightNumber'] = this.selectedDepartingFlight.flight_number;
      currentParams['departPrice'] = this.selectedDepartingFlight.price;
    }

    if (this.flightType === 'Round-trip' && this.selectedReturningFlight) {
      currentParams['returnFlightNumber'] = this.selectedReturningFlight.flight_number;
      currentParams['returnPrice'] = this.selectedReturningFlight.price;
    }

    this.router.navigate(['/booking'], {
      queryParams: currentParams
    });
  }
}
