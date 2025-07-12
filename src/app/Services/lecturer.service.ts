import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  LecturerInfo,
  Education,
  Achievement,
  Course,
  Publication,
  NewsItem,
  ContactInfo,
  OfficeHour,
  SocialLink,
} from '../models/lecturer.model';

@Injectable({
  providedIn: 'root',
})
export class LecturerService {
  // private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Mock data methods - replace with actual HTTP calls to Spring Boot backend
  getLecturerInfo(): Observable<LecturerInfo> {
    const mockData: LecturerInfo = {
      name: 'Dr. Rael Jepkogei Masai',
      title: 'Doctor of Parasitology',
      department: 'Biology Department',
      university: 'Kisii University',
      profileImage: 'assets/images/lecturer.jpg',
      tagline:
        'Pioneering research, inspiring minds, and shaping the future through innovative education and groundbreaking discoveries',
      biography:
        "Welcome to my academic journey spanning over two decades of research excellence and educational innovation. As a passionate educator and researcher, I've dedicated my career to advancing knowledge in biological sciences while nurturing the next generation of brilliant minds.",
    };
    return of(mockData);
    // return this.http.get<LecturerInfo>(`${this.apiUrl}/lecturer/info`);
  }

  getEducation(): Observable<Education[]> {
    const mockData: Education[] = [
      {
        degree: 'Ph.D.',
        field: 'Parasitology',
        university: 'University of Eldoret',
        year: 2016,
      },
      {
        degree: 'M.S.',
        field: 'Zoology(Parasitology)',
        university: 'Moi University',
        year: 2008,
      },
      {
        degree: 'B.S.',
        field: 'Education(Science)',
        university: 'Kenyatta University',
        year: 2000,
      },
    ];
    return of(mockData);
    // return this.http.get<Education[]>(`${this.apiUrl}/lecturer/education`);
  }

  getAchievements(): Observable<Achievement[]> {
    const mockData: Achievement[] = [
      { title: 'IEEE Fellow', year: 2020 },
      { title: 'ACM Distinguished Scientist', year: 2018 },
      { title: 'NSF CAREER Award Recipient', year: 2012 },
      { title: 'Editorial Board - Nature Machine Intelligence' },
    ];
    return of(mockData);
    // return this.http.get<Achievement[]>(`${this.apiUrl}/lecturer/achievements`);
  }

  // Update the getCourses method in your lecturer.service.ts file

  getCourses(): Observable<Course[]> {
    const mockData: Course[] = [
      {
        id: '1',
        code: 'PARA 501',
        name: 'Advanced Immunoparasitology',
        description:
          'An in-depth study of the immune responses to parasitic infections, exploring host-parasite interactions, immune evasion mechanisms, and the development of immunological memory. Students examine molecular and cellular immunology as it relates to protozoan and helminth infections.',
        schedule: '', // Removed
        enrollment: 0, // Not needed
        format: '', // Removed
      },
      {
        id: '2',
        code: 'PARA 502',
        name: 'Epidemiology',
        description:
          'Comprehensive examination of disease patterns, transmission dynamics, and control strategies for parasitic diseases. Covers epidemiological methods, outbreak investigation, surveillance systems, and public health approaches to parasitic disease prevention and management in various populations.',
        schedule: '',
        enrollment: 0,
        format: '',
      },
      {
        id: '3',
        code: 'PARA 503',
        name: 'Helminthology',
        description:
          'Detailed study of parasitic worms including nematodes, trematodes, and cestodes. Focuses on morphology, life cycles, pathogenesis, diagnosis, and treatment of helminth infections. Emphasizes laboratory identification techniques and clinical manifestations of helminthic diseases.',
        schedule: '',
        enrollment: 0,
        format: '',
      },
      {
        id: '4',
        code: 'PARA 504',
        name: 'Protozoology',
        description:
          'Advanced study of parasitic protozoa affecting humans and animals. Covers classification, biology, pathogenic mechanisms, and clinical significance of major protozoan parasites including malaria, trypanosomiasis, leishmaniasis, and intestinal protozoa. Includes modern diagnostic and research methodologies.',
        schedule: '',
        enrollment: 0,
        format: '',
      },
    ];
    return of(mockData);
    // return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getResearchAreas(): Observable<string[]> {
    const mockData = [
      'Malaria-Geohelminth Co-infections',
      'Neglected Tropical Diseases (NTDs)',
      'Maternal and Child Health Parasitology',
      'Vector Control and Drug Resistance',
      'Traditional Medicine & Phytotherapy',
      'Environmental Health & Water Sanitation',
      'Global Health and Social Determinants of Disease',
    ];
    return of(mockData);
    // return this.http.get<string[]>(`${this.apiUrl}/research/areas`);
  }

