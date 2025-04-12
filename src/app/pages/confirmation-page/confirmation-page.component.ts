import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BookingProgressComponent } from '../../component/booking-progress/booking-progress.component';
import { Flight } from '../../models/flight.model';
import { City } from '../../models/city.model';
import { Passenger } from '../../models/passenger.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from '../../services/passenger.service';
import { combineLatest, map } from 'rxjs';
import { isValid } from 'date-fns';

@Component({
  selector: 'app-confirmation-page',
  imports: [HeaderComponent, BookingProgressComponent, CommonModule],
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.scss'
})
export class ConfirmationPageComponent  {
  currentStepIndex = 4;
  
 
}
