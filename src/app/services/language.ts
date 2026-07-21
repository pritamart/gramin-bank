import { Injectable, signal } from '@angular/core';


export type Language = 'en' | 'hi' | 'bn';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Global signal accessible by all components
  currentLang = signal<Language>('en');

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }
}
