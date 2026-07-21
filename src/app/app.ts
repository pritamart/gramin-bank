import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/header-component/header-component";
import { HeroComponent } from "./component/hero-component/hero-component";
import { ServicesComponent } from "./component/banking-services/banking-services";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HeroComponent, ServicesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gramin-bank');
}
