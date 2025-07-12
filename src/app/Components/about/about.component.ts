import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  LecturerInfo,
  Education,
  Achievement,
} from '../../models/lecturer.model';
import { Subscription, forkJoin } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-about',
  template: `
    <section class="section fade-in" id="about">
      <h2 class="section-title">About Me</h2>
      <div class="about-grid">
        <div class="about-text glass-card" *ngIf="lecturerInfo">
          <h3>Biography</h3>
          <p>{{ lecturerInfo.biography }}</p>
          <br />
          <p>
            My work bridges theoretical foundations with practical applications,
            focusing on creating solutions that make a meaningful impact on
            society. I believe in the power of interdisciplinary collaboration
            and have led numerous research initiatives that have
            shaped modern understanding in my field.
          </p>
        </div>
        <div class="credentials glass-card">
          <h3>Education & Achievements</h3>
          <ul>
            <li
              *ngFor="let edu of education; trackBy: trackByEducation"
              class="education-item"
            >
              {{ edu.degree }} in {{ edu.field }} - {{ edu.university }} ({{
                edu.year
              }})
            </li>
            <!-- <li
              *ngFor="
                let achievement of achievements;
                trackBy: trackByAchievement
              "
              class="achievement-item"
            >
              {{ achievement.title }}
              <span *ngIf="achievement.year"> ({{ achievement.year }})</span>
            </li> -->
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  lecturerInfo: LecturerInfo | null = null;
  education: Education[] = [];
  achievements: Achievement[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadAboutData();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByEducation(index: number, item: Education): string {
    return `${item.degree}-${item.university}-${item.year}`;
  }

  // trackByAchievement(index: number, item: Achievement): string {
  //   return `${item.title}-${item.year || 'no-year'}`;
  // }

  private loadAboutData() {
    this.subscription.add(
      forkJoin({
        lecturer: this.lecturerService.getLecturerInfo(),
        education: this.lecturerService.getEducation(),
        achievements: this.lecturerService.getAchievements(),
      }).subscribe({
        next: (data) => {
          this.lecturerInfo = data.lecturer;
          this.education = data.education;
          this.achievements = data.achievements;
        },
        error: (error) => {
          console.error('Error loading about data:', error);
        },
      })
    );
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add stagger animation to list items
            const listItems = entry.target.querySelectorAll('li');
            listItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    setTimeout(() => {
      const section = document.getElementById('about');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }
}
