import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { SearchFlightPopupComponent } from './component/search-flight-popup/search-flight-popup.component';
import { GuestInfoComponent } from './component/guest-info/guest-info.component';
import { LoaderComponent } from './component/loader/loader.component';
import { GuestDetailsPageComponent } from './pages/guest-details-page/guest-details-page.component';
import { AddOnsPageComponent } from './pages/add-ons-page/add-ons-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { FlightBundlesComponent } from './component/flight-bundles/flight-bundles.component';
import { FlightCardComponent } from './component/flight-card/flight-card.component';
import { FlightDatesComponent } from './component/flight-dates/flight-dates.component';
import { CheapFlightsComponent } from './component/cheap-flights/cheap-flights.component';
import { LatestStoriesComponent } from './component/latest-stories/latest-stories.component';
import { AdvertisementComponent } from './component/advertisement/advertisement.component';
import { TestComponent } from './component/test/test.component';


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
        component: GuestDetailsPageComponent
    },
    {
        path: 'add-ons',
        component: AddOnsPageComponent
    },
    {
        path: 'confirmation',
        component: ConfirmationPageComponent
    },
    {
        path: 'test',
        component: AddOnsPageComponent
    },
    {
        path: 'loader',
        component: LoaderComponent
    },
];
