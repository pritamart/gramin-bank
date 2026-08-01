import { Component } from '@angular/core';

@Component({
  selector: 'app-support-banner-component',
  standalone: true,
  imports: [],
  templateUrl: './support-banner-component.html',
  styleUrl: './support-banner-component.css',
})
export class SupportBannerComponent {

  onContactSupport(): void {
    console.log('Contact Support clicked');
  }

  onFindBranch(): void {
    console.log('Find Branch clicked');
  }

}
