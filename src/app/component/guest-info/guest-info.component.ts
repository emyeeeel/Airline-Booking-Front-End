// guest-info.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Passenger {
  id: string;
  type: 'Adult' | 'Child';
  isActive: boolean;
}

@Component({
  selector: 'app-guest-info',
  imports: [CommonModule], 
  templateUrl: './guest-info.component.html',
  styleUrls: ['./guest-info.component.scss']
})
export class GuestInfoComponent implements OnInit {
  passengers: Passenger[] = [];
  passengerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // Add other form controls
    });
  }

  ngOnInit() {
    // Initialize passengers - you can receive this from input or service
    this.passengers = [
      { id: 'adult-0', type: 'Adult', isActive: true },
      { id: 'adult-1', type: 'Adult', isActive: false },
      { id: 'child-2', type: 'Child', isActive: false }
    ];
  }

  setActivePassenger(index: number) {
    this.passengers.forEach((p, i) => p.isActive = i === index);
  }

  getPassengerNumber(type: string, index: number): number {
    return this.passengers.filter(p => p.type === type).findIndex(p => p === this.passengers[index]) + 1;
  }
}