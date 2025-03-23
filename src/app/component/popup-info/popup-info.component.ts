import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-info.component.html',
  styleUrl: './popup-info.component.scss'
})
export class PopupInfoComponent {
  @Input() currentMenu: string = '';
}