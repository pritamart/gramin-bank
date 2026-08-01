import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-help-component',
  imports: [],
  templateUrl: './customer-help-component.html',
  styleUrl: './customer-help-component.css',
})
export class CustomerHelpComponent {

  onGetHelp(): void {
    console.log('Get Help clicked');
  }

  onLearnMore(): void {
    console.log('Learn More clicked');
  }

}
