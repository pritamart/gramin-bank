import { Component, computed, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

export type ServiceType = 'ACC' | 'LOAN' | 'DIGITAL' | 'GOVT' | 'FD' | 'ATM' | null;

const SERVICES_TRANSLATIONS = {
  en: {
    SECTION_TAG: 'Core Banking Services',
    SECTION_TITLE: 'Financial Solutions Built for You',
    SECTION_SUBTITLE: 'Empowering individuals, farmers, and small businesses with secure and accessible rural banking products.',
    LEARN_MORE: 'Learn More',
    APPLY_NOW: 'Apply Online',
    CLOSE: 'Close',
    KEY_FEATURES: 'Key Features & Benefits',
    ELIGIBILITY: 'Eligibility',
    DOCUMENTS: 'Required Documents',

    // Service 1
    ACC_TITLE: 'Savings & Current Accounts',
    ACC_DESC: 'Zero-balance digital accounts with attractive interest rates, free debit cards, and instant activation.',
    ACC_DETAILS: {
      features: [
        'Zero Minimum Balance requirement for rural savings accounts',
        'High-yielding interest rates calculated daily & paid quarterly',
        'Free International RuPay Debit Card with insurance coverage',
        'Free passbook and quarterly account statements'
      ],
      eligibility: 'Resident Indian individuals aged 18+ years (Minor accounts available with guardian).',
      docs: 'Aadhaar Card, PAN Card, and 2 Recent Passport Size Photographs.'
    },

    // Service 2
    LOAN_TITLE: 'Loans & Credit Support',
    LOAN_DESC: 'Quick approval on Agriculture (KCC), Home, Personal, and Small Business loans with minimal paperwork.',
    LOAN_DETAILS: {
      features: [
        'Kisan Credit Card (KCC) with subsidized interest rates @ 4% p.a.',
        'MUDRA Loans up to ₹10 Lakhs for small business entrepreneurs',
        'Flexible repayment tenures up to 20 years for Home Loans',
        'Zero pre-payment penalties on agricultural loans'
      ],
      eligibility: 'Farmers, Agri-workers, Self-Employed individuals, and MSME owners.',
      docs: 'Identity Proof, Address Proof, Land Ownership Documents / Revenue Records, and Bank Statements.'
    },

    // Service 3
    DIGITAL_TITLE: 'Digital Banking & UPI',
    DIGITAL_DESC: 'Seamless 24/7 money transfers via IMPS, NEFT, RTGS, and instant UPI payment integrations.',
    DIGITAL_DETAILS: {
      features: [
        'Instant 24/7 money transfer via BHIM UPI, IMPS, & NEFT',
        'Gramin Mobile Banking App with biometric login security',
        'SMS Banking & WhatsApp Banking for instant balance checks',
        'Utility bill payments and mobile recharges with zero transaction fees'
      ],
      eligibility: 'All active Gramin Bank savings and current account holders with registered mobile numbers.',
      docs: 'Active Debit Card and Registered Mobile Number for instant OTP registration.'
    },

    // Service 4
    GOVT_TITLE: 'Govt Schemes & Subsidies',
    GOVT_DESC: 'Direct Benefit Transfers (DBT) for PM-KISAN, Atal Pension Yojana (APY), and PMJJBY schemes.',
    GOVT_DETAILS: {
      features: [
        'Direct Benefit Transfer (DBT) enablement for PM-KISAN subsidies',
        'Atal Pension Yojana (APY) guaranteed monthly pension up to ₹5,000/month',
        'PM Jeevan Jyoti Bima Yojana (PMJJBY) ₹2 Lakh life insurance @ ₹436/year',
        'PM Suraksha Bima Yojana (PMSBY) accident insurance @ ₹20/year'
      ],
      eligibility: 'All Indian citizens between 18 to 70 years based on specific government scheme guidelines.',
      docs: 'Aadhaar Card linked to Bank Account, Mobile Number, and Nominee Details.'
    },

    // Service 5
    FD_TITLE: 'Fixed & Term Deposits',
    FD_DESC: 'Grow your savings safely with higher yield returns, flexible tenure options, and loan-against-FD facilities.',
    FD_DETAILS: {
      features: [
        'Attractive interest rates up to 7.75% p.a. with additional 0.50% for Senior Citizens',
        'Flexible tenure options ranging from 7 days to 10 years',
        'Instant loan/overdraft facility up to 90% of deposit value',
        'Auto-renewal and quarterly interest payout options'
      ],
      eligibility: 'Individuals, Joint Account Holders, HUFs, Trusts, and Registered Societies.',
      docs: 'KYC Documents (Aadhaar & PAN) and Account Details.'
    },

    // Service 6
    ATM_TITLE: 'ATM & Card Services',
    ATM_DESC: 'Widespread doorstep banking and rural ATM network providing safe and instant cash withdrawals.',
    ATM_DETAILS: {
      features: [
        'Free 5 transactions per month at any Gramin Bank ATM network',
        'EMV Chip enabled RuPay Debit Cards with enhanced security',
        'Micro-ATM & Bank Mitra doorstep service in rural areas',
        'Instant Green PIN generation via SMS / ATM'
      ],
      eligibility: 'All active Savings & Current Account holders.',
      docs: 'Debit Card Application Form submitted at home branch.'
    }
  },

  hi: {
    SECTION_TAG: 'प्रमुख बैंकिंग सेवाएं',
    SECTION_TITLE: 'आपके लिए निर्मित वित्तीय समाधान',
    SECTION_SUBTITLE: 'सुरक्षित और सुलभ ग्रामीण बैंकिंग उत्पादों के साथ नागरिकों, किसानों और छोटे व्यवसायों को सशक्त बनाना।',
    LEARN_MORE: 'और जानें',
    APPLY_NOW: 'ऑनलाइन आवेदन करें',
    CLOSE: 'बंद करें',
    KEY_FEATURES: 'प्रमुख विशेषताएं और लाभ',
    ELIGIBILITY: 'पात्रता',
    DOCUMENTS: 'आवश्यक दस्तावेज',

    ACC_TITLE: 'बचत और चालू खाते',
    ACC_DESC: 'आकर्षक ब्याज दरों, मुफ्त डेबिट कार्ड और त्वरित सक्रियण के साथ जीरो-बैलेंस डिजिटल खाते।',
    ACC_DETAILS: {
      features: [
        'ग्रामीण बचत खातों के लिए शून्य न्यूनतम शेष राशि की आवश्यकता',
        'दैनिक आधार पर गणना और तिमाही भुगतान पर उच्च ब्याज दरें',
        'बीमा कवर के साथ मुफ्त अंतरराष्ट्रीय RuPay डेबिट कार्ड',
        'मुफ्त पासबुक और त्रैमासिक खाता विवरण'
      ],
      eligibility: '18 वर्ष से अधिक आयु के निवासी भारतीय नागरिक।',
      docs: 'आधार कार्ड, पैन कार्ड और 2 नवीनतम पासपोर्ट आकार की फोटो।'
    },

    LOAN_TITLE: 'ऋण और क्रेडिट सहायता',
    LOAN_DESC: 'कम से कम कागजी कार्रवाई के साथ कृषि (KCC), आवास, व्यक्तिगत और व्यवसाय ऋण पर त्वरित स्वीकृति।',
    LOAN_DETAILS: {
      features: [
        '4% वार्षिक रियायती ब्याज दर पर किसान क्रेडिट कार्ड (KCC)',
        'छोटे उद्यमियों के लिए ₹10 लाख तक के मुद्रा ऋण',
        'गृह ऋण के लिए 20 वर्ष तक की लचीली पुनर्भुगतान अवधि',
        'कृषि ऋणों पर शून्य पूर्व-भुगतान शुल्क'
      ],
      eligibility: 'किसान, कृषि श्रमिक, स्वरोजगार व्यक्ति और एमएसएमई मालिक।',
      docs: 'पहचान पत्र, पते का प्रमाण, भूमि के दस्तावेज और बैंक विवरण।'
    },

    DIGITAL_TITLE: 'डिजिटल बैंकिंग और यूपीआई',
    DIGITAL_DESC: 'IMPS, NEFT, RTGS और त्वरित UPI भुगतान प्रणालियों के माध्यम से निर्बाध 24/7 धन हस्तांतरण।',
    DIGITAL_DETAILS: {
      features: [
        'BHIM UPI, IMPS और NEFT के माध्यम से 24/7 तत्काल धन हस्तांतरण',
        'बायोमेट्रिक सुरक्षा के साथ ग्रामीण मोबाइल बैंकिंग ऐप',
        'त्वरित बैलेंस जांच के लिए एसएमएस बैंकिंग और व्हाट्सएप बैंकिंग',
        'शून्य लेनदेन शुल्क के साथ उपयोगिता बिल भुगतान'
      ],
      eligibility: 'पंजीकृत मोबाइल नंबर वाले सभी सक्रिय ग्रामीण बैंक खाताधारक।',
      docs: 'ओटीपी पंजीकरण के लिए सक्रिय डेबिट कार्ड और पंजीकृत मोबाइल नंबर।'
    },

    GOVT_TITLE: 'सरकारी योजनाएं और सब्सिडी',
    GOVT_DESC: 'पीएम-किसान, अटल पेंशन योजना (APY) और पीएमजेजेबीवाई जैसी योजनाओं के लिए सीधा लाभ हस्तांतरण (DBT)।',
    GOVT_DETAILS: {
      features: [
        'पीएम-किसान सब्सिडी के लिए डायरेक्ट बेनिफिट ट्रांसफर (DBT) सुविधा',
        'अटल पेंशन योजना (APY) के तहत ₹5,000/माह तक की गारंटीकृत पेंशन',
        'PMJJBY के तहत ₹436/वर्ष में ₹2 लाख का जीवन बीमा',
        'PMSBY दुर्घटना बीमा मात्र ₹20/वर्ष में'
      ],
      eligibility: 'विशिष्ट सरकारी योजना दिशानिर्देशों के अनुसार 18 से 70 वर्ष के भारतीय नागरिक।',
      docs: 'बैंक खाते से लिंक आधार कार्ड, मोबाइल नंबर और नामांकित व्यक्ति का विवरण।'
    },

    FD_TITLE: 'फिक्स्ड और टर्म डिपॉजिट',
    FD_DESC: 'उच्च ब्याज दरों, लचीली अवधि और फिक्स्ड डिपॉजिट पर ऋण सुविधाओं के साथ अपनी बचत सुरक्षित रूप से बढ़ाएं।',
    FD_DETAILS: {
      features: [
        'वरिष्ठ नागरिकों के लिए अतिरिक्त 0.50% के साथ 7.75% तक ब्याज दरें',
        '7 दिनों से 10 वर्षों तक लचीली अवधि विकल्प',
        'जमा मूल्य का 90% तक तत्काल ऋण/ओवरड्राफ्ट सुविधा',
        'ऑटो-नवीनीकरण और त्रैमासिक ब्याज भुगतान विकल्प'
      ],
      eligibility: 'व्यक्ति, संयुक्त खाताधारक, एचयूएफ और पंजीकृत संस्थाएं।',
      docs: 'केवाईसी दस्तावेज (आधार और पैन) और बैंक खाता विवरण।'
    },

    ATM_TITLE: 'एटीएम और कार्ड सेवाएं',
    ATM_DESC: 'सुरक्षित और त्वरित नकद निकासी प्रदान करने वाली डोरस्टेप बैंकिंग और ग्रामीण एटीएम नेटवर्क।',
    ATM_DETAILS: {
      features: [
        'किसी भी ग्रामीण बैंक एटीएम पर प्रति माह 5 मुफ्त लेनदेन',
        'उन्नत सुरक्षा के साथ ईएमवी चिप युक्त रूपे डेबिट कार्ड',
        'ग्रामीण क्षेत्रों में माइक्रो-एटीएम और बैंक मित्र सुविधाएं',
        'एसएमएस / एटीएम के माध्यम से तत्काल ग्रीन पिन निर्माण'
      ],
      eligibility: 'सभी सक्रिय बचत और चालू खाताधारक।',
      docs: 'गृह शाखा में जमा किया गया डेबिट कार्ड आवेदन पत्र।'
    }
  },

  bn: {
    SECTION_TAG: 'প্রধান ব্যাংকিং পরিষেবা',
    SECTION_TITLE: 'আপনার জন্য নির্মিত আর্থিক পরিষেবা',
    SECTION_SUBTITLE: 'সুরক্ষিত এবং সহজলভ্য গ্রামীণ ব্যাংকিং সুবিধার মাধ্যমে সাধারণ মানুষ, কৃষক ও ছোট ব্যবসায়ীদের ক্ষমতায়ন।',
    LEARN_MORE: 'আরও জানুন',
    APPLY_NOW: 'অনলাইনে আবেদন করুন',
    CLOSE: 'বন্ধ করুন',
    KEY_FEATURES: 'প্রধান বৈশিষ্ট্য ও সুবিধা',
    ELIGIBILITY: 'যোগ্যতা',
    DOCUMENTS: 'প্রয়োজনীয় নথিপত্র',

    ACC_TITLE: 'সঞ্চয় ও চলতি অ্যাকাউন্ট',
    ACC_DESC: 'আকর্ষণীয় সুদের হার, বিনামূল্যে ডেবিট কার্ড এবং দ্রুত অ্যাক্টিভেশন সহ জিরো-ব্যালেন্স ডিজিটাল অ্যাকাউন্ট।',
    ACC_DETAILS: {
      features: [
        'গ্রামীণ সঞ্চয় অ্যাকাউন্টের জন্য সর্বনিম্ন ব্যালেন্সের প্রয়োজন নেই',
        'দৈনিক ভিত্তিতে গণনা এবং ত্রৈমাসিক প্রদত্ত উচ্চ সুদের হার',
        'বীমা সুবিধা সহ বিনামূল্যে আন্তর্জাতিক রূপেও (RuPay) ডেবিট কার্ড',
        'বিনামূল্যে পাসবুক এবং ত্রৈমাসিক অ্যাকাউন্ট স্টেটমেন্ট'
      ],
      eligibility: '১৮ বছর বা তার বেশি বয়সী নিবাসী ভারতীয় নাগরিক।',
      docs: 'আধার কার্ড, প্যান কার্ড এবং ২ কপি সাম্প্রতিক পাসপোর্ট সাইজ ছবি।'
    },

    LOAN_TITLE: 'ঋণ ও ক্রেডিট সহায়তা',
    LOAN_DESC: 'ন্যূনতম কাগজপত্রের মাধ্যমে কৃষি (KCC), গৃহ, ব্যক্তিগত ও ব্যবসা ঋণের দ্রুত অনুমোদন।',
    LOAN_DETAILS: {
      features: [
        '৪% বার্ষিক ভর্তুকিযুক্ত সুদের হারে কিষাণ ক্রেডিট কার্ড (KCC)',
        'ছোট ব্যবসায়ীদের জন্য ১০ লক্ষ টাকা পর্যন্ত মুদ্রা (MUDRA) ঋণ',
        'গৃহ ঋণের জন্য ২০ বছর পর্যন্ত নমনীয় পরিশোধের সময়সীমা',
        'কৃষি ঋণে কোনো প্রি-পেমেন্ট চার্জ নেই'
      ],
      eligibility: 'কৃষক, কৃষি শ্রমিক, স্বনির্ভর ব্যক্তি এবং ক্ষুদ্র ও মাঝারি ব্যবসায়ী।',
      docs: 'পরিচয়পত্র, ঠিকানার প্রমাণ, জমির নথিপত্র এবং ব্যাংক স্টেটমেন্ট।'
    },

    DIGITAL_TITLE: 'ডিজিটাল ব্যাংকিং ও ইউপিআই',
    DIGITAL_DESC: 'IMPS, NEFT, RTGS এবং ইনস্ট্যান্ট UPI পেমেন্টের মাধ্যমে ২৪/৭ নির্বিঘ্ন অর্থ স্থানান্তর।',
    DIGITAL_DETAILS: {
      features: [
        'BHIM UPI, IMPS এবং NEFT-এর মাধ্যমে ২৪/৭ তাৎক্ষণিক অর্থ স্থানান্তর',
        'বায়োমেট্রিক নিরাপত্তা সহ গ্রামীণ মোবাইল ব্যাংকিং অ্যাপ',
        'তাৎক্ষণিক ব্যালেন্স চেকের জন্য এসএমএস ও হোয়াটসঅ্যাপ ব্যাংকিং',
        'জিরো ট্রানজাকশন ফি সহ ইলেকট্রিক ও অন্যান্য বিল প্রদান'
      ],
      eligibility: 'নিবন্ধিত মোবাইল নম্বর সহ সমস্ত গ্রামীণ ব্যাংক অ্যাকাউন্টধারীরা।',
      docs: 'তাৎক্ষণিক ওটিপি নিবন্ধনের জন্য সক্রিয় ডেবিট কার্ড ও নিবন্ধিত মোবাইল নম্বর।'
    },

    GOVT_TITLE: 'সরকারি প্রকল্প ও ভর্তুকি',
    GOVT_DESC: 'পিএম-কিষাণ, অটল পেনশন যোজনা (APY) এবং পিএমজেজেবিওয়াই প্রকল্পের জন্য সরাসরি অর্থ স্থানান্তর (DBT)।',
    GOVT_DETAILS: {
      features: [
        'পিএম-কিষাণ ভর্তুকির জন্য সরাসরি ডাইরেক্ট বেনিফিট ট্রান্সফার (DBT)',
        'অটল পেনশন যোজনায় (APY) মাসে ৫,০০০ টাকা পর্যন্ত গ্যারান্টিযুক্ত পেনশন',
        'PMJJBY-তে ৪৩৬ টাকা/বছরে ২ লক্ষ টাকার জীবন বীমা',
        'PMSBY দুর্ঘটনা বীমা মাত্র ২০ টাকা/বছরে'
      ],
      eligibility: 'সরকারি প্রকল্পের নির্দেশিকা অনুযায়ী ১৮ থেকে ৭০ বছর বয়সী ভারতীয় নাগরিক।',
      docs: 'ব্যাংক অ্যাকাউন্টের সাথে যুক্ত আধার কার্ড, মোবাইল নম্বর এবং নমিনির তথ্য।'
    },

    FD_TITLE: 'ফিক্সড ও টার্ম ডিপোজিট',
    FD_DESC: 'উচ্চ সুদের হার, নমনীয় সময়সীমা এবং ফিক্সড ডিপোজিটের বিপরীতে ঋণের সুবিধা সহ আপনার সঞ্চয় বৃদ্ধি করুন।',
    FD_DETAILS: {
      features: [
        'বয়স্ক নাগরিকদের জন্য অতিরিক্ত ০.৫০% সহ ৭.৭৫% পর্যন্ত আকর্ষণীয় সুদের হার',
        '৭ দিন থেকে ১০ বছর পর্যন্ত নমনীয় সময়সীমার বিকল্প',
        'জমা আমানতের ৯০% পর্যন্ত তাৎক্ষণিক ঋণ বা ওভারড্রাফ্ট সুবিধা',
        'অটো-রিনিউয়াল এবং ত্রৈমাসিক সুদ পাওয়ার সুবিধা'
      ],
      eligibility: 'ব্যক্তিগত, যৌথ অ্যাকাউন্টধারী এবং নিবন্ধিত সংস্থা।',
      docs: 'কেওয়াইসি নথিপত্র (আধার ও প্যান) এবং ব্যাংক অ্যাকাউন্ট বিবরণী।'
    },

    ATM_TITLE: 'এটিএম ও কার্ড পরিষেবা',
    ATM_DESC: 'নিরাপদ ও দ্রুত নগদ তোলার সুবিধার্থে বিস্তৃত ডোরস্টেপ ব্যাংকিং এবং গ্রামীণ এটিএম নেটওয়ার্ক।',
    ATM_DETAILS: {
      features: [
        'যেকোনো গ্রামীণ ব্যাংক এটিএম-এ প্রতি মাসে ৫টি পর্যন্ত বিনামূল্যে লেনদেন',
        'উন্নত নিরাপত্তা সহ EMV চিপযুক্ত রূপেও (RuPay) ডেবিট কার্ড',
        'গ্রামীণ অঞ্চলে মাইক্রো-এটিএম এবং ব্যাংক মিত্র সুবিধা',
        'এসএমএস లేదా এটিএম-এর মাধ্যমে তাৎক্ষণিক গ্রিন পিন তৈরি'
      ],
      eligibility: 'সমস্ত সঞ্চয় ও চলতি অ্যাকাউন্টধারীরা।',
      docs: 'হোম ব্রাঞ্চে জমা দেওয়া ডেবিট কার্ড আবেদনপত্র।'
    }
  }
} as const;

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banking-services.html',
  styleUrl: './banking-services.css',
})
export class ServicesComponent {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;

  // Track active dialog modal
  selectedService = signal<ServiceType>(null);

  t = computed(() => SERVICES_TRANSLATIONS[this.currentLang()]);

  openModal(service: ServiceType): void {
    this.selectedService.set(service);
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  closeModal(): void {
    this.selectedService.set(null);
    document.body.style.overflow = 'auto'; // Unlock background scrolling
  }

  // Close modal on ESC key
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedService()) {
      this.closeModal();
    }
  }
}