  getPublications(): Observable<Publication[]> {
    const mockData: Publication[] = [
      {
        title:
          'Seasonality of neglected tropical geohelminthes and asymptomatic P.falciparum malaria prevalence among pregnant women attending antenatal care at nandi-hills sub-county hospital, Kenya',
        journal: 'Journal of Advanced Parasitology',
        year: 2024,
        citations: 12,
        link: 'http://dx.doi.org/10.17582/journal.jap/2024/11.5.13',
        type: 'journal',
      },
      {
        title:
          'Slow parasite clearance, absent K13 gene polymorphisms and observation of amino-acids silent mutations among malaria non-responsive patients: A case study of Kisii County, Kenya',
        journal: 'Journal of Parasitic Diseases',
        year: 2024,
        citations: 8,
        link: ': 10.21203/rs.3.rs-3886680/v1 (preprint)',
        type: 'journal',
      },
      {
        title:
          'Geo-helminth infections: Neglected helminthiases among pregnant women attending antenatal care at Nandi-Hills Sub-County Hospital, Nandi County, Kenya',
        journal: 'Pan African Science Journal',
        year: 2023,
        citations: 18,
        link: 'http://dx.doi.org/10.17582/journal.jap/2024/11.5.13',
        type: 'journal',
      },
      {
        title:
          'In-vitro Cytotoxicity of Extracts of Selected Malaria Medicinal Plants Used by Traditional Healers of Kericho East Sub-county, Kenya',
        journal: 'Journal of Applied Life Sciences International',
        year: 2023,
        citations: 15,
        link: 'http://dx.doi.org/10.17582/journal.jap/2024/11.5.13',
        type: 'journal',
      },
      {
        title:
          'Novel Plasmodium falciparum k13 gene polymorphisms, from kisii county, Kenya during an era of artemisinin based combination therapy deployment',
        journal: 'Malaria Journal',
        year: 2023,
        citations: 24,
        link: 'https://doi.org/10.1186/s12936-023-04517-2',
        type: 'journal',
      },
      {
        title:
          'Influence of vector control and chemotherapy intervention on treatment outcomes and parasite incidence in artemether combined therapies treated populations of Kisii County',
        journal: 'International Journal of Tropical Diseases and Health',
        year: 2022,
        citations: 13,
        link: 'https://doi.org/10.9734/ijtdh/2022/v43i1030619',
        type: 'journal',
      },
    ];
    return of(mockData);
    // return this.http.get<Publication[]>(`${this.apiUrl}/publications`);
  }

