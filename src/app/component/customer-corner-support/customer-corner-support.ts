import { Component, computed, inject, signal, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

export interface SupportChannel {
  id: string;
  title: string;
  subtitle: string;
  actionText: string;
  iconBg: string;
  badge: string;
  contactValue: string;
  type: 'phone' | 'whatsapp' | 'email' | 'link';
}

export interface CarouselServiceCard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
  tagColor: string;
  linkText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

const CUSTOMER_SUPPORT_TRANSLATIONS = {
  en: {
    SECTION_TAG: '24/7 Customer Assistance & Care',
    SECTION_TITLE: 'Customer Corner & Support Services',
    SECTION_SUBTITLE: 'We are here to serve you. Access round-the-clock banking help, quick digital tools, doorstep assistance, and official grievance escalation channels.',

    // Quick Support Channels
    CHANNELS_TITLE: 'Immediate Contact Channels',
    TOLL_FREE: 'Toll-Free Hotline',
    TOLL_FREE_SUB: 'Available 24x7 across India',
    WHATSAPP: 'WhatsApp Banking',
    WHATSAPP_SUB: 'Instant balance & micro-services',
    CYBER_HEPLINE: 'Cyber Fraud Alert',
    CYBER_SUB: 'Report unauthorized transactions within 2 hrs',
    EMAIL_SUPPORT: 'Official Care Email',
    EMAIL_SUB: 'Response within 24 working hours',

    // Carousel Header
    CAROUSEL_TITLE: 'Self-Service Corner & Special Desks',
    CAROUSEL_SUBTITLE: 'Explore specialized customer services, senior citizen desks, and digital banking assistance.',
    CAROUSEL_PREV: 'Previous',
    CAROUSEL_NEXT: 'Next',

    // Grievance Matrix
    GRIEVANCE_TAG: 'Transparency & Resolution',
    GRIEVANCE_TITLE: '3-Tier Grievance Redressal Matrix',
    STEP_1_TITLE: 'Level 1: Customer Care Desk',
    STEP_1_DESC: 'Log your complaint via helpline, branch office, or web portal to receive an instant Ticket Reference Number.',
    STEP_1_TAT: 'Turnaround: 3 to 7 Days',

    STEP_2_TITLE: 'Level 2: Principal Nodal Officer',
    STEP_2_DESC: 'If unsatisfied with Level 1 response, escalate directly to the Regional Grievance Nodal Officer.',
    STEP_2_TAT: 'Turnaround: 7 to 10 Days',

    STEP_3_TITLE: 'Level 3: RBI Banking Ombudsman',
    STEP_3_DESC: 'If unresolved within 30 days, approach the Reserve Bank of India Integrated Ombudsman Scheme portal.',
    STEP_3_TAT: 'Statutory Redressal Scheme',

    // FAQ Section
    FAQ_TITLE: 'Frequently Asked Questions',
    FAQ_SUBTITLE: 'Find quick answers to common queries regarding accounts, digital services, and security.',

    // Carousel Cards Data
    SERVICES: [
      {
        id: 'doorstep',
        title: 'Doorstep Banking for Senior Citizens',
        category: 'Elderly & Differently Abled',
        description: 'Cash pick-up, life certificate submission, and cheque collection right at your home doorstep.',
        image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
        tag: 'Home Service',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        linkText: 'Book Doorstep Visit'
      },
      {
        id: 'cyber-safety',
        title: 'Instant Card Block & Cyber Safety',
        category: 'Security First',
        description: 'Block compromised debit/credit cards or freeze UPI immediately in case of lost phone or fraud.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        tag: 'Emergency Action',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
        linkText: 'Block Card Instantly'
      },
      {
        id: 'video-kyc',
        title: 'Remote Video KYC Desk',
        category: 'Digital Onboarding',
        description: 'Complete your full KYC re-verification or account update within 5 minutes over a video call.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        tag: 'Paperless',
        tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
        linkText: 'Start Video KYC'
      },
      {
        id: 'whatsapp-assist',
        title: 'WhatsApp Self-Care Bot',
        category: 'Chat Banking',
        description: 'Check mini statements, download interest certificates, and apply for cheque books via official WhatsApp.',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800',
        tag: '24/7 Available',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        linkText: 'Start WhatsApp Chat'
      },
      {
        id: 'nri-desk',
        title: 'Dedicated NRI Support Cell',
        category: 'Global Banking',
        description: 'Specialized assistance for NRE/NRO accounts, inward remittances, and tax advisory services.',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
        tag: 'Specialized Desk',
        tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
        linkText: 'Connect NRI Cell'
      },
      {
        id: 'locators',
        title: 'Smart Branch & ATM Finder',
        category: 'Physical Touchpoints',
        description: 'Locate nearby cash-deposit machines (BNA), eco-friendly green branches, and wheelchair-accessible ATMs.',
        image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=800',
        tag: 'GPS Enabled',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
        linkText: 'Find Nearest Branch'
      }
    ] as CarouselServiceCard[],

    FAQS: [
      {
        question: 'What should I do immediately if I suspect fraudulent activity on my account?',
        answer: 'Call national Cyber Helpline 1930 or our 24/7 emergency toll-free number immediately. You can also block your debit card instantly using mobile banking, WhatsApp banking, or the card safety tile above.'
      },
      {
        question: 'How can senior citizens request doorstep banking services?',
        answer: 'Senior citizens aged 70+ and differently-abled individuals can schedule doorstep visits through our mobile app, by calling our toll-free support, or visiting their home branch.'
      },
      {
        question: 'How do I escalate an unresolved complaint?',
        answer: 'If your complaint is not resolved within 7 days by Customer Care, quote your ticket reference number to our Regional Nodal Officer. If unresolved for 30 days, you can lodge a grievance with the RBI Banking Ombudsman.'
      },
      {
        question: 'Is WhatsApp Banking secure for sensitive transactions?',
        answer: 'Yes, WhatsApp Banking uses end-to-end encryption. For financial transfers, double-factor authentication with OTP or secure PIN is mandatory.'
      }
    ] as FaqItem[]
  },

  hi: {
    SECTION_TAG: '24/7 ग्राहक सहायता एवं सेवा',
    SECTION_TITLE: 'ग्राहक कॉर्नर एवं सहायता सेवाएं',
    SECTION_SUBTITLE: 'हम आपकी सेवा के लिए तत्पर हैं। 24 घंटे बैंकिंग सहायता, त्वरित डिजिटल टूल, डोरस्टेप सहायता और शिकायत निवारण चैनलों का लाभ उठाएं।',

    CHANNELS_TITLE: 'तत्काल संपर्क चैनल',
    TOLL_FREE: 'टोल-फ्री हेल्पलाइन',
    TOLL_FREE_SUB: 'पूरे भारत में 24x7 उपलब्ध',
    WHATSAPP: 'व्हाट्सएप बैंकिंग',
    WHATSAPP_SUB: 'त्वरित बैलेंस एवं सूक्ष्म सेवाएं',
    CYBER_HEPLINE: 'साइबर धोखाधड़ी अलर्ट',
    CYBER_SUB: '2 घंटे के भीतर संदिग्ध लेनदेन की रिपोर्ट करें',
    EMAIL_SUPPORT: 'आधिकारिक केयर ईमेल',
    EMAIL_SUB: '24 कार्य घंटों में प्रतिक्रिया',

    CAROUSEL_TITLE: 'स्वयं-सेवा कॉर्नर एवं विशेष डेस्क',
    CAROUSEL_SUBTITLE: 'विशेष ग्राहक सेवाओं, वरिष्ठ नागरिक डेस्क और डिजिटल बैंकिंग सहायता का अन्वेषण करें।',
    CAROUSEL_PREV: 'पिछला',
    CAROUSEL_NEXT: 'अगला',

    GRIEVANCE_TAG: 'पारदर्शिता और समाधान',
    GRIEVANCE_TITLE: '3-स्तरीय शिकायत निवारण तंत्र',
    STEP_1_TITLE: 'स्तर 1: ग्राहक सेवा डेस्क',
    STEP_1_DESC: 'हेल्पलाइन, शाखा या वेब पोर्टल के माध्यम से शिकायत दर्ज करें और तुरंत टिकट नंबर प्राप्त करें।',
    STEP_1_TAT: 'समाधान समय: 3 से 7 दिन',

    STEP_2_TITLE: 'स्तर 2: प्रधान नोडल अधिकारी',
    STEP_2_DESC: 'यदि स्तर 1 के उत्तर से संतुष्ट न हों, तो सीधे क्षेत्रीय शिकायत नोडल अधिकारी को शिकायत भेजें।',
    STEP_2_TAT: 'समाधान समय: 7 से 10 दिन',

    STEP_3_TITLE: 'स्तर 3: आरबीआई बैंकिंग लोकपाल',
    STEP_3_DESC: 'यदि 30 दिनों में समाधान न हो, तो भारतीय रिजर्व बैंक की एकीकृत लोकपाल योजना में आवेदन करें।',
    STEP_3_TAT: 'वैधानिक समाधान योजना',

    FAQ_TITLE: 'अक्सर पूछे जाने वाले प्रश्न',
    FAQ_SUBTITLE: 'खाते, डिजिटल सेवाओं और सुरक्षा से जुड़े सामान्य प्रश्नों के त्वरित उत्तर प्राप्त करें।',

    SERVICES: [
      {
        id: 'doorstep',
        title: 'वरिष्ठ नागरिकों के लिए डोरस्टेप बैंकिंग',
        category: 'बुजुर्ग एवं विशेष योग्यजन',
        description: 'आपके घर के दरवाजे पर नकद पिक-अप, जीवन प्रमाण पत्र जमा और चेक संग्रह सुविधा।',
        image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
        tag: 'होम सर्विस',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        linkText: 'डोरस्टेप विजिट बुक करें'
      },
      {
        id: 'cyber-safety',
        title: 'त्वरित कार्ड ब्लॉक एवं साइबर सुरक्षा',
        category: 'सुरक्षा सर्वोपरि',
        description: 'फोन खोने या धोखाधड़ी की स्थिति में डेबिट/क्रेडिट कार्ड या यूपीआई तुरंत ब्लॉक करें।',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        tag: 'आपातकालीन कार्रवाई',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
        linkText: 'तुरंत कार्ड ब्लॉक करें'
      },
      {
        id: 'video-kyc',
        title: 'रिमोट वीडियो केवाईसी डेस्क',
        category: 'डिजिटल ऑनबोर्डिंग',
        description: 'वीडियो कॉल के माध्यम से 5 मिनट में अपना पूर्ण केवाईसी पुन: सत्यापन पूरा करें।',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        tag: 'कागज रहित',
        tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
        linkText: 'वीडियो केवाईसी शुरू करें'
      },
      {
        id: 'whatsapp-assist',
        title: 'व्हाट्सएप सेल्फ-केयर बॉट',
        category: 'चैट बैंकिंग',
        description: 'मिनी स्टेटमेंट देखें, ब्याज प्रमाण पत्र डाउनलोड करें और व्हाट्सएप पर चेकबुक ऑर्डर करें।',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800',
        tag: '24/7 उपलब्ध',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        linkText: 'व्हाट्सएप चैट शुरू करें'
      },
      {
        id: 'nri-desk',
        title: 'एनआरआई सहायता सेल',
        category: 'ग्लोबल बैंकिंग',
        description: 'NRE/NRO खातों, प्रेषण और कर परामर्श सेवाओं के लिए विशेष सहायता।',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
        tag: 'विशेषज्ञ डेस्क',
        tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
        linkText: 'एनआरआई सेल से जुड़ें'
      },
      {
        id: 'locators',
        title: 'स्मार्ट शाखा एवं एटीएम खोजें',
        category: 'भौतिक केंद्र',
        description: 'निकटतम नकद जमा मशीन (BNA), हरित शाखाएं और व्हीलचेयर सुलभ एटीएम खोजें।',
        image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=800',
        tag: 'जीपीएस सक्षम',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
        linkText: 'निकटतम शाखा खोजें'
      }
    ] as CarouselServiceCard[],

    FAQS: [
      {
        question: 'यदि खाते में संदिग्ध गतिविधि का संदेह हो तो तुरंत क्या करें?',
        answer: 'राष्ट्रीय साइबर हेल्पलाइन 1930 या हमारे 24/7 आपातकालीन टोल-फ्री नंबर पर तुरंत कॉल करें। आप मोबाइल बैंकिंग या व्हाट्सएप से भी कार्ड ब्लॉक कर सकते हैं।'
      },
      {
        question: 'वरिष्ठ नागरिक डोरस्टेप बैंकिंग का अनुरोध कैसे कर सकते हैं?',
        answer: '70+ वर्ष के वरिष्ठ नागरिक और दिव्यांग व्यक्ति मोबाइल ऐप, टोल-फ्री नंबर या होम ब्रांच के माध्यम से डोरस्टेप सेवाओं का अनुरोध कर सकते हैं।'
      },
      {
        question: 'असुल्झी शिकायत को आगे कैसे बढ़ाएं (Escalate)?',
        answer: 'यदि 7 दिनों में शिकायत का समाधान न हो, तो टिकट नंबर के साथ नोडल अधिकारी से संपर्क करें। 30 दिनों में समाधान न होने पर आरबीआई लोकपाल पोर्टल पर जाएं।'
      },
      {
        question: 'क्या संवेदनशील लेनदेन के लिए व्हाट्सएप बैंकिंग सुरक्षित है?',
        answer: 'हां, व्हाट्सएप बैंकिंग एंड-टू-एंड एन्क्रिप्टेड है। वित्तीय लेनदेन के लिए ओटीपी या पिन द्वारा सत्यापन अनिवार्य है।'
      }
    ] as FaqItem[]
  },

  bn: {
    SECTION_TAG: '২৪/৭ গ্রাহক পরিষেবা ও সহায়তা',
    SECTION_TITLE: 'কাস্টমার কর্নার ও সাপোর্ট সার্ভিসেস',
    SECTION_SUBTITLE: 'আমরা আপনার সেবায় নিয়োজিত। সার্বক্ষণিক ব্যাংকিং সহায়তা, দ্রুত ডিজিটাল টুলস, ডোরস্টেপ পরিষেবা এবং অভিযোগ সমাধানের সুব্যবস্থা।',

    CHANNELS_TITLE: 'জরুরি যোগাযোগের মাধ্যম',
    TOLL_FREE: 'টোল-ফ্রি হেল্পলাইন',
    TOLL_FREE_SUB: 'সমগ্র ভারতে ২৪x৭ উপলব্ধ',
    WHATSAPP: 'হোয়াটসঅ্যাপ ব্যাংকিং',
    WHATSAPP_SUB: 'তাত্ক্ষণিক ব্যালেন্স ও মাইক্রো-সার্ভিস',
    CYBER_HEPLINE: 'সাইবার ফ্রড এলার্ট',
    CYBER_SUB: '২ ঘণ্টার মধ্যে সন্দেহজনক লেনদেনের রিপোর্ট করুন',
    EMAIL_SUPPORT: 'অফিসিয়াল কেয়ার ইমেল',
    EMAIL_SUB: '২৪ কার্যঘণ্টার মধ্যে উত্তর',

    CAROUSEL_TITLE: 'সেলফ-সার্ভিস কর্নার ও বিশেষ ডেস্ক',
    CAROUSEL_SUBTITLE: 'বিশেষায়িত গ্রাহক পরিষেবা, প্রবীণ নাগরিক ডেস্ক এবং ডিজিটাল ব্যাংকিং সহায়তার সুবিধা নিন।',
    CAROUSEL_PREV: 'পূর্ববর্তী',
    CAROUSEL_NEXT: 'পরবর্তী',

    GRIEVANCE_TAG: 'স্বচ্ছতা ও দ্রত সমাধান',
    GRIEVANCE_TITLE: '৩-স্তরের অভিযোগ সমাধান ব্যবস্থা',
    STEP_1_TITLE: 'স্তর ১: কাস্টমার কেয়ার ডেস্ক',
    STEP_1_DESC: 'হেল্পলাইন, শাখা বা ওয়েব পোর্টালের মাধ্যমে অভিযোগ জানান এবং সাথে সাথে টিকিট নম্বর পান।',
    STEP_1_TAT: 'সময়সীমা: ৩ থেকে ৭ দিন',

    STEP_2_TITLE: 'স্তর ২: প্রিন্সিপাল নোডাল অফিসার',
    STEP_2_DESC: 'প্রথম স্তরের উত্তরের সন্তুষ্ট না হলে আঞ্চলিক অভিযোগ নোডাল অফিসারের কাছে পাঠান।',
    STEP_2_TAT: 'সময়সীমা: ৭ থেকে ১০ দিন',

    STEP_3_TITLE: 'স্তর ৩: আরবিআই ব্যাংকিং ওম্বুডসম্যান',
    STEP_3_DESC: '৩০ দিনের মধ্যে সমাধান না হলে রিজার্ভ ব্যাংক অফ ইন্ডিয়ার ওম্বুডসম্যান পোর্টালে আবেদন করুন।',
    STEP_3_TAT: 'সংবিধিবদ্ধ সমাধান স্কিম',

    FAQ_TITLE: 'সাধারণ জিজ্ঞাস্য (FAQ)',
    FAQ_SUBTITLE: 'অ্যাকাউন্ট, ডিজিটাল পরিষেবা এবং নিরাপত্তা সংক্রান্ত সাধারণ প্রশ্নের উত্তর একনজরে দেখে নিন।',

    SERVICES: [
      {
        id: 'doorstep',
        title: 'প্রবীণ নাগরিকদের জন্য ডোরস্টেপ ব্যাংকিং',
        category: 'বয়স্ক ও বিশেষ ক্ষমতাসম্পন্ন',
        description: 'বাড়িতে বসেই নগদ জমা-তোলা, জীবন প্রমাণপত্র প্রদান এবং চেক সংগ্রহের সুবিধা।',
        image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
        tag: 'হোম সার্ভিস',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        linkText: 'ডোরস্টেপ সার্ভিস বুক করুন'
      },
      {
        id: 'cyber-safety',
        title: 'তাত্ক্ষণিক কার্ড ব্লক ও সাইবার নিরাপত্তা',
        category: 'সুরক্ষা প্রথম',
        description: 'ফোন হারালে বা প্রতারণার শিকার হলে ডেবিট/ক্রেডিট কার্ড বা ইউপিআই সাথে সাথে ব্লক করুন।',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        tag: 'জরুরি ব্যবস্থা',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
        linkText: 'কার্ড ব্লক করুন'
      },
      {
        id: 'video-kyc',
        title: 'রিমোট ভিডিও কেওয়াইসি ডেস্ক',
        category: 'ডিজিটাল অনবোর্ডিং',
        description: 'ভিডিও কলের মাধ্যমে মাত্র ৫ মিনিটে আপনার সম্পূর্ণ কেওয়াইসি (KYC) যাচাইকরণ সম্পন্ন করুন।',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        tag: 'কাগজবিহীন',
        tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
        linkText: 'ভিডিও কেওয়াইসি শুরু করুন'
      },
      {
        id: 'whatsapp-assist',
        title: 'হোয়াটসঅ্যাপ সেলফ-কেয়ার বট',
        category: 'চ্যাট ব্যাংকিং',
        description: 'মিনি স্টেটমেন্ট দেখুন, সুদের সার্টিফিকেট ডাউনলোড করুন এবং হোয়াটসঅ্যাপের মাধ্যমে চেক বই অর্ডার করুন।',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800',
        tag: '২৪/৭ উপলব্ধ',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        linkText: 'হোয়াটসঅ্যাপ চ্যাট শুরু করুন'
      },
      {
        id: 'nri-desk',
        title: 'এনআরআই স্পেশাল সহায়তা সেল',
        category: 'গ্লোবাল ব্যাংকিং',
        description: 'NRE/NRO অ্যাকাউন্ট, রেমিট্যান্স এবং ট্যাক্স পরামর্শ পরিষেবার জন্য বিশেষ সহায়তা।',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
        tag: 'বিশেষজ্ঞ ডেস্ক',
        tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
        linkText: 'এনআরআই সেলে যোগাযোগ করুন'
      },
      {
        id: 'locators',
        title: 'স্মার্ট শাখা ও এটিএম খুঁজুন',
        category: 'শারীরিক স্পর্শবিন্দু',
        description: 'নিকটতম ক্যাশ-ডিপোজিট মেসিন (BNA), গ্রীন ব্রাঞ্চ এবং হুইলচেয়ার বান্ধব এটিএম সন্ধান করুন।',
        image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=800',
        tag: 'জিপিএস সক্ষম',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
        linkText: 'নিকটতম শাখা খুঁজুন'
      }
    ] as CarouselServiceCard[],

    FAQS: [
      {
        question: 'অ্যাকাউন্টে কোনো সন্দেহজনক লেনদেন লক্ষ্য করলে সাথে সাথে কী করবেন?',
        answer: 'অবিলম্বে সাইবার হেল্পলাইন ১৯৩০ বা আমাদের ২৪/৭ জরুরি টোল-ফ্রি নম্বরে কল করুন। অথবা মোবাইল অ্যাপ বা হোয়াটসঅ্যাপ মারফত সাথে সাথে কার্ড ব্লক করুন।'
      },
      {
        question: 'প্রবীণ নাগরিকরা কীভাবে ডোরস্টেপ ব্যাংকিংয়ের জন্য আবেদন করবেন?',
        answer: '৭০ বছর বা তার বেশি বয়সী প্রবীণ নাগরিকরা মোবাইল অ্যাপ, টোল-ফ্রি নম্বর বা হোম ব্রাঞ্চে যোগাযোগ করে ডোরস্টেপ সার্ভিস বুক করতে পারেন।'
      },
      {
        question: 'অসমাধানকৃত অভিযোগ কীভাবে পরবর্তী স্তরে (Escalate) পাঠাবেন?',
        answer: '৭ দিনের মধ্যে সমাধান না হলে টিকিট নম্বর সহ নোডাল অফিসারের কাছে পাঠান। ৩০ দিনে সমাধান না হলে আরবিআই ওম্বুডসম্যান পোর্টালে আবেদন করুন।'
      },
      {
        question: 'হোয়াটসঅ্যাপ ব্যাংকিং কি সংবেদনশীল লেনদেনের জন্য নিরাপদ?',
        answer: 'হ্যাঁ, হোয়াটসঅ্যাপ ব্যাংকিং সম্পূর্ণ এনক্রিপ্টেড। সমস্ত আর্থিক লেনদেনের জন্য ওটিপি বা পিনের মাধ্যমে দুই-স্তরের নিরাপত্তা নিশ্চিত করা হয়।'
      }
    ] as FaqItem[]
  }
} as const;

@Component({
  selector: 'app-customer-corner-support',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-corner-support.html',
  styleUrl: './customer-corner-support.css',
})
export class CustomerCornerSupportComponent implements OnInit, OnDestroy {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;

  // Active FAQ accordion state
  activeFaqIndex = signal<number | null>(0);

  // Carousel Signals & Screen View States
  carouselIndex = signal<number>(0);
  visibleCardsCount = signal<number>(3); // Default desktop: 3 items

  // Touch Swipe Handling Variables
  private touchStartX = 0;
  private touchEndX = 0;
  private autoPlayTimer: any = null;

  // Translation Object computed signal
  t = computed(() => CUSTOMER_SUPPORT_TRANSLATIONS[this.currentLang()]);

  // Dynamic calculation for max carousel slides allowed
  maxCarouselIndex = computed(() => {
    const total = this.t().SERVICES.length;
    const visible = this.visibleCardsCount();
    return Math.max(0, total - visible);
  });

  // Calculate Percentage Shift for Carousel Container
  carouselTransform = computed(() => {
    const cardWidthPercentage = 100 / this.visibleCardsCount();
    return `translateX(-${this.carouselIndex() * cardWidthPercentage}%)`;
  });

  ngOnInit(): void {
    this.updateResponsiveLayout();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateResponsiveLayout();
  }

  private updateResponsiveLayout(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.visibleCardsCount.set(1); // Mobile View: 1 card
    } else if (width < 1024) {
      this.visibleCardsCount.set(2); // Tablet View: 2 cards
    } else {
      this.visibleCardsCount.set(3); // Desktop View: 3 cards
    }

    // Clamp current index if screen resize makes current index out of bounds
    if (this.carouselIndex() > this.maxCarouselIndex()) {
      this.carouselIndex.set(this.maxCarouselIndex());
    }
  }

  // Carousel Controls
  nextSlide(): void {
    if (this.carouselIndex() < this.maxCarouselIndex()) {
      this.carouselIndex.update(idx => idx + 1);
    } else {
      this.carouselIndex.set(0); // Loop back to start
    }
  }

  prevSlide(): void {
    if (this.carouselIndex() > 0) {
      this.carouselIndex.update(idx => idx - 1);
    } else {
      this.carouselIndex.set(this.maxCarouselIndex()); // Jump to end
    }
  }

  goToSlide(index: number): void {
    this.carouselIndex.set(Math.min(index, this.maxCarouselIndex()));
  }

  // Auto-play timer control
  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, 6000); // 6 seconds slide shift
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  // Touch Swipe Gesture for Mobile Views
  onTouchStart(event: TouchEvent): void {
    this.stopAutoPlay();
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
    this.startAutoPlay();
  }

  private handleSwipeGesture(): void {
    const swipeThreshold = 40;
    if (this.touchStartX - this.touchEndX > swipeThreshold) {
      this.nextSlide(); // Swipe Left -> Next
    } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
      this.prevSlide(); // Swipe Right -> Prev
    }
  }

  // Toggle FAQ Accordion
  toggleFaq(index: number): void {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }
}
