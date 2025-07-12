import { Component, OnInit, OnDestroy } from '@angular/core';
import { Publication } from '../../models/lecturer.model';
import { Subscription, forkJoin } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-research',
  template: `
    <section class="section fade-in" id="research">
      <h2 class="section-title">Research & Publications</h2>
      <h3 class="research-subtitle">Research Focus Areas</h3>
      <div class="research-areas">
        <div
          class="research-area"
          *ngFor="let area of researchAreas; let i = index"
          [style.animation-delay]="i * 0.1 + 's'"
        >
          {{ area }}
        </div>
      </div>
      <div class="publications glass-card">
        <h3>Selected Publications</h3>
        <div
          class="publication-item"
          *ngFor="
            let publication of publications;
            trackBy: trackByPublication;
            let i = index
          "
          [style.animation-delay]="i * 0.1 + 's'"
        >
          <div class="publication-title">{{ publication.title }}</div>
          <div class="publication-details">
            <div class="journal-info">
              <em>{{ publication.journal }}</em> ({{ publication.year }}) |
              <span class="citations"
                >Citations: {{ publication.citations }}</span
              >
            </div>
            <div class="publication-actions" *ngIf="publication.link">
              <a
                [href]="getCleanLink(publication.link)"
                target="_blank"
                rel="noopener noreferrer"
                class="publication-link"
                (click)="trackLinkClick(publication.title)"
              >
                <span class="link-icon">🔗</span>
                View Publication
                <span class="external-icon">↗</span>
              </a>
              <button
                class="cite-button"
                (click)="copyCitation(publication)"
                title="Copy citation"
                type="button"
              >
                <span class="cite-icon">📋</span>
                Cite
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./research.component.scss'],
})
export class ResearchComponent implements OnInit, OnDestroy {
  researchAreas: string[] = [];
  publications: Publication[] = [];
  private subscription: Subscription = new Subscription();
  private intersectionObserver?: IntersectionObserver;

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadResearchData();
    // Delay observer setup to ensure DOM is ready
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // Clean up intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  trackByPublication(index: number, item: Publication): string {
    return `${item.title}-${item.year}`;
  }

  // Clean up malformed links
  getCleanLink(link: string): string {
    if (!link) return '';

    // Fix malformed links
    if (link.startsWith(': ')) {
      return 'https://doi.org/' + link.substring(2);
    }

    // Ensure https protocol
    if (link.startsWith('http://dx.doi.org/')) {
      return link.replace('http://dx.doi.org/', 'https://doi.org/');
    }

    return link;
  }

  // Track link clicks for analytics
  trackLinkClick(publicationTitle: string) {
    console.log('Publication link clicked:', publicationTitle);
    // Add analytics tracking here if needed
  }

  // Copy citation to clipboard with better error handling
  async copyCitation(publication: Publication) {
    const citation = this.formatCitation(publication);
    console.log('Attempting to copy citation:', citation);

    try {
      // Check if clipboard API is available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation);
        this.showCopySuccessMessage();
        console.log('Citation copied successfully using Clipboard API');
      } else {
        // Fallback for older browsers or non-secure contexts
        this.fallbackCopyTextToClipboard(citation);
      }
    } catch (err) {
      console.error('Clipboard API failed, trying fallback:', err);
      this.fallbackCopyTextToClipboard(citation);
    }
  }

  // Format citation in APA style
  private formatCitation(publication: Publication): string {
    const year = publication.year;
    const title = publication.title;
    const journal = publication.journal;
    const cleanLink = this.getCleanLink(publication.link || '');

    // Enhanced APA format
    let citation = `Masai, R. J. (${year}). ${title}. *${journal}*.`;

    if (cleanLink) {
      citation += ` Retrieved from ${cleanLink}`;
    }

    return citation;
  }

  // Improved fallback copy method
  private fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Make the textarea invisible but functional
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';

    document.body.appendChild(textArea);

    try {
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length); // For mobile

      const successful = document.execCommand('copy');
      if (successful) {
        this.showCopySuccessMessage();
        console.log('Citation copied successfully using fallback method');
      } else {
        throw new Error('execCommand copy failed');
      }
    } catch (err) {
      console.error('Fallback copy method failed:', err);
      this.showCopyErrorMessage();
    } finally {
      document.body.removeChild(textArea);
    }
  }

  // Show success message with better styling
  private showCopySuccessMessage(): void {
    // Remove any existing toasts
    this.removeExistingToasts();

    const toast = document.createElement('div');
    toast.className = 'copy-success-toast';
    toast.innerHTML = `
      <span class="toast-icon">✅</span>
      Citation copied to clipboard!
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Remove after delay
    setTimeout(() => {
      this.removeToast(toast);
    }, 3000);
  }

  // Show error message
  private showCopyErrorMessage(): void {
    this.removeExistingToasts();

    const toast = document.createElement('div');
    toast.className = 'copy-error-toast';
    toast.innerHTML = `
      <span class="toast-icon">❌</span>
      Failed to copy citation. Please try again.
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      this.removeToast(toast);
    }, 3000);
  }

  // Remove existing toasts to prevent stacking
  private removeExistingToasts(): void {
    const existingToasts = document.querySelectorAll(
      '.copy-success-toast, .copy-error-toast'
    );
    existingToasts.forEach((toast) => {
      this.removeToast(toast as HTMLElement);
    });
  }

  // Remove toast with animation
  private removeToast(toast: HTMLElement): void {
    if (toast && document.body.contains(toast)) {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }
  }

  private loadResearchData() {
    this.subscription.add(
      forkJoin({
        areas: this.lecturerService.getResearchAreas(),
        publications: this.lecturerService.getPublications(),
      }).subscribe({
        next: (data) => {
          this.researchAreas = data.areas;
          this.publications = data.publications;
          console.log('Research data loaded:', data);
          
          // Force change detection after data is loaded
          setTimeout(() => {
            this.setupIntersectionObserver();
          }, 100);
        },
        error: (error) => {
          console.error('Error loading research data:', error);
        },
      })
    );
  }

  private setupIntersectionObserver() {
    // Disconnect existing observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    // More forgiving intersection observer settings for mobile
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate research areas with shorter delays for mobile
            const researchAreas = entry.target.querySelectorAll('.research-area');
            researchAreas.forEach((area, index) => {
              setTimeout(() => {
                area.classList.add('animate-in');
              }, index * 50); // Reduced from 100ms
            });

            // Animate publications with shorter delays
            const publicationItems = entry.target.querySelectorAll('.publication-item');
            publicationItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, researchAreas.length * 50 + index * 75); // Reduced delays
            });

            // Disconnect observer after animation to improve performance
            if (this.intersectionObserver) {
              this.intersectionObserver.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1, // Reduced threshold for easier triggering on mobile
        rootMargin: '0px 0px -20px 0px', // Less strict margin
      }
    );

    // Wait for DOM and try to observe
    const attemptObservation = () => {
      const section = document.getElementById('research');
      if (section && this.intersectionObserver) {
        this.intersectionObserver.observe(section);
        console.log('Research section observer attached');
      } else {
        // Retry if section not found
        setTimeout(attemptObservation, 200);
      }
    };

    attemptObservation();
  }
}