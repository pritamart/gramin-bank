import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class Seo {
  constructor(private titleService: Title, private metaService: Meta) {}

  updateSeoTags(title: string, description: string, keywords: string) {
    // Set the Page Title
    this.titleService.setTitle(title);

    // Update Meta Description
    this.metaService.updateTag({ name: 'description', content: description });

    // Update Meta Keywords
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    // Optional: Add Open Graph tags so links look good when shared on WhatsApp/LinkedIn
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
  }
}