  getNews(): Observable<NewsItem[]> {
    const mockData: NewsItem[] = [
      {
        id: '1',
        date: new Date('2025-07-10'),
        title:
          'Breakthrough Single-Dose Malaria Vaccine Shows 90% Protection Rate',
        excerpt:
          "Scientists at Sanaria and Seattle Children's Research Institute unveiled PfSPZ-LARC2 Vaccine, a revolutionary single-dose malaria vaccine that provides unprecedented 90% protection against infection. This genetically engineered vaccine could be a game-changer in achieving the WHO's goal of 90% malaria protection, addressing the 263 million cases reported in 2023.",
      },
      {
        id: '2',
        date: new Date('2025-06-28'),
        title:
          'Novel Drug Mechanism Discovered for Antimalarial Drug Resistance',
        excerpt:
          'MIT researchers identified how malaria parasites develop resistance to artemisinin through tRNA modification—a cellular process that allows rapid stress response. This breakthrough discovery, published in Nature Microbiology, reveals how drug-resistant parasites exploit epitranscriptomic mechanisms and opens new avenues for developing resistance-fighting therapies.',
      },
      {
        id: '3',
        date: new Date('2025-06-15'),
        title:
          'African Health Leaders Unite Against Rising Antimalarial Drug Resistance',
        excerpt:
          'Health ministers from 8 African countries issued a joint declaration calling for intensified action against antimalarial drug resistance, which now affects countries including Rwanda, Uganda, Tanzania, and Eritrea. The resistance threatens to undermine decades of progress in malaria control, with WHO calling for urgent diversification of artemisinin-based combination therapies.',
      },
      {
        id: '4',
        date: new Date('2025-05-20'),
        title:
          'Parasitology Research Becomes Fully Open Access for Global Health Impact',
        excerpt:
          "Parasitology Research, a leading journal in the field, transitioned to fully open access in January 2025, making critical helminth and parasite research freely available worldwide. Over 50% of the journal's 2024 articles addressed UN Sustainable Development Goals, highlighting the cross-disciplinary approach needed for global health challenges and neglected tropical diseases.",
      },
    ];
    return of(mockData);
    // return this.http.get<NewsItem[]>(`${this.apiUrl}/news`);
  }

  getContactInfo(): Observable<ContactInfo> {
    const mockData: ContactInfo = {
      email: 'jmasai@kisiiuniversity.ac.ke',
      phone: '+(254) 721-514-998',
      office: 'Biology Department, Suite 314',
      address: '4865-30100 Eldoret',
      labWebsite: 'computational-intelligence-lab.edu',
    };
    return of(mockData);
    // return this.http.get<ContactInfo>(`${this.apiUrl}/contact`);
  }

  getOfficeHours(): Observable<OfficeHour[]> {
    const mockData: OfficeHour[] = [
      {
        day: 'Monday',
        time: '2:00-4:00 PM',
        format: 'In-Person',
        purpose: 'Student Consultations',
      },
      {
        day: 'Wednesday',
        time: '1:00-3:00 PM',
        format: 'Hybrid',
        purpose: 'Research Discussions',
      },
      {
        day: 'Thursday',
        time: '3:00-4:00 PM',
        format: 'Virtual',
        purpose: 'Open Q&A',
      },
      {
        day: 'Friday',
        time: '10:00-12:00 PM',
        format: 'By Appointment',
        purpose: 'Graduate Mentoring',
      },
    ];
    return of(mockData);
    // return this.http.get<OfficeHour[]>(`${this.apiUrl}/office-hours`);
  }

  getSocialLinks(): Observable<SocialLink[]> {
    const mockData: SocialLink[] = [
      {
        platform: 'linkedin',
        label: 'LI',
        url: 'https://linkedin.com/in/drjohnson',
        icon: 'LI',
      },
      {
        platform: 'twitter',
        label: '𝕏',
        url: 'https://twitter.com/drjohnson',
        icon: '𝕏',
      },
      {
        platform: 'scholar',
        label: 'GS',
        url: 'https://scholar.google.com/citations?user=xyz',
        icon: 'GS',
      },
      {
        platform: 'researchgate',
        label: 'RG',
        url: 'https://researchgate.net/profile/dr-johnson',
        icon: 'RG',
      },
      {
        platform: 'orcid',
        label: 'OR',
        url: 'https://orcid.org/0000-0000-0000-0000',
        icon: 'OR',
      },
      {
        platform: 'github',
        label: 'GH',
        url: 'https://github.com/drjohnson',
        icon: 'GH',
      },
    ];
    return of(mockData);
    // return this.http.get<SocialLink[]>(`${this.apiUrl}/social-links`);
  }
}
