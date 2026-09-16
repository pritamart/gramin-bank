import {
  Component,
  HostListener,
  inject,
  signal,
  effect,
  computed
} from '@angular/core';

import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Language, LanguageService } from '../../services/language';

const SEO_CONTENT: Record<string, { title: string; description: string }> = {
  en: {
    title: 'CRB Gramin Bank | Official Website',
    description:
      'Official website of CRB Gramin Bank. Access accounts, loans and digital banking services.'
  },
  hi: {
    title: 'सीआरबी ग्रामीण बैंक | आधिकारिक वेबसाइट',
    description:
      'सीआरबी ग्रामीण बैंक की आधिकारिक वेबसाइट। खाते, ऋण और डिजिटल बैंकिंग सेवाओं का लाभ उठाएं।'
  },
  bn: {
    title: 'সিআরবি গ্রামীণ ব্যাংক | অফিসিয়াল ওয়েবসাইট',
    description:
      'সিআরবি গ্রামীণ ব্যাংকের অফিসিয়াল ওয়েবসাইট। অ্যাকাউন্ট, ঋণ এবং ডিজিটাল ব্যাংকিং পরিষেবা ব্যবহার করুন।'
  }
};

const UI_CONTENT: Record<string, {
  SKIP_CONTENT: string;
  TEXT_SIZE: string;
  LANGUAGE: string;
  HOME: string;
  ACCOUNTS: string;
  LOANS: string;
  GOVT_SCHEMES: string;
}> = {
  en: {
    SKIP_CONTENT: 'Skip to content',
    TEXT_SIZE: 'Text size',
    LANGUAGE: 'Language',
    HOME: 'Home',
    ACCOUNTS: 'Accounts',
    LOANS: 'Loans',
    GOVT_SCHEMES: 'Government Schemes'
  },
  hi: {
    SKIP_CONTENT: 'सामग्री पर जाएं',
    TEXT_SIZE: 'टेक्स्ट आकार',
    LANGUAGE: 'भाषा',
    HOME: 'होम',
    ACCOUNTS: 'खाते',
    LOANS: 'ऋण',
    GOVT_SCHEMES: 'सरकारी योजनाएं'
  },
  bn: {
    SKIP_CONTENT: 'মূল বিষয়বস্তুতে যান',
    TEXT_SIZE: 'টেক্সটের আকার',
    LANGUAGE: 'ভাষা',
    HOME: 'হোম',
    ACCOUNTS: 'অ্যাকাউন্ট',
    LOANS: 'ঋণ',
    GOVT_SCHEMES: 'সরকারি প্রকল্প'
  }
};

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
  private readonly langService = inject(LanguageService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  currentLang = this.langService.currentLang;

  isMobileMenuOpen = signal(false);
  isLangDropdownOpen = signal(false);
  fontScale = signal(100);

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      const seo = SEO_CONTENT[lang] ?? SEO_CONTENT['en'];

      this.document.documentElement.lang = lang;
      this.titleService.setTitle(seo.title);

      this.metaService.updateTag({
        name: 'description',
        content: seo.description
      });

      this.metaService.updateTag({
        name: 'robots',
        content: 'index, follow'
      });

      this.metaService.updateTag({
        property: 'og:title',
        content: seo.title
      });

      this.metaService.updateTag({
        property: 'og:description',
        content: seo.description
      });
    });
  }

  selectLanguage(lang: Language): void {
    this.langService.setLanguage(lang);
    this.isLangDropdownOpen.set(false);
  }

  toggleLangDropdown(): void {
    this.isLangDropdownOpen.update(value => !value);
  }

  toggleMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
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

    this.document.documentElement.style.fontSize = `${this.fontScale()}%`;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
    this.isLangDropdownOpen.set(false);
  }

  readonly t = computed(() =>
    UI_CONTENT[this.currentLang()] ?? UI_CONTENT['en']);
}
