import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocialLink } from '../../models/lecturer.model';
import { Subscription } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>
          &copy; {{ currentYear }} Dr. Rael Masai | Kisii University | All
          Rights Reserved
        </p>
        <p class="footer-tagline">
          "Committed to advancing human knowledge through research, and transformative education"
        </p>
      </div>
      <div class="social-links">
        <!-- <div
          class="social-link"
          *ngFor="let link of socialLinks; trackBy: trackBySocialLink"
          [title]="getSocialTitle(link)"
          (click)="openSocialLink(link)"
        >
          {{ link.icon }}
        </div> -->
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  socialLinks: SocialLink[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadSocialLinks();
    this.setupRippleEffect();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackBySocialLink(index: number, item: SocialLink): string {
    return item.platform;
  }

  getSocialTitle(link: SocialLink): string {
    const titles: { [key: string]: string } = {
      linkedin: 'LinkedIn',
      twitter: 'Twitter/X',
      scholar: 'Google Scholar',
      researchgate: 'ResearchGate',
      orcid: 'ORCID',
      github: 'GitHub',
    };
    return titles[link.platform] || link.platform;
  }

  openSocialLink(link: SocialLink) {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  }

  private loadSocialLinks() {
    this.subscription.add(
      this.lecturerService.getSocialLinks().subscribe({
        next: (links) => {
          this.socialLinks = links;
        },
        error: (error) => {
          console.error('Error loading social links:', error);
        },
      })
    );
  }

  private setupRippleEffect() {
    // Add ripple effect to social links
    setTimeout(() => {
      const socialLinks = document.querySelectorAll('.social-link');
      socialLinks.forEach((link) => {
        link.addEventListener('click', this.createRipple.bind(this));
      });
    }, 1000);
  }

  private createRipple(event: Event) {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.marginLeft = ripple.style.marginTop = '-50px';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
}
