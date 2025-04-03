// flight-search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  public fromIataSubject = new BehaviorSubject<string | null>(null);
  fromIata$ = this.fromIataSubject.asObservable();

  public toIataSubject = new BehaviorSubject<string | null>(null);
  toIata$ = this.toIataSubject.asObservable();

  setFromIata(locationString: string): void {
    const iata = this.extractIataCode(locationString);
    this.fromIataSubject.next(iata);
  }

  setToIata(locationString: string): void {
    const iata = this.extractIataCode(locationString);
    this.toIataSubject.next(iata);
  }

  public extractIataCode(locationString: string): string | null {
    const iataMatch = locationString.match(/\(([A-Z]{3})\)/);
    return iataMatch ? iataMatch[1] : null;
  }
}