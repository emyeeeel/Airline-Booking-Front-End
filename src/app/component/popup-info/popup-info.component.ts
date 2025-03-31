import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popup-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-info.component.html',
  styleUrl: './popup-info.component.scss'
})
export class PopupInfoComponent {
  @Input() currentMenu: string = '';

  constructor(private router: Router){}

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}