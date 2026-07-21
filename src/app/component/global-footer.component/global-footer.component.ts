import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language';

const FOOTER_TRANSLATIONS = {
  en: {
    BRAND_TAGLINE: 'Empowering enterprise growth with secure financial solutions, transparent governance, and regulatory excellence.',

    // Column 1: Quick Links
    COL1_TITLE: 'Quick Links',
    COL1_LINKS: [
      { label: 'About Us', url: '#about' },
      { label: 'Board of Directors', url: '#board' },
      { label: 'Careers & Culture', url: '#careers' },
      { label: 'Media & Press Releases', url: '#media' },
      { label: 'CSR Initiatives', url: '#csr' }
    ],

    // Column 2: Regulatory & Compliance
    COL2_TITLE: 'Corporate & Regulatory',
    COL2_LINKS: [
      { label: 'Statutory Disclosures', url: '#disclosures' },
      { label: 'Financial Results', url: '#financials' },
      { label: 'SEBI / RBI Filings', url: '#filings' },
      { label: 'Tenders & Procurement', url: '#tenders' },
      { label: 'Investor Relations', url: '#investor' }
    ],

    // Column 3: Customer Care & Nodal Desk
    COL3_TITLE: 'Help & Support',
    COL3_LINKS: [
      { label: 'Grievance Redressal', url: '#grievance' },
      { label: 'Nodal Officer Details', url: '#nodal' },
      { label: 'Customer Care & Helpline', url: '#support' },
      { label: 'Branch & ATM Locator', url: '#locator' },
      { label: 'Security & Safe Banking', url: '#security' }
    ],

    // Newsletter Section
    NEWSLETTER_TITLE: 'Subscribe to Statutory Alerts',
    NEWSLETTER_SUB: 'Get official corporate notices, quarterly results, and announcements directly in your inbox.',
    EMAIL_PLACEHOLDER: 'Enter your work email address',
    SUBSCRIBE_BTN: 'Subscribe',
    SUCCESS_MSG: 'Thank you for subscribing to statutory updates!',

    // Statutory Disclaimer
    DISCLAIMER_TITLE: 'Statutory & Regulatory Notice:',
    DISCLAIMER_TEXT: 'Registered Office: Corporate Heights, Plot No. 45, Financial District, Bandra-Kurla Complex, Mumbai, Maharashtra 400051. CIN: L65190MH2026PLC100892. Regulated by Reserve Bank of India (RBI) and Securities and Exchange Board of India (SEBI).',

    // Bottom Bar
    COPYRIGHT: '© 2026 Enterprise Financial Ltd. All rights reserved.',
    LEGAL_LINKS: [
      { label: 'Privacy Policy', url: '#privacy' },
      { label: 'Terms of Service', url: '#terms' },
      { label: 'Disclaimer', url: '#disclaimer' },
      { label: 'Sitemap', url: '#sitemap' }
    ]
  },

  hi: {
    BRAND_TAGLINE: 'सुरक्षित वित्तीय समाधान, पारदर्शी शासन और उत्कृष्ट नियामक अनुपालन के साथ कॉर्पोरेट विकास को सशक्त बनाना।',

    COL1_TITLE: 'त्वरित संपर्क',
    COL1_LINKS: [
      { label: 'हमारे बारे में', url: '#about' },
      { label: 'निदेशक मंडल', url: '#board' },
      { label: 'करियर एवं संस्कृति', url: '#careers' },
      { label: 'मीडिया एवं प्रेस विज्ञप्ति', url: '#media' },
      { label: 'सीएसआर पहल', url: '#csr' }
    ],

    COL2_TITLE: 'कॉर्पोरेट एवं नियामक',
    COL2_LINKS: [
      { label: 'वैधानिक प्रकटीकरण', url: '#disclosures' },
      { label: 'वित्तीय परिणाम', url: '#financials' },
      { label: 'सेबी / आरबीआई फाइलिंग', url: '#filings' },
      { label: 'निविदा एवं खरीद', url: '#tenders' },
      { label: 'निवेशक संबंध', url: '#investor' }
    ],

    COL3_TITLE: 'सहायता एवं समर्थन',
    COL3_LINKS: [
      { label: 'शिकायत निवारण', url: '#grievance' },
      { label: 'नोडल अधिकारी विवरण', url: '#nodal' },
      { label: 'ग्राहक सेवा एवं हेल्पलाइन', url: '#support' },
      { label: 'शाखा एवं एटीएम लोकेटर', url: '#locator' },
      { label: 'सुरक्षा एवं सुरक्षित बैंकिंग', url: '#security' }
    ],

    NEWSLETTER_TITLE: 'वैधानिक अलर्ट की सदस्यता लें',
    NEWSLETTER_SUB: 'आधिकारिक कॉर्पोरेट सूचनाएं, तिमाही परिणाम और घोषणाएं सीधे अपने इनबॉक्स में प्राप्त करें।',
    EMAIL_PLACEHOLDER: 'अपना ईमेल पता दर्ज करें',
    SUBSCRIBE_BTN: 'सदस्यता लें',
    SUCCESS_MSG: 'वैधानिक अपडेट की सदस्यता लेने के लिए धन्यवाद!',

    DISCLAIMER_TITLE: 'वैधानिक एवं नियामक सूचना:',
    DISCLAIMER_TEXT: 'पंजीकृत कार्यालय: कॉर्पोरेट हाइट्स, प्लॉट नंबर 45, फाइनेंशियल डिस्ट्रिक्ट, बांद्रा-कुर्ला कॉम्प्लेक्स, मुंबई, महाराष्ट्र 400051। CIN: L65190MH2026PLC100892। भारतीय रिजर्व बैंक (RBI) और भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI) द्वारा विनियमित।',

    COPYRIGHT: '© 2026 एंटरप्राइज फाइनेंशियल लिमिटेड। सर्वाधिकार सुरक्षित।',
    LEGAL_LINKS: [
      { label: 'गोपनीयता नीति', url: '#privacy' },
      { label: 'सेवा की शर्तें', url: '#terms' },
      { label: 'अस्वीकरण', url: '#disclaimer' },
      { label: 'साइटमैप', url: '#sitemap' }
    ]
  },

  bn: {
    BRAND_TAGLINE: 'নিরাপদ আর্থিক সমাধান, স্বচ্ছ শাসন এবং বৈধানিক উৎকর্ষতার সাথে কর্পোরেট প্রবৃদ্ধিকে ক্ষমতায়ন।',

    COL1_TITLE: 'দ্রুত লিংক',
    COL1_LINKS: [
      { label: 'আমাদের সম্পর্কে', url: '#about' },
      { label: 'পরিচালনা পর্ষদ', url: '#board' },
      { label: 'ক্যারিয়ার ও সংস্কৃতি', url: '#careers' },
      { label: 'মিডিয়া ও প্রেস বিজ্ঞপ্তি', url: '#media' },
      { label: 'সিএসআর উদ্যোগ', url: '#csr' }
    ],

    COL2_TITLE: 'করপোরেট ও রেগুলেটরি',
    COL2_LINKS: [
      { label: 'সংবিধিবদ্ধ প্রকাশনা', url: '#disclosures' },
      { label: 'আর্থিক ফলাফল', url: '#financials' },
      { label: 'সেবি / আরবিআই ফাইলিং', url: '#filings' },
      { label: 'টেন্ডার ও সংগ্রহ', url: '#tenders' },
      { label: 'ইনভেস্টর রিলেশনস', url: '#investor' }
    ],

    COL3_TITLE: 'সহায়তা ও সমর্থন',
    COL3_LINKS: [
      { label: 'অভিযোগ প্রতিকার', url: '#grievance' },
      { label: 'নোডাল অফিসার বিবরণ', url: '#nodal' },
      { label: 'গ্রাহক সেবা ও হেল্পলাইন', url: '#support' },
      { label: 'শাখা ও এটিএম লোকেটর', url: '#locator' },
      { label: 'সুরক্ষা ও নিরাপদ ব্যাংকিং', url: '#security' }
    ],

    NEWSLETTER_TITLE: 'সংবিধিবদ্ধ অ্যালার্ট সাবস্ক্রাইব করুন',
    NEWSLETTER_SUB: 'অফিসিয়াল কর্পোরেট নোটিশ, ত্রৈমাসিক ফলাফল এবং ঘোষণা সরাসরি আপনার ইনবক্সে পান।',
    EMAIL_PLACEHOLDER: 'আপনার ইমেল ঠিকানা লিখুন',
    SUBSCRIBE_BTN: 'সাবস্ক্রাইব',
    SUCCESS_MSG: 'সংবিধিবদ্ধ আপডেট সাবস্ক্রাইব করার জন্য ধন্যবাদ!',

    DISCLAIMER_TITLE: 'সংবিধিবদ্ধ ও রেগুলেটরি বিজ্ঞপ্তি:',
    DISCLAIMER_TEXT: 'নিবন্ধিত কার্যালয়: কর্পোরেট হাইটস, প্লট নং ৪৫, ফাইন্যান্সিয়াল ডিস্ট্রিক্ট, বান্দ্রা-কুরলা কমপ্লেক্স, মুম্বাই, মহারাষ্ট্র ৪০০০৫১। CIN: L65190MH2026PLC100892। রিজার্ভ ব্যাংক অব ইন্ডিয়া (RBI) এবং সিকিউরিটিজ অ্যান্ড এক্সচেঞ্জ বোর্ড অব ইন্ডিয়া (SEBI) দ্বারা নিয়ন্ত্রিত।',

    COPYRIGHT: '© ২০২৬ এন্টারপ্রাইজ ফাইন্যান্সিয়াল লিমিটেড। সর্বস্বত্ব সংরক্ষিত।',
    LEGAL_LINKS: [
      { label: 'গোপনীয়তা নীতি', url: '#privacy' },
      { label: 'সেবার শর্তাবলী', url: '#terms' },
      { label: 'দায়মুক্তি', url: '#disclaimer' },
      { label: 'সাইটম্যাপ', url: '#sitemap' }
    ]
  }
} as const;

@Component({
  selector: 'app-global-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './global-footer.component.html',
  styleUrl: './global-footer.component.css',
})
export class GlobalFooterComponent {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;

  emailInput = signal<string>('');
  isSubscribed = signal<boolean>(false);

  // Translation computed signal
  t = computed(() => FOOTER_TRANSLATIONS[this.currentLang()]);

  onSubscribe(event: Event): void {
    event.preventDefault();
    if (this.emailInput().trim()) {
      this.isSubscribed.set(true);
      setTimeout(() => {
        this.emailInput.set('');
        this.isSubscribed.set(false);
      }, 4000);
    }
  }
}
