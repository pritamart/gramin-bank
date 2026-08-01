import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/header-component/header-component";
import { HeroComponent } from "./component/hero-component/hero-component";
import { ServicesComponent } from "./component/banking-services/banking-services";
import { FinancialInclusionComponent } from "./component/financial-inclusion/financial-inclusion";
import { CustomerCornerSupportComponent } from "./component/customer-corner-support/customer-corner-support";
import { CorporateRegulatoryNoticesComponent } from "./component/corporate-regulatory-notices/corporate-regulatory-notices";
import { GlobalFooterComponent } from "./component/global-footer.component/global-footer.component";
import { MissionVisionValuesComponent } from "./component/mission-vision-values/mission-vision-values";
import { SupportBannerComponent } from "./component/support-banner-component/support-banner-component";
import { CustomerHelpComponent } from "./component/customer-help-component/customer-help-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HeroComponent, ServicesComponent, FinancialInclusionComponent, CustomerCornerSupportComponent, CorporateRegulatoryNoticesComponent, GlobalFooterComponent, MissionVisionValuesComponent, SupportBannerComponent, CustomerHelpComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gramin-bank');
}
