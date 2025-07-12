import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../models/lecturer.model';
import { Subscription } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-courses',
  template: `
    <section class="section fade-in" id="courses">
      <h2 class="section-title">Current Courses</h2>
      <div class="courses-grid">
        <div
          class="course-card glass-card"
          *ngFor="let course of courses; trackBy: trackByCourse; let i = index"
          [style.animation-delay]="i * 0.1 + 's'"
        >
          <div class="course-title">{{ course.name }}</div>
          <div class="course-details">
            <p>{{ course.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadCourses();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByCourse(index: number, item: Course): string {
    return item.id;
  }

  private loadCourses() {
    this.subscription.add(
      this.lecturerService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
        },
        error: (error) => {
          console.error('Error loading courses:', error);
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
            // Add stagger animation to course cards
            const cards = entry.target.querySelectorAll('.course-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150);
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
      const section = document.getElementById('courses');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }
}
