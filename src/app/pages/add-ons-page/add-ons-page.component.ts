import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { BookingProgressComponent } from "../../component/booking-progress/booking-progress.component";

@Component({
  selector: 'app-add-ons-page',
  imports: [HeaderComponent, BookingProgressComponent],
  templateUrl: './add-ons-page.component.html',
  styleUrl: './add-ons-page.component.scss'
})
export class AddOnsPageComponent {
currentStepIndex = 2;

}
