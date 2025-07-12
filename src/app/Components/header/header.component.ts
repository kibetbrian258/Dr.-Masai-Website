import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

interface NavLink {
  label: string;
  target: string;
}

@Component({
  selector: 'app-header',
  template: `
    <header
      class="header"
      [class.scrolled]="isScrolled"
      [class.hidden]="isHidden"
    >
      <nav class="nav">
        <div class="logo" (click)="scrollToTop()">Dr. Masai</div>
        <div class="nav-links">
          <div
            class="nav-link"
            *ngFor="let link of navLinks"
            [class.active]="activeSection === link.target"
            (click)="scrollToSection(link.target)"
          >
            {{ link.label }}
          </div>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isHidden = false;
  activeSection = '';
  lastScrollTop = 0;

  navLinks: NavLink[] = [
    { label: 'About', target: 'about' },
    { label: 'Courses', target: 'courses' },
    { label: 'Research', target: 'research' },
    { label: 'News', target: 'news' },
    { label: 'Contact', target: 'contact' },
  ];

  private intersectionObserver?: IntersectionObserver;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Update scrolled state
    this.isScrolled = scrollTop > 100;

    // Hide/show header based on scroll direction
    if (scrollTop > this.lastScrollTop && scrollTop > 200) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    this.lastScrollTop = scrollTop;
  }

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  scrollToSection(target: string) {
    const element = document.getElementById(target);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      this.activeSection = target;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.activeSection = '';
  }

  private setupIntersectionObserver() {
    const options = {
      threshold: 0.6,
      rootMargin: '-100px 0px -100px 0px',
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    // Observe all sections
    this.navLinks.forEach((link) => {
      const element = document.getElementById(link.target);
      if (element) {
        this.intersectionObserver?.observe(element);
      }
    });
  }
}
