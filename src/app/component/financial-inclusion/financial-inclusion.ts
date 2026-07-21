import { Component, computed, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

export type SchemeCategory = 'ALL' | 'SOCIAL_SECURITY' | 'AGRICULTURE' | 'ENTERPRISE';

export interface Scheme {
  id: string;
  category: 'SOCIAL_SECURITY' | 'AGRICULTURE' | 'ENTERPRISE';
  title: string;
  subTitle: string;
  tag: string;
  image: string;
  badgeColor: string;
  shortDesc: string;
  stats: { label: string; value: string };
  features: string[];
  eligibility: string;
  documents: string[];
  dbtEnabled: boolean;
}

const SCHEMES_TRANSLATIONS = {
  en: {
    SECTION_TAG: 'Government Initiatives & Direct Benefit Transfer',
    SECTION_TITLE: 'Empowering Every Citizen Through Financial Inclusion',
    SECTION_SUBTITLE: 'Access flagship Government of India schemes, direct subsidies, and social security programs tailored for rural and semi-urban growth.',

    // Impact Stats
    STAT_1_VAL: '50+ Cr',
    STAT_1_LAB: 'Jan Dhan Accounts',
    STAT_2_VAL: '₹34 Lakh Cr+',
    STAT_2_LAB: 'DBT Transferred',
    STAT_3_VAL: '100%',
    STAT_3_LAB: 'Digital Transparency',
    STAT_4_VAL: '14+ Cr',
    STAT_4_LAB: 'Farmers Supported',

    // Category Filter Tabs
    TAB_ALL: 'All Schemes',
    TAB_SOCIAL: 'Insurance & Pension',
    TAB_AGRI: 'Agriculture & Rural',
    TAB_ENTERPRISE: 'Business & Loans',

    // Action Labels
    VIEW_DETAILS: 'Scheme Details & Apply',
    DBT_BADGE: 'DBT Enabled',
    KEY_BENEFITS: 'Key Scheme Benefits',
    ELIGIBILITY: 'Eligibility Criteria',
    DOCUMENTS: 'Required Documents',
    APPLY_SCHEME: 'Apply for Scheme',
    CLOSE: 'Close',

    // Schemes List
    SCHEMES: [
      {
        id: 'pmjdy',
        category: 'SOCIAL_SECURITY',
        title: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
        subTitle: 'National Mission for Financial Inclusion',
        tag: 'Universal Banking',
        image: 'https://vajiramias.sgp1.cdn.digitaloceanspaces.com/wp/current-affairs/2025/04/pradhan_mantri_jan_dhan_yojana_pmjdy.webp?v=2',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        shortDesc: 'Zero-balance savings account providing direct access to banking, overdraft facilities, and built-in accidental insurance.',
        stats: { label: 'Inbuilt Accidental Cover', value: '₹2 Lakh' },
        features: [
          'Zero minimum balance requirement',
          'Free RuPay Debit Card with ₹2 Lakh accidental insurance cover',
          'Overdraft facility up to ₹10,000 for eligible account holders',
          'Direct Benefit Transfer (DBT) integration for all Govt subsidies'
        ],
        eligibility: 'Any Resident Indian citizen aged 10 years and above with valid KYC documents.',
        documents: ['Aadhaar Card', 'PAN Card or Form 60', '2 Passport Size Photographs'],
        dbtEnabled: true
      },
      {
        id: 'pmkisan',
        category: 'AGRICULTURE',
        title: 'PM Kisan Samman Nidhi (PM-KISAN)',
        subTitle: 'Income Support for Farming Households',
        tag: 'Agriculture Support',
        image: 'https://vajiramias.sgp1.cdn.digitaloceanspaces.com/wp/current-affairs/2025/07/PM-1.webp?v=2',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        shortDesc: 'Direct financial assistance of ₹6,000 per year transferred directly into the bank accounts of land-holding farmers.',
        stats: { label: 'Annual Direct Support', value: '₹6,000 / Year' },
        features: [
          '₹6,000 per year provided in three equal installments of ₹2,000',
          'Direct transfer into Aadhaar-linked bank accounts without intermediaries',
          'Integrated with Kisan Credit Card (KCC) for instant low-interest farm loans',
          'Digital status tracking via PM-KISAN mobile app'
        ],
        eligibility: 'All landholding farmer families having cultivable landholding in their names.',
        documents: ['Aadhaar Card', 'Land Ownership Records (Khatian / Porcha)', 'Aadhaar-Linked Bank Passbook'],
        dbtEnabled: true
      },
      {
        id: 'pmjjby',
        category: 'SOCIAL_SECURITY',
        title: 'PM Jeevan Jyoti Bima Yojana (PMJJBY)',
        subTitle: 'Affordable Government Life Insurance Scheme',
        tag: 'Life Insurance',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAp1p7taakKCj_6q4IQSJyUhT-EDbA-sc4JMwzXpNe6xQ6gJJyLUX8dVsu&s=10',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        shortDesc: 'High-value renewable life insurance cover of ₹2 Lakh available at an ultra-low premium of just ₹436 per year.',
        stats: { label: 'Life Cover at ₹436/yr', value: '₹2,000,000' },
        features: [
          '₹2 Lakh life insurance coverage for death due to any reason',
          'Nominal annual premium of ₹436 auto-debited from bank account',
          'Simple enrollment process with no mandatory medical examination',
          '1-year renewable coverage from 1st June to 31st May'
        ],
        eligibility: 'Individuals aged 18 to 50 years holding an active bank account with consent for auto-debit.',
        documents: ['Aadhaar Card', 'Bank Account Consent Form', 'Nominee KYC Details'],
        dbtEnabled: true
      },
      {
        id: 'pmsby',
        category: 'SOCIAL_SECURITY',
        title: 'PM Suraksha Bima Yojana (PMSBY)',
        subTitle: 'Accidental Death & Disability Cover',
        tag: 'Accident Insurance',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK8Y3NdiBtIzJ6CDwhffYXf-Pk2vmCChIGodDHaD-lJbfuPns0GNm4pDB&s=10',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        shortDesc: 'India’s most affordable accident insurance policy giving ₹2 Lakh protection for a premium of only ₹20 annually.',
        stats: { label: 'Premium Per Year', value: '₹20 / Year' },
        features: [
          '₹2 Lakh risk coverage for accidental death or full permanent disability',
          '₹1 Lakh coverage for partial permanent disability',
          'Ultra-affordable annual premium of ₹20 auto-debited in May',
          'Hassle-free direct claim settlement into nominee’s bank account'
        ],
        eligibility: 'Individuals aged 18 to 70 years having an active savings bank account.',
        documents: ['Aadhaar Card', 'Savings Bank Account', 'Nominee Form'],
        dbtEnabled: true
      },
      {
        id: 'apy',
        category: 'SOCIAL_SECURITY',
        title: 'Atal Pension Yojana (APY)',
        subTitle: 'Guaranteed Pension for Unorganized Sector',
        tag: 'Retirement Pension',
        image: 'https://exhibitionglobe.com/wp-content/uploads/2022/08/Atal-Pension-Yojana-1.webp',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        shortDesc: 'Guaranteed monthly pension between ₹1,000 and ₹5,000 after attaining 60 years of age, secured by the Govt of India.',
        stats: { label: 'Monthly Pension', value: 'Up to ₹5,000' },
        features: [
          'Fixed guaranteed monthly pension options: ₹1k, ₹2k, ₹3k, ₹4k, or ₹5k',
          'Government co-contribution for eligible subscribers',
          'On subscriber’s demise, pension continues to spouse for life',
          'Total accumulated corpus returned to nominee upon demise of both spouses'
        ],
        eligibility: 'All unorganized sector workers aged 18 to 40 years holding a bank account.',
        documents: ['Aadhaar Card', 'Active Savings Account Number', 'Mobile Number'],
        dbtEnabled: true
      },
      {
        id: 'mudra',
        category: 'ENTERPRISE',
        title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
        subTitle: 'Micro-Funding Small Businesses & Micro-Enterprises',
        tag: 'Business Growth',
        image: 'https://affairscloud.com/assets/uploads/2022/04/Pradhan-Mantri-Mudra-Yojana-completes-seven-years.jpg',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
        shortDesc: 'Collateral-free business credit up to ₹10 Lakhs under Shishu, Kishore, and Tarun categories to promote self-employment.',
        stats: { label: 'Collateral-Free Credit', value: 'Up to ₹10 Lakhs' },
        features: [
          'Shishu: Loans up to ₹50,000 for startup businesses',
          'Kishore: Loans above ₹50,000 up to ₹5 Lakhs for established micro-units',
          'Tarun: Loans above ₹5 Lakhs up to ₹10 Lakhs for enterprise expansion',
          'Zero collateral or third-party guarantee required'
        ],
        eligibility: 'Non-Corporate, Non-Farm Small/Micro Enterprises, shopkeepers, artisans, and agri-allied units.',
        documents: ['Business Identity Proof', 'Address Proof of Business', 'Project Quotation / Business Plan', 'Bank Statements'],
        dbtEnabled: false
      }
    ] as Scheme[]
  },

  hi: {
    SECTION_TAG: 'सरकारी पहल एवं प्रत्यक्ष लाभ अंतरण (DBT)',
    SECTION_TITLE: 'वित्तीय समावेशन से सशक्त बनता हर नागरिक',
    SECTION_SUBTITLE: 'ग्रामीण और अर्ध-शहरी विकास के लिए भारत सरकार की प्रमुख योजनाओं, सब्सिडी और सामाजिक सुरक्षा योजनाओं का लाभ उठाएं।',

    STAT_1_VAL: '50+ करोड़',
    STAT_1_LAB: 'जन धन खाते',
    STAT_2_VAL: '₹34 लाख करोड़+',
    STAT_2_LAB: 'DBT हस्तांतरित',
    STAT_3_VAL: '100%',
    STAT_3_LAB: 'डिजिटल पारदर्शिता',
    STAT_4_VAL: '14+ करोड़',
    STAT_4_LAB: 'लाभान्वित किसान',

    TAB_ALL: 'सभी योजनाएं',
    TAB_SOCIAL: 'बीमा और पेंशन',
    TAB_AGRI: 'कृषि एवं ग्रामीण',
    TAB_ENTERPRISE: 'व्यवसाय एवं ऋण',

    VIEW_DETAILS: 'योजना विवरण और आवेदन करें',
    DBT_BADGE: 'DBT सक्षम',
    KEY_BENEFITS: 'योजना के प्रमुख लाभ',
    ELIGIBILITY: 'पात्रता मानदंड',
    DOCUMENTS: 'आवश्यक दस्तावेज',
    APPLY_SCHEME: 'योजना के लिए आवेदन करें',
    CLOSE: 'बंद करें',

    SCHEMES: [
      {
        id: 'pmjdy',
        category: 'SOCIAL_SECURITY',
        title: 'प्रधानमंत्री जन धन योजना (PMJDY)',
        subTitle: 'वित्तीय समावेशन का राष्ट्रीय मिशन',
        tag: 'सार्वभौमिक बैंकिंग',
        image: 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        shortDesc: 'बैंकिंग सुविधाओं, ओवरड्राफ्ट और दुर्घटना बीमा के साथ शून्य-बैलेंस बचत खाता।',
        stats: { label: 'निर्मित दुर्घटना बीमा', value: '₹2 लाख' },
        features: [
          'शून्य न्यूनतम शेष राशि की आवश्यकता',
          '₹2 लाख दुर्घटना बीमा के साथ मुफ्त रूपे (RuPay) डेबिट कार्ड',
          'पात्र खाताधारकों के लिए ₹10,000 तक ओवरड्राफ्ट सुविधा',
          'सभी सरकारी सब्सिडी के लिए डीबीटी (DBT) सुविधा'
        ],
        eligibility: '10 वर्ष और उससे अधिक आयु के कोई भी भारतीय नागरिक जिनके पास वैध केवाईसी दस्तावेज हैं।',
        documents: ['आधार कार्ड', 'पैन कार्ड या फॉर्म 60', '2 पासपोर्ट साइज फोटो'],
        dbtEnabled: true
      },
      {
        id: 'pmkisan',
        category: 'AGRICULTURE',
        title: 'पीएम किसान सम्मान निधि (PM-KISAN)',
        subTitle: 'कृषक परिवारों के लिए आय सहायता',
        tag: 'कृषि सहायता',
        image: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4273d?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        shortDesc: 'भूमिधारक किसानों के बैंक खातों में ₹6,000 प्रति वर्ष की प्रत्यक्ष वित्तीय सहायता।',
        stats: { label: 'वार्षिक प्रत्यक्ष सहायता', value: '₹6,000 / वर्ष' },
        features: [
          '₹2,000 की तीन समान किस्तों में प्रति वर्ष ₹6,000',
          'बिना किसी बिचौलिए के सीधे आधार-लिंक्ड बैंक खातों में ट्रांसफर',
          'कम ब्याज वाले कृषि ऋण के लिए किसान क्रेडिट कार्ड (KCC) से एकीकृत',
          'पीएम-किसान मोबाइल ऐप से डिजिटल स्थिति ट्रैकिंग'
        ],
        eligibility: 'वे सभी किसान परिवार जिनके नाम पर कृषि योग्य भूमि है।',
        documents: ['आधार कार्ड', 'भूमि स्वामित्व रिकॉर्ड (खतियान/पर्चा)', 'आधार-लिंक्ड बैंक पासबुक'],
        dbtEnabled: true
      },
      {
        id: 'pmjjby',
        category: 'SOCIAL_SECURITY',
        title: 'पीएम जीवन ज्योति बीमा योजना (PMJJBY)',
        subTitle: 'किफायती सरकारी जीवन बीमा योजना',
        tag: 'जीवन बीमा',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        shortDesc: 'मात्र ₹436 प्रति वर्ष के प्रीमियम पर ₹2 लाख का नवीकरणीय जीवन बीमा कवर।',
        stats: { label: '₹436/वर्ष में जीवन बीमा', value: '₹2,000,000' },
        features: [
          'किसी भी कारण से मृत्यु होने पर ₹2 लाख का जीवन बीमा कवर',
          'बैंक खाते से ऑटो-डेबिट मात्र ₹436 का वार्षिक प्रीमियम',
          'बिना किसी मेडिकल जांच के आसान नामांकन प्रक्रिया',
          '1 जून से 31 मई तक 1-वर्षीय नवीकरणीय कवर'
        ],
        eligibility: 'ऑटो-डेबिट की सहमति वाले सक्रिय बैंक खाताधारक 18 से 50 वर्ष की आयु के व्यक्ति।',
        documents: ['आधार कार्ड', 'बैंक खाता सहमति पत्र', 'नामांकित व्यक्ति (Nominee) के दस्तावेज'],
        dbtEnabled: true
      },
      {
        id: 'pmsby',
        category: 'SOCIAL_SECURITY',
        title: 'पीएम सुरक्षा बीमा योजना (PMSBY)',
        subTitle: 'दुर्घटना मृत्यु एवं विकलांगता कवर',
        tag: 'दुर्घटना बीमा',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        shortDesc: 'मात्र ₹20 के वार्षिक प्रीमियम पर ₹2 लाख की सुरक्षा देने वाली दुर्घटना बीमा नीति।',
        stats: { label: 'वार्षिक प्रीमियम', value: '₹20 / वर्ष' },
        features: [
          'दुर्घटना में मृत्यु या पूर्ण विकलांगता पर ₹2 लाख का कवर',
          'आंशिक स्थायी विकलांगता के लिए ₹1 लाख का कवर',
          'मई माह में बैंक खाते से स्व-कटौती (Auto-debit) मात्र ₹20',
          'नामांकित व्यक्ति के खाते में सीधे और आसान दावों का निपटान'
        ],
        eligibility: 'सक्रिय बचत बैंक खाते वाले 18 से 70 वर्ष की आयु के व्यक्ति।',
        documents: ['आधार कार्ड', 'बचत बैंक खाता', 'नामांकित फॉर्म'],
        dbtEnabled: true
      },
      {
        id: 'apy',
        category: 'SOCIAL_SECURITY',
        title: 'अटल पेंशन योजना (APY)',
        subTitle: 'असंगठित क्षेत्र के लिए गारंटीकृत पेंशन',
        tag: 'सेवानिवृत्ति पेंशन',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        shortDesc: '60 वर्ष की आयु पूरी होने के बाद ₹1,000 से ₹5,000 प्रति माह की गारंटीकृत पेंशन।',
        stats: { label: 'मासिक पेंशन', value: '₹5,000 तक' },
        features: [
          'गारंटीकृत मासिक पेंशन विकल्प: ₹1k, ₹2k, ₹3k, ₹4k, या ₹5k',
          'पात्र अंशधारकों के लिए सरकारी सह-योगदान',
          'अंशधारक की मृत्यु के बाद पति/पत्नी को आजीवन पेंशन',
          'दोनों की मृत्यु के बाद नामांकित व्यक्ति को जमा राशि की वापसी'
        ],
        eligibility: 'बैंक खाताधारक 18 से 40 वर्ष की आयु के असंगठित क्षेत्र के कार्यकर्ता।',
        documents: ['आधार कार्ड', 'सक्रिय बचत खाता संख्या', 'मोबाइल नंबर'],
        dbtEnabled: true
      },
      {
        id: 'mudra',
        category: 'ENTERPRISE',
        title: 'प्रधानमंत्री मुद्रा योजना (PMMY)',
        subTitle: 'छोटे व्यवसायों और सूक्ष्म उद्यमों के लिए ऋण',
        tag: 'व्यवसाय विकास',
        image: 'https://images.unsplash.com/photo-1617058862325-11585be7d4df?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
        shortDesc: 'स्वरोजगार को बढ़ावा देने के लिए शिशु, किशोर और तरुण श्रेणियों के तहत ₹10 लाख तक का ऋण।',
        stats: { label: 'बिना गारंटी ऋण', value: '₹10 लाख तक' },
        features: [
          'शिशु: नए व्यवसाय के लिए ₹50,000 तक का ऋण',
          'किशोर: स्थापित इकाइयों के लिए ₹50,000 से ₹5 लाख तक का ऋण',
          'तरुण: व्यवसाय विस्तार के लिए ₹5 लाख से ₹10 लाख तक का ऋण',
          'किसी गारंटी या तीसरे पक्ष की सुरक्षा की आवश्यकता नहीं'
        ],
        eligibility: 'गैर-कॉर्पोरेट, गैर-कृषि सूक्ष्म उद्यम, दुकानदार, कारीगर और छोटे व्यवसायी।',
        documents: ['व्यवसाय पहचान पत्र', 'व्यवसाय के पते का प्रमाण', 'प्रोजेक्ट रिपोर्ट / बिजनेस प्लान', 'बैंक विवरण'],
        dbtEnabled: false
      }
    ] as Scheme[]
  },

  bn: {
    SECTION_TAG: 'সরকারি উদ্যোগ ও সরাসরি অর্থ স্থানান্তর (DBT)',
    SECTION_TITLE: 'আর্থিক অন্তর্ভুক্তির মাধ্যমে প্রতিটি নাগরিকের ক্ষমতায়ন',
    SECTION_SUBTITLE: 'গ্রামীণ ও আধা-শহরাঞ্চলের বিকাশের জন্য ভারত সরকারের মূল প্রকল্প, ভর্তুকি এবং সামাজিক সুরক্ষা ব্যবস্থার সুযোগ নিন।',

    STAT_1_VAL: '৫০+ কোটি',
    STAT_1_LAB: 'জন ধন অ্যাকাউন্ট',
    STAT_2_VAL: '₹৩৪ লক্ষ কোটি+',
    STAT_2_LAB: 'DBT হস্তান্তরিত',
    STAT_3_VAL: '১০০%',
    STAT_3_LAB: 'ডিজিটাল স্বচ্ছতা',
    STAT_4_VAL: '১৪+ কোটি',
    STAT_4_LAB: 'উপকৃত কৃষক',

    TAB_ALL: 'সমস্ত প্রকল্প',
    TAB_SOCIAL: 'বীমা ও পেনশন',
    TAB_AGRI: 'কৃষি ও গ্রামীণ',
    TAB_ENTERPRISE: 'ব্যবসা ও ঋণ',

    VIEW_DETAILS: 'প্রকল্পের বিস্তারিত ও আবেদন',
    DBT_BADGE: 'DBT যুক্ত',
    KEY_BENEFITS: 'প্রধান সুবিধাসমূহ',
    ELIGIBILITY: 'যোগ্যতার মানদণ্ড',
    DOCUMENTS: 'প্রয়োজনীয় নথিপত্র',
    APPLY_SCHEME: 'প্রকল্পে আবেদন করুন',
    CLOSE: 'বন্ধ করুন',

    SCHEMES: [
      {
        id: 'pmjdy',
        category: 'SOCIAL_SECURITY',
        title: 'প্রধানমন্ত্রী জন ধন যোজনা (PMJDY)',
        subTitle: 'আর্থিক অন্তর্ভুক্তির জাতীয় মিশন',
        tag: 'সর্বজনীন ব্যাংকিং',
        image: 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        shortDesc: 'জিরো-ব্যালেন্স সঞ্চয় অ্যাকাউন্ট, যা ওভারড্রাফ্ট সুবিধা এবং দুর্ঘটনা বীমা প্রদান করে।',
        stats: { label: 'বিনামূল্যে দুর্ঘটনা বীমা', value: '₹২ লক্ষ' },
        features: [
          'কোনো সর্বনিম্ন ব্যালেন্সের প্রয়োজন নেই',
          '২ লক্ষ টাকার দুর্ঘটনা বীমা সহ বিনামূল্যে রূপেও (RuPay) ডেবিট কার্ড',
          'যোগ্য অ্যাকাউন্টধারীদের জন্য ১০,০০০ টাকা পর্যন্ত ওভারড্রাফ্ট সুবিধা',
          'সমস্ত সরকারি ভর্তুকির জন্য সরাসরি অর্থ স্থানান্তর (DBT) সুবিধা'
        ],
        eligibility: 'বৈধ কেওয়াইসি (KYC) নথি সহ ১০ বছর বা তার বেশি বয়সী যেকোনো ভারতীয় নাগরিক।',
        documents: ['আধার কার্ড', 'প্যান কার্ড বা ফর্ম ৬০', '২ কপি পাসপোর্ট সাইজ ছবি'],
        dbtEnabled: true
      },
      {
        id: 'pmkisan',
        category: 'AGRICULTURE',
        title: 'পিএম কিষাণ সম্মান নিধি (PM-KISAN)',
        subTitle: 'কৃষক পরিবারের জন্য আর্থিক সহায়তা',
        tag: 'কৃষি সহায়তা',
        image: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4273d?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        shortDesc: 'জমি আছে এমন কৃষক পরিবারগুলির ব্যাংক অ্যাকাউন্টে বছরে ৬,০০০ টাকার সরাসরি আর্থিক সহায়তা।',
        stats: { label: 'বার্ষিক সরাসরি সহায়তা', value: '₹৬,০০০ / বছর' },
        features: [
          'বছরে ২,০০০ টাকা করে ৩টি কিস্তিতে মোট ৬,০০০ টাকা প্রদান',
          'কোনো মধ্যস্থতাকারী ছাড়াই সরাসরি আধার-সংযুক্ত ব্যাংক অ্যাকাউন্টে টাকা স্থানান্তর',
          'স্বল্প সুদে কৃষি ঋণের জন্য কিষাণ ক্রেডিট কার্ড (KCC)-এর সাথে সংযুক্ত',
          'পিএম-কিষাণ মোবাইল অ্যাপের মাধ্যমে স্থিতি পরীক্ষার সুবিধা'
        ],
        eligibility: 'নিজের নামে চাষযোগ্য জমি রয়েছে এমন সমস্ত কৃষক পরিবার।',
        documents: ['আধার কার্ড', 'জমির নথি (খতিয়ান/পর্চা)', 'আধার-সংযুক্ত ব্যাংক পাসবুক'],
        dbtEnabled: true
      },
      {
        id: 'pmjjby',
        category: 'SOCIAL_SECURITY',
        title: 'পিএম জীবন জ্যোতি বীমা যোজনা (PMJJBY)',
        subTitle: 'সাশ্রয়ী মূল্যের সরকারি জীবন বীমা প্রকল্প',
        tag: 'জীবন বীমা',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        shortDesc: 'বছরে মাত্র ৪৩৬ টাকা প্রিমিয়ামে ২ লক্ষ টাকার জীবন বীমা কভারেজ।',
        stats: { label: '₹৪৩৬/বছরে জীবন বীমা', value: '₹২,০০,০০০' },
        features: [
          'যেকোনো কারণে মৃত্যু হলে ২ লক্ষ টাকার জীবন বীমা সুবিধা',
          'ব্যাংক অ্যাকাউন্ট থেকে অটো-ডেবিট প্রক্রিয়ায় বার্ষিক ৪৩৬ টাকা প্রিমিয়াম',
          'কোনো শারীরিক পরীক্ষা ছাড়াই সহজ এনরোলমেন্ট পদ্ধতি',
          '১ জুন থেকে ৩১ মে পর্যন্ত ১ বছরের জন্য নবায়নযোগ্য বীমা'
        ],
        eligibility: 'অটো-ডেবিটের সম্মতি সহ ব্যাংক অ্যাকাউন্ট থাকা ১৮ থেকে ৫০ বছর বয়সী ব্যক্তি।',
        documents: ['আধার কার্ড', 'ব্যাংক অ্যাকাউন্ট সম্মতিপত্র', 'নমিনি কেওয়াইসি (KYC) তথ্য'],
        dbtEnabled: true
      },
      {
        id: 'pmsby',
        category: 'SOCIAL_SECURITY',
        title: 'পিএম সুরক্ষা বীমা যোজনা (PMSBY)',
        subTitle: 'দুর্ঘটনাজনিত মৃত্যু ও প্রতিবন্ধকতার বীমা',
        tag: 'দুর্ঘটনা বীমা',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        shortDesc: 'বছরে মাত্র ২০ টাকা প্রিমিয়ামে ২ লক্ষ টাকার সুবিধা সহ অত্যন্ত সাশ্রয়ী দুর্ঘটনা বীমা।',
        stats: { label: 'বার্ষিক প্রিমিয়াম', value: '₹২০ / বছর' },
        features: [
          'দুর্ঘটনায় মৃত্যু বা পূর্ণ পঙ্গুত্বের ক্ষেত্রে ২ লক্ষ টাকার কভারেজ',
          'আংশিক স্থায়ী পঙ্গুত্বের জন্য ১ লক্ষ টাকার কভারেজ',
          'মে মাসে ব্যাংক অ্যাকাউন্ট থেকে স্বয়ংসক্রিয়ভাবে মাত্র ২০ টাকা প্রিমিয়াম কাটা',
          'নমিনীর অ্যাকাউন্টে সরাসরি ক্লেইম নিষ্পত্তির সুবিধা'
        ],
        eligibility: 'সক্রিয় সঞ্চয় ব্যাংক অ্যাকাউন্ট থাকা ১৮ থেকে ৭০ বছর বয়সী ব্যক্তি।',
        documents: ['আধার কার্ড', 'সঞ্চয় ব্যাংক অ্যাকাউন্ট', 'নমিনি ফর্ম'],
        dbtEnabled: true
      },
      {
        id: 'apy',
        category: 'SOCIAL_SECURITY',
        title: 'অটল পেনশন যোজনা (APY)',
        subTitle: 'অসংগঠিত ক্ষেত্রের জন্য নিশ্চিত পেনশন',
        tag: 'অবসর পেনশন',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        shortDesc: '৬০ বছর বয়সের পর মাসে ১,০০০ থেকে ৫,০০০ টাকা পর্যন্ত গ্যারান্টিযুক্ত পেনশন।',
        stats: { label: 'মাসিক পেনশন', value: '₹৫,০০০ পর্যন্ত' },
        features: [
          'নিশ্চিত মাসিক পেনশন বিকল্প: ১,০০০/-, ২,০০০/-, ৩,০০০/-, ৪,০০০/- বা ৫,০০০/- টাকা',
          'যোগ্য গ্রাহকদের জন্য সরকারি সহ-অনুদানের সুবিধা',
          'গ্রাহকের মৃত্যুর পর স্ত্রী/স্বামী আজীবন সমপরিমাণ পেনশন পাবেন',
          'উভয়ের মৃত্যুর পর জমাকৃত সম্পূর্ণ অর্থ নমিনিকে ফেরত প্রদান'
        ],
        eligibility: 'ব্যাংক অ্যাকাউন্ট থাকা ১৮ থেকে ৪০ বছর বয়সী অসংগঠিত ক্ষেত্রের শ্রমিকরা।',
        documents: ['আধার কার্ড', 'সক্রিয় সঞ্চয় অ্যাকাউন্ট নম্বর', 'মোবাইল নম্বর'],
        dbtEnabled: true
      },
      {
        id: 'mudra',
        category: 'ENTERPRISE',
        title: 'প্রধানমন্ত্রী মুদ্রা যোজনা (PMMY)',
        subTitle: 'ক্ষুদ্র ব্যবসা ও উদ্যোক্তাদের জন্য ঋণ',
        tag: 'ব্যবসা বৃদ্ধি',
        image: 'https://images.unsplash.com/photo-1617058862325-11585be7d4df?auto=format&fit=crop&q=80&w=800',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
        shortDesc: 'স্বনির্ভরতা বাড়াতে শিশু, কিশোর ও তরুণ বিভাগের অধীনে ১০ লক্ষ টাকা পর্যন্ত জামানতহীন ঋণ।',
        stats: { label: 'জামানতহীন ঋণ', value: '₹১০ লক্ষ পর্যন্ত' },
        features: [
          'শিশু: নতুন ব্যবসার জন্য ৫০,০০০ টাকা পর্যন্ত ঋণ',
          'কিশোর: ৫০,০০০ টাকা থেকে ৫ লক্ষ টাকা পর্যন্ত ঋণ',
          'তরুণ: ব্যবসা সম্প্রসারণের জন্য ৫ লক্ষ থেকে ১০ লক্ষ টাকা পর্যন্ত ঋণ',
          'কোনো সম্পত্তি বন্ধক বা গ্যারান্টারের প্রয়োজন নেই'
        ],
        eligibility: 'ক্ষুদ্র উদ্যোক্তা, দোকানদার, কারিগর এবং স্বনির্ভর গোষ্ঠীর সদস্যরা।',
        documents: ['ব্যবসার পরিচয়পত্র', 'ব্যবসার ঠিকানার প্রমাণ', 'প্রকল্প রিপোর্ট / বিজনেস প্ল্যান', 'ব্যাংক স্টেটমেন্ট'],
        dbtEnabled: false
      }
    ] as Scheme[]
  }
} as const;

@Component({
  selector: 'app-financial-inclusion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-inclusion.html',
  styleUrl: './financial-inclusion.css',
})
export class FinancialInclusionComponent {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;

  // Selected Category Filter
  activeCategory = signal<SchemeCategory>('ALL');

  // Selected Scheme for Modal View
  selectedScheme = signal<Scheme | null>(null);

  // Compute Active Language Dictionary
  t = computed(() => SCHEMES_TRANSLATIONS[this.currentLang()]);

  // Compute Filtered Scheme List based on selected category tab
  filteredSchemes = computed(() => {
    const list = this.t().SCHEMES;
    const cat = this.activeCategory();
    if (cat === 'ALL') return list;
    return list.filter(item => item.category === cat);
  });

  setCategory(cat: SchemeCategory): void {
    this.activeCategory.set(cat);
  }

  openSchemeModal(scheme: Scheme): void {
    this.selectedScheme.set(scheme);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedScheme.set(null);
    document.body.style.overflow = 'auto';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedScheme()) {
      this.closeModal();
    }
  }
}
