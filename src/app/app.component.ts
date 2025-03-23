import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { MainSearchComponent } from './component/main-search/main-search.component';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { SearchFlightButtonComponent } from './component/search-flight-button/search-flight-button.component';
import { DestinationPickerComponent } from './component/destination-picker/destination-picker.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MainSearchComponent, DatePickerComponent, SearchFlightButtonComponent, DestinationPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    this.startCarousel();
    this.preloadImages();
  }

  ngOnDestroy() {
    this.clearCarousel();
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
}