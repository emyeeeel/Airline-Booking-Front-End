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
        component: FlightBundlesComponent
    },
    {
        path: 'loader',
        component: LoaderComponent
    },
];
