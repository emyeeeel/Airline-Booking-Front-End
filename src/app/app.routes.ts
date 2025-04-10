import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { BookingProgressComponent } from './component/booking-progress/booking-progress.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeFooterComponent } from './component/home-footer/home-footer.component';
import { DepartingListComponent } from './component/departing-list/departing-list.component';
import { FlightFooterComponent } from './component/flight-footer/flight-footer.component';
import { SearchFlightPopupComponent } from './component/search-flight-popup/search-flight-popup.component';
import { SnsStoriesComponent } from './component/sns-stories/sns-stories.component';
import { CheapFlightsComponent } from './component/cheap-flights/cheap-flights.component';
import { FlightDetailsComponent } from './component/flight-details/flight-details.component';
import { GuestDetailsComponent } from './pages/guest-details/guest-details.component';
import { GuestInfoComponent } from './component/guest-info/guest-info.component';
import { LoaderComponent } from './component/loader/loader.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'signup',
        component: SignupPageComponent
    },
    {
        path: 'flights',
        component: FlightsPageComponent
    },
    {
        path: 'booking',
        component: BookingSummaryPageComponent
    },
    {
        path: 'search-flight',
        component: SearchFlightPopupComponent
    },
    {
        path: 'guest-details',
        component: GuestDetailsComponent
    },
    {
        path: 'test',
        component: GuestInfoComponent
    },
    {
        path: 'loader',
        component: LoaderComponent
    },
];
