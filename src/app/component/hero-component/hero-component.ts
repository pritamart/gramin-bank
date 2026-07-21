import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';// Adjust path if needed
import { LanguageService } from '../../services/language';

const HERO_TRANSLATIONS = {
  en: {
    TAG: 'Welcome to Gramin Bank',
    TITLE_1: 'Empowering Rural India With',
    TITLE_HIGHLIGHT: 'Modern Banking Solutions',
    SUBTITLE: 'Experience seamless digital banking, quick loan approvals, and secure savings accounts designed for every citizen.',
    PRIMARY_CTA: 'Open Savings Account',
    SECONDARY_CTA: 'Explore Schemes',
    STAT_1_LABEL: 'Happy Customers',
    STAT_2_LABEL: 'Branches Nationwide',
    STAT_3_LABEL: 'Uptime Reliability'
  },
  hi: {
    TAG: 'ग्रामीण बैंक में आपका स्वागत है',
    TITLE_1: 'ग्रामीण भारत को सशक्त बनाना',
    TITLE_HIGHLIGHT: 'आधुनिक बैंकिंग समाधान',
    SUBTITLE: 'हर नागरिक के लिए डिज़ाइन की गई निर्बाध डिजिटल बैंकिंग, त्वरित ऋण स्वीकृति और सुरक्षित बचत खातों का अनुभव करें।',
    PRIMARY_CTA: 'बचत खाता खोलें',
    SECONDARY_CTA: 'योजनाएं देखें',
    STAT_1_LABEL: 'संतुष्ट ग्राहक',
    STAT_2_LABEL: 'देशभर में शाखाएं',
    STAT_3_LABEL: 'विश्वसनीयता'
  },
  bn: {
    TAG: 'গ্রামীণ ব্যাংকে আপনাকে স্বাগতম',
    TITLE_1: 'গ্রামীণ ভারতের ক্ষমতায়নে',
    TITLE_HIGHLIGHT: 'আধুনিক ব্যাংকিং সেবা',
    SUBTITLE: 'প্রতিটি নাগরিকের জন্য ডিজাইন করা নির্বিঘ্ন ডিজিটাল ব্যাংকিং, দ্রুত ঋণ অনুমোদন এবং নিরাপদ সঞ্চয় অ্যাকাউন্টের সুবিধা নিন।',
    PRIMARY_CTA: 'সঞ্চয় অ্যাকাউন্ট খুলুন',
    SECONDARY_CTA: 'প্রকল্পগুলি দেখুন',
    STAT_1_LABEL: 'সঞ্চয়ী গ্রাহক',
    STAT_2_LABEL: 'দেশব্যাপী শাখা',
    STAT_3_LABEL: 'নির্ভরযোগ্যতা'
  }
} as const;

@Component({
  selector: 'app-hero-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-component.html',
  styleUrls: ['./hero-component.css']
})
export class HeroComponent implements OnInit {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;
  t = computed(() => HERO_TRANSLATIONS[this.currentLang()]);

  // Animated Signals starting from 0
  stat1 = signal<number>(0);
  stat2 = signal<number>(0);
  stat3 = signal<number>(0);

  ngOnInit(): void {
    this.startCountUpAnimation();
  }

  private startCountUpAnimation(): void {
    const duration = 2000; // 2 seconds animation time
    const startTime = performance.now();

    const target1 = 10;     // 10M+
    const target2 = 5000;   // 5,000+
    const target3 = 99.9;   // 99.9%

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Ease-out cubic formula for smooth deceleration towards the end
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.stat1.set(Math.floor(easeOut * target1));
      this.stat2.set(Math.floor(easeOut * target2));
      this.stat3.set(Number((easeOut * target3).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final exact values
        this.stat1.set(target1);
        this.stat2.set(target2);
        this.stat3.set(target3);
      }
    };

    requestAnimationFrame(animate);
  }
}
