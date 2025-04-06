import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Fixed Router import
import { LessonDTO } from '../../model/lesson.model';
import { LessonService } from '../../service/lesson.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-preview',
  standalone: false, // Changed to true since we're using standalone components
  templateUrl: './lesson-preview.component.html', // Moved template to separate file
  styleUrls: ['./lesson-preview.component.css'] // Moved styles to separate file
})
export class LessonPreviewComponent implements OnInit {
  lesson: LessonDTO | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    console.log('Lesson ID from route:', lessonId);

    if (lessonId) {
      const idNumber = parseInt(lessonId, 10);
      if (!isNaN(idNumber)) {
        this.loadLesson(idNumber);
      } else {
        console.error('Invalid lesson ID:', lessonId);
        this.isLoading = false;
      }
    } else {
      console.error('No lesson ID provided');
      this.isLoading = false;
    }
  }

  loadLesson(id: number): void {
    this.isLoading = true;
    this.lessonService.getLessonById(id).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        this.isLoading = false;
        console.log('Loaded lesson:', lesson);
      },
      error: (err) => {
        console.error('Failed to load lesson', err);
        this.isLoading = false;
      }
    });
  }

  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    if (!videoUrl) return '';

    let embedUrl = videoUrl;

    if (videoUrl.includes('watch?v=')) {
      embedUrl = videoUrl.replace('watch?v=', 'embed/');
    } else if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
