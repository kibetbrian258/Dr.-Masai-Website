import { Component, OnInit, OnDestroy } from '@angular/core';

interface Particle {
  left: number;
  delay: number;
  size: number;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="background-animation">
      <div
        class="particle"
        *ngFor="let particle of particles; let i = index"
        [style.left.%]="particle.left"
        [style.animation-delay.s]="particle.delay"
        [style.width.px]="particle.size"
        [style.height.px]="particle.size"
      ></div>
    </div>

    <div class="wireframe-container">
      <app-header></app-header>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-courses></app-courses>
      <app-research></app-research>
      <app-news></app-news>
      <app-contact></app-contact>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'lecturer-website';
  particles: Particle[] = [];

  ngOnInit() {
    this.generateParticles();
    this.setupScrollEffects();
  }

  ngOnDestroy() {
    // Clean up any event listeners if needed
  }

  private generateParticles() {
    this.particles = [
      { left: 10, delay: 0, size: 20 },
      { left: 20, delay: 2, size: 15 },
      { left: 30, delay: 4, size: 25 },
      { left: 40, delay: 6, size: 18 },
      { left: 50, delay: 8, size: 22 },
      { left: 60, delay: 10, size: 16 },
      { left: 70, delay: 12, size: 24 },
      { left: 80, delay: 14, size: 19 },
      { left: 90, delay: 16, size: 21 },
    ];
  }

  private setupScrollEffects() {
    // Add any global scroll effects here
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll() {
    // Parallax effect for particles
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');

    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.1;
      (particle as HTMLElement).style.transform = `translateY(${
        scrolled * speed
      }px)`;
    });
  }
}
