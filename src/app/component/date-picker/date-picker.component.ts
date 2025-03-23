import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit  {
  selectedDepartDate: Date | null = null;
  selectedReturnDate: Date | null = null;
  minDate!: Date;

  constructor(private http: HttpClient) {}

  users: User[] = [];
  isLoading = true;

  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    this.minDate = today;
    this.selectedDepartDate = new Date();

    this.http.get<User[]>('http://127.0.0.1:8000/api/getAllUsers/').subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    });
  }

  onReturnDateSelected(event: any): void {
    this.selectedReturnDate = event.value;
  }
}
