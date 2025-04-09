import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { DecimalPipe } from '@angular/common';
import { BookingProgressComponent } from "../../component/booking-progress/booking-progress.component";

@Component({
  selector: 'app-booking-summary-page',
  imports: [HeaderComponent, DecimalPipe, BookingProgressComponent],
  templateUrl: './booking-summary-page.component.html',
  styleUrl: './booking-summary-page.component.scss'
})
export class BookingSummaryPageComponent {
  travel_insurance: number = 1155.00
  currentStepIndex = 3;
  
}
