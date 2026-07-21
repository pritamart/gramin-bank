import { Component, HostListener, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';// Adjust path if needed
import { Language, LanguageService } from '../../services/language';

const HEADER_TRANSLATIONS = {
  en: {
    SKIP_CONTENT: 'Skip to main content',
    TEXT_SIZE: 'Text Size',
    CONTACT_US: 'Contact Us',
    BANK_NAME: 'Gramin Bank',
    GOVT_UNDERTAKING: 'A Govt. of India Undertaking',
    HOME: 'Home',
    ACCOUNTS: 'Accounts',
    LOANS: 'Loans',
    DIGITAL_BANKING: 'Digital Banking',
    GOVT_SCHEMES: 'Govt Schemes',
    NET_BANKING: 'Net Banking',
    LANGUAGE: 'Language'
  },
  hi: {
    SKIP_CONTENT: 'मुख्य सामग्री पर जाएं',
    TEXT_SIZE: 'पाठ का आकार',
    CONTACT_US: 'संपर्क करें',
    BANK_NAME: 'ग्रामीण बैंक',
    GOVT_UNDERTAKING: 'भारत सरकार का उपक्रम',
    HOME: 'मुख्य पृष्ठ',
    ACCOUNTS: 'खाते',
    LOANS: 'ऋण',
    DIGITAL_BANKING: 'डिजिटल बैंकिंग',
    GOVT_SCHEMES: 'सरकारी योजनाएं',
    NET_BANKING: 'नेट बैंकिंग',
    LANGUAGE: 'भाषा'
  },
  bn: {
    SKIP_CONTENT: 'মূল বিষয়বস্তুতে যান',
    TEXT_SIZE: 'লেখার আকার',
    CONTACT_US: 'যোগাযোগ করুন',
    BANK_NAME: 'গ্রামীণ ব্যাংক',
    GOVT_UNDERTAKING: 'ভারত সরকার নিবন্ধিত',
    HOME: 'হোম',
    ACCOUNTS: 'অ্যাকাউন্টস',
    LOANS: 'ঋণ',
    DIGITAL_BANKING: 'ডিজিটাল ব্যাংকিং',
    GOVT_SCHEMES: 'সরকারি প্রকল্প',
    NET_BANKING: 'নেট ব্যাংকিং',
    LANGUAGE: 'ভাষা'
  }
} as const;

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
  // Inject Shared Service
  private langService = inject(LanguageService);

  // Read current language from service
  currentLang = this.langService.currentLang;

  // Local UI states
  isMobileMenuOpen = signal<boolean>(false);
  isLangDropdownOpen = signal<boolean>(false);
  fontScale = signal<number>(100);

  // Computed translations reactive to global language signal
  t = computed(() => HEADER_TRANSLATIONS[this.currentLang()]);

  selectLanguage(lang: Language): void {
    this.langService.setLanguage(lang); // 👈 Updates global state
    this.isLangDropdownOpen.set(false);
  }

  toggleLangDropdown(): void {
    this.isLangDropdownOpen.update(prev => !prev);
  }

  toggleMenu(): void {
    this.isMobileMenuOpen.update(prev => !prev);
  }

  closeMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  setFontSize(action: 'decrease' | 'reset' | 'increase'): void {
    if (action === 'decrease' && this.fontScale() > 85) {
      this.fontScale.update(scale => scale - 7.5);
    } else if (action === 'increase' && this.fontScale() < 115) {
      this.fontScale.update(scale => scale + 7.5);
    } else if (action === 'reset') {
      this.fontScale.set(100);
    }
    document.documentElement.style.fontSize = `${this.fontScale()}%`;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
    this.isLangDropdownOpen.set(false);
  }
}
