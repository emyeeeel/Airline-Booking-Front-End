import { Flight } from "./flight.model";

export interface Passenger {
    id: string;
    type: 'Adult' | 'Child';
    isActive: boolean;
    name: {
      title: string;
      firstName: string;
      lastName: string;
      hasNoFirstName?: boolean;
    };
    dateOfBirth: {
      day: string;
      month: string;
      year: string;
    };
    nationality: string;
    goRewardsId?: string;
    selectedDepartingFlight?: Flight;
    selectedReturningFlight?: Flight;
    hasDeclaration?: boolean;
    isPWD?: boolean;
  }