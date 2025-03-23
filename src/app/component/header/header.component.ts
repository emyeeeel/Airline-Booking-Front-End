import { Component } from '@angular/core';
import { PopupInfoComponent } from '../popup-info/popup-info.component';

@Component({
  selector: 'app-header',
  imports: [PopupInfoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isPopupVisible = false;
  currentMenu: string = '';
  private hideTimeout: any;

  showPopup(menu: string) {
    clearTimeout(this.hideTimeout);
    this.currentMenu = menu;
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.hideTimeout = setTimeout(() => {
      this.isPopupVisible = false;
    }, 300);
  }

  // Advisory Data
  advisories = [
    { text: 'Travel Reminders' },
    { text: 'Peak Travel Reminders for the Holiday Season' },
    { text: 'Cancelled Flight Due to Eruption of Mt. Kanlaon' }
  ];

  currentAdvisoryIndex = 0;

  get currentAdvisory() {
    return this.advisories[this.currentAdvisoryIndex];
  }

  changeAdvisory(direction: number) {
    this.currentAdvisoryIndex += direction;
    
    if (this.currentAdvisoryIndex >= this.advisories.length) {
      this.currentAdvisoryIndex = 0;
    } else if (this.currentAdvisoryIndex < 0) {
      this.currentAdvisoryIndex = this.advisories.length - 1;
    }
  }
}
