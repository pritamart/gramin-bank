
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language';

export interface RegulatoryNotice {
  id: string;
  refNo: string;
  category: 'financials' | 'disclosures' | 'tenders' | 'governance';
  categoryLabel: string;
  title: string;
  summary: string;
  publishDate: string;
  fileSize: string;
  isImportant?: boolean;
}

const REGULATORY_NOTICES_TRANSLATIONS = {
  en: {
    SECTION_TAG: 'Compliance & Transparency',
    SECTION_TITLE: 'Corporate & Regulatory Notices',
    SECTION_SUBTITLE: 'Official public disclosures, board meeting outcomes, quarterly financial statements, and regulatory statutory filings.',

    // Filter Tabs
    TAB_ALL: 'All Filings',
    TAB_FINANCIALS: 'Financial Results',
    TAB_DISCLOSURES: 'SEBI / RBI Disclosures',
    TAB_TENDERS: 'Tenders & Procurement',
    TAB_GOVERNANCE: 'Governance & AGMs',

    // Card Actions
    DOWNLOAD_PDF: 'Download PDF',
    REF_NO: 'Ref No:',
    PUBLISHED_ON: 'Published:',
    IMPORTANT_BADGE: 'Mandatory Disclosure',

    // Search & Counter
    SHOWING_TEXT: 'Showing statutory filings for active category',
    INVESTOR_DESK_TITLE: 'Need Investor Relations Assistance?',
    INVESTOR_DESK_SUB: 'Reach out to our Nodal Officer for investor grievances or statutory clarification.',
    CONTACT_IR_BTN: 'Contact Investor Relations Cell',

    NOTICES: [
      {
        id: 'n-01',
        refNo: 'REG/SEBI/2026/Q1-09',
        category: 'financials',
        categoryLabel: 'Financial Results',
        title: 'Audited Financial Results for Q1 FY 2026-27 & Limited Review Report',
        summary: 'Submission of standalone and consolidated audited financial statements approved at the Board Meeting.',
        publishDate: '15 Jul 2026',
        fileSize: '2.4 MB',
        isImportant: true
      },
      {
        id: 'n-02',
        refNo: 'RBI/NOTIFICATION/2026/412',
        category: 'disclosures',
        categoryLabel: 'SEBI / RBI Disclosures',
        title: 'Disclosure under Regulation 30: Re-appointment of Independent Directors',
        summary: 'Official notification regarding the re-appointment of Independent Directors approved by the Nomination Committee.',
        publishDate: '02 Jul 2026',
        fileSize: '1.1 MB',
        isImportant: false
      },
      {
        id: 'n-03',
        refNo: 'TND/PROC/2026/883',
        category: 'tenders',
        categoryLabel: 'Tenders & Procurement',
        title: 'Notice Inviting Tender (NIT): Core Banking Infrastructure Upgradation',
        summary: 'RFP for procurement of high-availability server racks, SAN storage, and enterprise cybersecurity firewall modules.',
        publishDate: '28 Jun 2026',
        fileSize: '4.8 MB',
        isImportant: true
      },
      {
        id: 'n-04',
        refNo: 'GOV/AGM/2026/NOTICE-12',
        category: 'governance',
        categoryLabel: 'Governance & AGMs',
        title: 'Notice of 22nd Annual General Meeting (AGM) & E-Voting Instructions',
        summary: 'Details regarding the upcoming Virtual AGM, remote e-voting timelines, and dividend payment record dates.',
        publishDate: '18 Jun 2026',
        fileSize: '3.2 MB',
        isImportant: false
      },
      {
        id: 'n-05',
        refNo: 'REG/BASEL-III/2026/CR-04',
        category: 'disclosures',
        categoryLabel: 'SEBI / RBI Disclosures',
        title: 'Pillar 3 Disclosures under Basel III Capital Regulations - June 2026',
        summary: 'Comprehensive report covering Capital Adequacy Ratio (CAR), risk exposure, and liquidity coverage details.',
        publishDate: '10 Jun 2026',
        fileSize: '1.9 MB',
        isImportant: false
      },
      {
        id: 'n-06',
        refNo: 'FIN/DIVIDEND/2026/INT-01',
        category: 'financials',
        categoryLabel: 'Financial Results',
        title: 'Declaration of Interim Dividend & Fixation of Record Date',
        summary: 'Board approval for ₹2.50 per equity share interim dividend with record date details for eligible shareholders.',
        publishDate: '01 Jun 2026',
        fileSize: '850 KB',
        isImportant: true
      }
    ] as RegulatoryNotice[]
  },

  hi: {
    SECTION_TAG: 'अनुपालन एवं पारदर्शिता',
    SECTION_TITLE: 'कॉर्पोरेट एवं नियामक सूचनाएं',
    SECTION_SUBTITLE: 'आधिकारिक सार्वजनिक प्रकटीकरण, बोर्ड बैठक के परिणाम, तिमाही वित्तीय विवरण और वैधानिक फाइलिंग।',

    TAB_ALL: 'सभी फाइलिंग',
    TAB_FINANCIALS: 'वित्तीय परिणाम',
    TAB_DISCLOSURES: 'सेबी / आरबीआई प्रकटीकरण',
    TAB_TENDERS: 'निविदा एवं खरीद',
    TAB_GOVERNANCE: 'गवर्नेंस एवं एजीएम',

    DOWNLOAD_PDF: 'पीडीएफ डाउनलोड करें',
    REF_NO: 'संदर्भ संख्या:',
    PUBLISHED_ON: 'प्रकाशित:',
    IMPORTANT_BADGE: 'अनिवार्य प्रकटीकरण',

    SHOWING_TEXT: 'सक्रिय श्रेणी के लिए वैधानिक फाइलिंग दिखाई जा रही है',
    INVESTOR_DESK_TITLE: 'क्या आपको निवेशक संबंध सहायता की आवश्यकता है?',
    INVESTOR_DESK_SUB: 'निवेशक शिकायतों या वैधानिक स्पष्टीकरण के लिए हमारे नोडल अधिकारी से संपर्क करें।',
    CONTACT_IR_BTN: 'निवेशक संबंध सेल से संपर्क करें',

    NOTICES: [
      {
        id: 'n-01',
        refNo: 'REG/SEBI/2026/Q1-09',
        category: 'financials',
        categoryLabel: 'वित्तीय परिणाम',
        title: 'Q1 FY 2026-27 के लिए लेखापरीक्षित वित्तीय परिणाम और सीमित समीक्षा रिपोर्ट',
        summary: 'बोर्ड बैठक में स्वीकृत एकल एवं समेकित लेखापरीक्षित वित्तीय विवरणों को प्रस्तुत करना।',
        publishDate: '15 जुलाई 2026',
        fileSize: '2.4 MB',
        isImportant: true
      },
      {
        id: 'n-02',
        refNo: 'RBI/NOTIFICATION/2026/412',
        category: 'disclosures',
        categoryLabel: 'सेबी / आरबीआई प्रकटीकरण',
        title: 'विनियम 30 के तहत प्रकटीकरण: स्वतंत्र निदेशकों की पुनर्नियुक्ति',
        summary: 'नामांकन समिति द्वारा स्वीकृत स्वतंत्र निदेशकों की पुनर्नियुक्ति के संबंध में आधिकारिक अधिसूचना।',
        publishDate: '02 जुलाई 2026',
        fileSize: '1.1 MB',
        isImportant: false
      },
      {
        id: 'n-03',
        refNo: 'TND/PROC/2026/883',
        category: 'tenders',
        categoryLabel: 'निविदा एवं खरीद',
        title: 'निविदा आमंत्रण सूचना (NIT): कोर बैंकिंग इंफ्रास्ट्रक्चर अपग्रेडेशन',
        summary: 'उच्च-उपलब्धता सर्वर रैक, सैन स्टोरेज और साइबर सुरक्षा फ़ायरवॉल मॉड्यूल की खरीद हेतु आरएफपी।',
        publishDate: '28 जून 2026',
        fileSize: '4.8 MB',
        isImportant: true
      },
      {
        id: 'n-04',
        refNo: 'GOV/AGM/2026/NOTICE-12',
        category: 'governance',
        categoryLabel: 'गवर्नेंस एवं एजीएम',
        title: '22वीं वार्षिक साधारण सभा (AGM) की सूचना एवं ई-वोटिंग निर्देश',
        summary: 'आगामी वर्चुअल एजीएम, रिमोट ई-वोटिंग समयसीमा और लाभांश भुगतान रिकॉर्ड तिथियों का विवरण।',
        publishDate: '18 जून 2026',
        fileSize: '3.2 MB',
        isImportant: false
      },
      {
        id: 'n-05',
        refNo: 'REG/BASEL-III/2026/CR-04',
        category: 'disclosures',
        categoryLabel: 'सेबी / आरबीआई प्रकटीकरण',
        title: 'बासेल III पूंजी विनियमों के तहत पिलर 3 प्रकटीकरण - जून 2026',
        summary: 'पूंजी पर्याप्तता अनुपात (CAR), जोखिम जोखिम और तरलता कवरेज विवरण को कवर करने वाली व्यापक रिपोर्ट।',
        publishDate: '10 जून 2026',
        fileSize: '1.9 MB',
        isImportant: false
      },
      {
        id: 'n-06',
        refNo: 'FIN/DIVIDEND/2026/INT-01',
        category: 'financials',
        categoryLabel: 'वित्तीय परिणाम',
        title: 'अंतरिम लाभांश की घोषणा एवं रिकॉर्ड तिथि का निर्धारण',
        summary: 'पात्र शेयरधारकों के लिए रिकॉर्ड तिथि विवरण के साथ ₹2.50 प्रति इक्विटी शेयर अंतरिम लाभांश की मंजूरी।',
        publishDate: '01 जून 2026',
        fileSize: '850 KB',
        isImportant: true
      }
    ] as RegulatoryNotice[]
  },

  bn: {
    SECTION_TAG: 'অনুসরণ ও স্বচ্ছতা',
    SECTION_TITLE: 'করপোরেট ও রেগুলেটরি নোটিশ',
    SECTION_SUBTITLE: 'অফিসিয়াল পাবলিক ডিসক্লোজার, বোর্ড মিটিং সিদ্ধান্ত, ত্রৈমাসিক আর্থিক বিবরণী এবং সংবিধিবদ্ধ রেগুলেটরি ফাইলিং।',

    TAB_ALL: 'সমস্ত ফাইলিং',
    TAB_FINANCIALS: 'আর্থিক ফলাফল',
    TAB_DISCLOSURES: 'সেবি / আরবিআই ডিসক্লোজার',
    TAB_TENDERS: 'টেন্ডার ও সংগ্রহ',
    TAB_GOVERNANCE: 'গভর্নেন্স ও এজিএম',

    DOWNLOAD_PDF: 'পিডিএফ ডাউনলোড করুন',
    REF_NO: 'রেফারেন্স নম্বর:',
    PUBLISHED_ON: 'প্রকাশিত:',
    IMPORTANT_BADGE: 'বাধ্যতামূলক প্রকাশনা',

    SHOWING_TEXT: 'সক্রিয় বিভাগের জন্য সংবিধিবদ্ধ ফাইলিং প্রদর্শিত হচ্ছে',
    INVESTOR_DESK_TITLE: 'বিনিয়োগকারী সহায়তা প্রয়োজন?',
    INVESTOR_DESK_SUB: 'যেকোনো অনুসন্ধানের জন্য আমাদের নোডাল অফিসারের সাথে যোগাযোগ করুন।',
    CONTACT_IR_BTN: 'ইনভেস্টর রিলেশনস সেলে যোগাযোগ করুন',

    NOTICES: [
      {
        id: 'n-01',
        refNo: 'REG/SEBI/2026/Q1-09',
        category: 'financials',
        categoryLabel: 'আর্থিক ফলাফল',
        title: 'Q1 FY 2026-27 এর নিরীক্ষিত আর্থিক ফলাফল ও লিমিটেড রিভিউ রিপোর্ট',
        summary: 'বোর্ড সভায় অনুমোদিত একক এবং একত্রিত নিরীক্ষিত আর্থিক বিবরণী পেশ।',
        publishDate: '১৫ জুলাই ২০২৬',
        fileSize: '২.৪ MB',
        isImportant: true
      },
      {
        id: 'n-02',
        refNo: 'RBI/NOTIFICATION/2026/412',
        category: 'disclosures',
        categoryLabel: 'সেবি / আরবিআই ডিসক্লোজার',
        title: 'রেগুলেশন ৩০ এর অধীনে তথ্য প্রকাশ: স্বাধীন পরিচালকদের পুনর্নিয়োগ',
        summary: 'মনোনয়ন কমিটি কর্তৃক অনুমোদিত স্বাধীন পরিচালকদের পুনর্নিয়োগ সংক্রান্ত বিজ্ঞপ্তি।',
        publishDate: '০২ জুলাই ২০২৬',
        fileSize: '১.১ MB',
        isImportant: false
      },
      {
        id: 'n-03',
        refNo: 'TND/PROC/2026/883',
        category: 'tenders',
        categoryLabel: 'টেন্ডার ও সংগ্রহ',
        title: 'টেন্ডার বিজ্ঞপ্তি (NIT): কোর ব্যাংকিং পরিকাঠামো আপগ্রেডেশন',
        summary: 'হাই-অ্যাভেলেবিলিটি সার্ভার র‍্যাক, স্যাণ স্টোরেজ এবং ফায়ারওয়াল মডিউল সংগ্রহের বিজ্ঞপ্তি।',
        publishDate: '২৮ জুন ২০২৬',
        fileSize: '৪.৮ MB',
        isImportant: true
      },
      {
        id: 'n-04',
        refNo: 'GOV/AGM/2026/NOTICE-12',
        category: 'governance',
        categoryLabel: 'গভর্নেন্স ও এজিএম',
        title: '২২তম বার্ষিক সাধারণ সভা (AGM) এর বিজ্ঞপ্তি এবং ই-ভোটিং নির্দেশাবলী',
        summary: 'আসন্ন ভার্চুয়াল এজিএম, রিমোট ই-ভোটিং সময়সূচী এবং লভ্যাংশ প্রদানের তথ্য।',
        publishDate: '১৮ জুন ২০২৬',
        fileSize: '৩.২ MB',
        isImportant: false
      },
      {
        id: 'n-05',
        refNo: 'REG/BASEL-III/2026/CR-04',
        category: 'disclosures',
        categoryLabel: 'সেবি / আরবিআই ডিসক্লোজার',
        title: 'বাসেল III ক্যাপিটাল রেগুলেশনের অধীনে পিলার ৩ ডিসক্লোজার - জুন ২০২৬',
        summary: 'ক্যাপিটাল অ্যাডিকোয়েসি রেশিও (CAR) এবং লিকুইডিটি সংক্রান্ত বিস্তারিত রিপোর্ট।',
        publishDate: '১০ জুন ২০২৬',
        fileSize: '১.৯ MB',
        isImportant: false
      },
      {
        id: 'n-06',
        refNo: 'FIN/DIVIDEND/2026/INT-01',
        category: 'financials',
        categoryLabel: 'আর্থিক ফলাফল',
        title: 'অন্তর্বর্তীকালীন লভ্যাংশ ঘোষণা এবং রেকর্ড তারিখ নির্ধারণ',
        summary: 'শেয়ার প্রতি ২.৫০ টাকা অন্তর্বর্তী লভ্যাংশের বোর্ড অনুমোদন ও রেকর্ড তারিখ।',
        publishDate: '০১ জুন ২০২৬',
        fileSize: '৮৫০ KB',
        isImportant: true
      }
    ] as RegulatoryNotice[]
  }
} as const;

@Component({
  selector: 'app-corporate-regulatory-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corporate-regulatory-notices.html',
  styleUrl: './corporate-regulatory-notices.css',
})
export class CorporateRegulatoryNoticesComponent {
  private langService = inject(LanguageService);
  currentLang = this.langService.currentLang;

  // Selected Category Signal
  selectedCategory = signal<string>('all');

  // Translation Object computed signal
  t = computed(() => REGULATORY_NOTICES_TRANSLATIONS[this.currentLang()]);

  // Filtered Notices list
  filteredNotices = computed(() => {
    const category = this.selectedCategory();
    const notices = this.t().NOTICES;
    if (category === 'all') {
      return notices;
    }
    return notices.filter(item => item.category === category);
  });

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  downloadNotice(notice: RegulatoryNotice): void {
    // Implement PDF download / view logic
    console.log(`Downloading notice PDF: ${notice.refNo}`);
  }
}
