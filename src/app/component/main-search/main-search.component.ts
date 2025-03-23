import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-main-search',
  standalone: true,
  imports: [    
    CommonModule],
  templateUrl: './main-search.component.html',
  styleUrl: './main-search.component.scss'
})
export class MainSearchComponent implements OnInit {

  constructor(private http: HttpClient) {}

  users: User[] = [];
  isLoading = true;

  ngOnInit(): void {

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

}