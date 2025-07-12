import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactInfo, OfficeHour } from '../../models/lecturer.model';
import { Subscription, forkJoin } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-contact',
  template: `
    <section class="section fade-in" id="contact">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-grid">
        <div class="contact-info glass-card" *ngIf="contactInfo">
          <h3>Contact Information</h3>
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-text">
              <strong>Email</strong>
              {{ contactInfo.email }}
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📞</div>
            <div class="contact-text">
              <strong>Phone</strong>
              {{ contactInfo.phone }}
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">🏢</div>
            <div class="contact-text">
              <strong>Office</strong>
              {{ contactInfo.office }}
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-text">
              <strong>Mailing Address</strong>
              {{ contactInfo.address }}
            </div>
          </div>
          <!-- <div class="contact-item" *ngIf="contactInfo.labWebsite">
            <div class="contact-icon">🔗</div>
            <div class="contact-text">
              <strong>Lab Website</strong>
              {{ contactInfo.labWebsite }}
            </div>
          </div> -->
        </div>
        <!-- <div class="office-hours glass-card">
          <h3>Office Hours & Availability</h3>
          <table class="hours-table" *ngIf="officeHours.length > 0">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Format</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let hour of officeHours; trackBy: trackByOfficeHour">
                <td>{{ hour.day }}</td>
                <td>{{ hour.time }}</td>
                <td>{{ hour.format }}</td>
                <td>{{ hour.purpose }}</td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactInfo: ContactInfo | null = null;
  officeHours: OfficeHour[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadContactData();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByOfficeHour(index: number, item: OfficeHour): string {
    return `${item.day}-${item.time}`;
  }

  private loadContactData() {
    this.subscription.add(
      forkJoin({
        contact: this.lecturerService.getContactInfo(),
        hours: this.lecturerService.getOfficeHours(),
      }).subscribe({
        next: (data) => {
          this.contactInfo = data.contact;
          this.officeHours = data.hours;
        },
        error: (error) => {
          console.error('Error loading contact data:', error);
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
            // Add stagger animation to contact items
            const contactItems = entry.target.querySelectorAll('.contact-item');
            contactItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, index * 100);
            });

            // Animate table rows
            const tableRows = entry.target.querySelectorAll('tbody tr');
            tableRows.forEach((row, index) => {
              setTimeout(() => {
                row.classList.add('animate-in');
              }, contactItems.length * 100 + index * 150);
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
      const section = document.getElementById('contact');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }
}
