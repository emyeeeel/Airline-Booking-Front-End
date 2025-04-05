import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { SearchFlightPopupComponent } from './component/search-flight-popup/search-flight-popup.component';

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
        path: 'search-flights',
        component: SearchFlightPopupComponent
    },
];
