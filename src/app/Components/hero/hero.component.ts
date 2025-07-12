import { Component, OnInit, OnDestroy } from '@angular/core';
import { LecturerInfo } from '../../models/lecturer.model';
import { Subscription } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero" id="hero">
      <div class="profile-container">
        <div class="profile-ring"></div>
        <div
          class="profile-image"
          [style.background-image]="getProfileImageStyle()"
          [class.has-image]="hasProfileImage()"
        >
          <span *ngIf="!hasProfileImage()">PROFILE PHOTO</span>
        </div>
      </div>
      <div class="hero-content" *ngIf="lecturerInfo">
        <h1 class="fade-in-up" [style.animation-delay]="'0.2s'">
          {{ lecturerInfo.name }}
        </h1>
        <p class="subtitle fade-in-up" [style.animation-delay]="'0.4s'">
          {{ lecturerInfo.title }} | {{ lecturerInfo.university }}
        </p>
        <p class="tagline fade-in-up" [style.animation-delay]="'0.6s'">
          {{ lecturerInfo.tagline }}
        </p>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  lecturerInfo: LecturerInfo | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadLecturerInfo();
    this.setupAnimations();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Helper method to safely get profile image style
  getProfileImageStyle(): string | null {
    if (this.lecturerInfo?.profileImage) {
      return `url(${this.lecturerInfo.profileImage})`;
    }
    return null;
  }

  // Helper method to check if profile image exists
  hasProfileImage(): boolean {
    return !!this.lecturerInfo?.profileImage;
  }

  private loadLecturerInfo() {
    this.subscription.add(
      this.lecturerService.getLecturerInfo().subscribe({
        next: (info) => {
          this.lecturerInfo = info;
        },
        error: (error) => {
          console.error('Error loading lecturer info:', error);
        },
      })
    );
  }

  private setupAnimations() {
    // Add any specific hero animations here
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.fade-in-up');
      heroElements.forEach((element) => {
        element.classList.add('visible');
      });
    }, 100);
  }
}
