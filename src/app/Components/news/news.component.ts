import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsItem } from '../../models/lecturer.model';
import { Subscription } from 'rxjs';
import { LecturerService } from 'src/app/Services/lecturer.service';

@Component({
  selector: 'app-news',
  template: `
    <section class="section fade-in" id="news">
      <h2 class="section-title">Latest News & Updates</h2>
      <div class="news-grid">
        <div
          class="news-item glass-card"
          *ngFor="
            let newsItem of newsItems;
            trackBy: trackByNews;
            let i = index
          "
          [style.animation-delay]="i * 0.1 + 's'"
        >
          <div class="news-date">{{ formatDate(newsItem.date) }}</div>
          <div class="news-title">{{ newsItem.title }}</div>
          <div class="news-excerpt">{{ newsItem.excerpt }}</div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  newsItems: NewsItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadNews();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByNews(index: number, item: NewsItem): string {
    return item.id;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }

  private loadNews() {
    this.subscription.add(
      this.lecturerService.getNews().subscribe({
        next: (news) => {
          this.newsItems = news;
        },
        error: (error) => {
          console.error('Error loading news:', error);
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
            // Add stagger animation to news items
            const newsItems = entry.target.querySelectorAll('.news-item');
            newsItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
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
      const section = document.getElementById('news');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }
}
