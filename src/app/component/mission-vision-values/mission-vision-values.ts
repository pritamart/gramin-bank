

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

const MVV_TRANSLATIONS = {
  en: {
    SECTION_TAG: 'Corporate Identity',
    SECTION_TITLE: 'Our Guiding Principles',
    SECTION_SUBTITLE: 'Built on a foundation of trust, regulatory rigor, and relentless innovation to power the future of enterprise finance.',

    // Mission
    MISSION_TITLE: 'Our Mission',
    MISSION_TEXT: 'To deliver secure, accessible, and scalable financial solutions that empower businesses and individuals to achieve sustainable economic growth while upholding the highest standards of governance.',

    // Vision
    VISION_TITLE: 'Our Vision',
    VISION_TEXT: 'To be the most trusted enterprise financial institution, recognized rural for digital innovation, customer-centric excellence, and unwavering integrity.',

    // Values Section
    VALUES_TITLE: 'Core Values',
    VALUES_SUBTITLE: 'The core tenets that dictate every decision we make across our global operations.',

    VALUES_LIST: [
      {
        icon: 'integrity',
        title: 'Integrity & Ethics',
        description: 'We adhere strictly to statutory compliance and moral honesty in every transaction and stakeholder interaction.'
      },
      {
        icon: 'transparency',
        title: 'Radical Transparency',
        description: 'Clear disclosures, open reporting, and zero ambiguity in our financial products and governance disclosures.'
      },
      {
        icon: 'excellence',
        title: 'Excellence in Execution',
        description: 'Delivering enterprise-grade reliability, continuous system optimization, and zero-compromise security.'
      },
      {
        icon: 'customer',
        title: 'Customer First',
        description: 'Designing high-impact banking and financial tools centered around real customer needs and frictionless access.'
      }
    ]
  },

  hi: {
    SECTION_TAG: 'कॉर्पोरेट पहचान',
    SECTION_TITLE: 'हमारे मार्गदर्शन सिद्धांत',
    SECTION_SUBTITLE: 'इंटरप्राइज फाइनेंस के भविष्य को सशक्त बनाने के लिए विश्वास, नियामक कठोरता और निरंतर नवाचार की नींव पर निर्मित।',

    MISSION_TITLE: 'हमारा मिशन',
    MISSION_TEXT: 'सुरक्षित, सुलभ और स्केलेबल वित्तीय समाधान प्रदान करना जो उच्चतम शासन मानकों को बनाए रखते हुए व्यवसायों और व्यक्तियों को सतत आर्थिक विकास प्राप्त करने में सक्षम बनाते हैं।',

    VISION_TITLE: 'हमारा विज़न',
    VISION_TEXT: 'डिजिटल नवाचार, ग्राहक-केंद्रित उत्कृष्टता और अटूट निष्ठा के लिए वैश्विक स्तर पर मान्यता प्राप्त सबसे विश्वसनीय एंटरप्राइज वित्तीय संस्थान बनना।',

    VALUES_TITLE: 'मुख्य मूल्य',
    VALUES_SUBTITLE: 'वे मुख्य सिद्धांत जो हमारे वैश्विक संचालन में हमारे द्वारा लिए गए हर निर्णय को निर्देशित करते हैं।',

    VALUES_LIST: [
      {
        icon: 'integrity',
        title: 'सत्यनिष्ठा और नैतिकता',
        description: 'हम हर लेनदेन और हितधारक बातचीत में वैधानिक अनुपालन और नैतिक ईमानदारी का सख्ती से पालन करते हैं।'
      },
      {
        icon: 'transparency',
        title: 'पूर्ण पारदर्शिता',
        description: 'हमारे वित्तीय उत्पादों और शासन प्रकटीकरणों में स्पष्ट खुलासे, खुली रिपोर्टिंग और शून्य अस्पष्टता।'
      },
      {
        icon: 'excellence',
        title: 'निष्पादन में उत्कृष्टता',
        description: 'एंटरप्राइज-ग्रेड विश्वसनीयता, निरंतर सिस्टम अनुकूलन और समझौता-रहित सुरक्षा प्रदान करना।'
      },
      {
        icon: 'customer',
        title: 'ग्राहक सर्वोपरि',
        description: 'वास्तविक ग्राहक आवश्यकताओं और बाधा-रहित पहुँच के इर्द-गिर्द केंद्रित उच्च-प्रभाव वाली बैंकिंग और वित्तीय उपकरण तैयार करना।'
      }
    ]
  },

  bn: {
    SECTION_TAG: 'কর্পোরেট পরিচয়',
    SECTION_TITLE: 'আমাদের নির্দেশক নীতি',
    SECTION_SUBTITLE: 'এন্টারপ্রাইজ ফাইন্যান্সের ভবিষ্যৎকে শক্তিশালী করতে বিশ্বাস, নিয়ন্ত্রক কঠোরতা এবং নিরবচ্ছিন্ন উদ্ভাবনের ভিত্তিতে নির্মিত।',

    MISSION_TITLE: 'আমাদের মিশন',
    MISSION_TEXT: 'নিরাপদ, সহজলভ্য এবং স্কেলযোগ্য আর্থিক সমাধান সরবরাহ করা যা সর্বোচ্চ প্রশাসনিক মান বজায় রেখে ব্যবসা ও ব্যক্তিদের টেকসই অর্থনৈতিক প্রবৃদ্ধি অর্জনে সক্ষম করে।',

    VISION_TITLE: 'আমাদের ভিশন',
    VISION_TEXT: 'ডিজিটাল উদ্ভাবন, গ্রাহক-কেন্দ্রিক উৎকর্ষতা এবং দৃঢ় সততার জন্য গ্রামীণ স্বীকৃত সর্বাধিক বিশ্বস্ত এন্টারপ্রাইজ আর্থিক প্রতিষ্ঠান হওয়া।',

    VALUES_TITLE: 'মূল মূল্যবোধ',
    VALUES_SUBTITLE: 'আমাদের বিশ্বব্যাপী ক্রিয়াকলাপ জুড়ে আমাদের নেওয়া প্রতিটি সিদ্ধান্তকে নির্দেশিত করে এমন মৌলিক নীতিসমূহ।',

    VALUES_LIST: [
      {
        icon: 'integrity',
        title: 'সততা ও নৈতিকতা',
        description: 'আমরা প্রতিটি লেনদেন এবং স্টেকহোল্ডার মিথস্ক্রিয়ায় সংবিধিবদ্ধ অনুপালন এবং নৈতিক সততা কঠোরভাবে মেনে চলি।'
      },
      {
        icon: 'transparency',
        title: 'সম্পূর্ণ স্বচ্ছতা',
        description: 'আমাদের আর্থিক পণ্য এবং গভর্নেন্স ডিসক্লোজারে স্পষ্ট প্রকাশ, উন্মুক্ত রিপোর্টিং এবং কোনো অস্পষ্টতা না থাকা।'
      },
      {
        icon: 'excellence',
        title: 'সঠিক সম্পাদনে উৎকর্ষ',
        description: 'এন্টারপ্রাইজ-গ্রেড নির্ভরযোগ্যতা, ধারাবাহিক সিস্টেম অপ্টিমাইজেশন এবং আপোষহীন নিরাপত্তা প্রদান করা।'
      },
      {
        icon: 'customer',
        title: 'গ্রাহক প্রথম',
        description: 'বাস্তব গ্রাহক প্রয়োজন এবং নিরবচ্ছিন্ন অ্যাক্সেসকে কেন্দ্র করে উচ্চ-প্রভাবশালী ব্যাংকিং এবং আর্থিক টুলস তৈরি করা।'
      }
    ]
  }
} as const;

@Component({
  selector: 'app-mission-vision-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-vision-values.html',
  styleUrl: './mission-vision-values.css',
})
export class MissionVisionValuesComponent {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;

  t = computed(() => MVV_TRANSLATIONS[this.currentLang()]);
}


