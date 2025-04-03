import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../component/header/header.component';
import { DatePickerComponent } from '../../component//date-picker/date-picker.component';
import { SearchFlightButtonComponent } from '../../component//search-flight-button/search-flight-button.component';
import { DestinationPickerComponent } from '../../component/destination-picker/destination-picker.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FlightSearchService } from '../../services/flight-search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  imports: [RouterOutlet, HeaderComponent, DestinationPickerComponent, DatePickerComponent, SearchFlightButtonComponent,  CommonModule], //DestinationPickerComponent
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, OnDestroy {

  user: any;
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flightSearchService: FlightSearchService
  ) {}

  ngOnInit() {
    this.startCarousel();
    this.preloadImages();
    
    // Subscribe to authentication changes
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.clearCarousel();
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Background Carousel Data
  backgrounds = [
    { 
      image: 'https://cdn.media.amplience.net/i/cebupacificair/SIN-Singapore-MarinaBay1-5472x3648?fmt=auto&maxW=1920&maxH=1920&w=1920&qlt=60&fmt.options=interlaced',
      location: 'SINGAPORE'
    },
    { 
      image: 'https://cdn.media.amplience.net/i/cebupacificair/Islas%20de%20Gigates%20Iloilo_LJ%20(1)?fmt=auto&maxW=1920&maxH=1920&w=1920&qlt=60&fmt.options=interlaced',
      location: 'ILOILO'
    },
    { 
      image: 'https://cdn.media.amplience.net/i/cebupacificair/DVO-Davao-Philippines-Mountains-6000x3375?fmt=auto&maxW=1920&maxH=1920&w=1920&qlt=60&fmt.options=interlaced',
      location: 'DAVAO'
    }
  ];


  currentBackgroundIndex = 0;
  private intervalId: any;

  get currentBackground() {
    return this.backgrounds[this.currentBackgroundIndex];
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.changeBackground(1);
    }, 5000);
  }

  clearCarousel() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  changeBackground(direction: number) {
    this.currentBackgroundIndex += direction;
    
    if (this.currentBackgroundIndex >= this.backgrounds.length) {
      this.currentBackgroundIndex = 0;
    } else if (this.currentBackgroundIndex < 0) {
      this.currentBackgroundIndex = this.backgrounds.length - 1;
    }
  }

  private preloadImages() {
    this.backgrounds.forEach(bg => {
      new Image().src = bg.image;
    });
  }

  onSearchClick() {
    const fromIata = this.flightSearchService.fromIataSubject.value;
    const toIata = this.flightSearchService.toIataSubject.value;

    if (!fromIata || !toIata) {
      alert('Please select both departure and arrival locations');
      return;
    }

    this.router.navigate(['/flights'], {
      queryParams: {
        departure: fromIata,
        arrival: toIata
      }
    });
  }
}
