import { Component } from '@angular/core';
import {LessonDTO} from '../../model/lesson.model';
import {AdminLessonDTO, LessonStatus} from '../../dto/admin-lesson.dto';
import {LessonService} from '../../service/lesson.service';
import {AdminLessonService} from '../../service/admin-lesson.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-main-parent',
  standalone: false,
  templateUrl: './main-parent.component.html',
  styleUrl: './main-parent.component.css'
})
export class MainParentComponent {
// Teacher lessons
  lessons: LessonDTO[] = [];
  filteredLessons: LessonDTO[] = [];

  // Admin lessons
  adminLessons: AdminLessonDTO[] = [];
  adminFilteredLessons: AdminLessonDTO[] = [];

  isLoading = true;
  searchQuery = '';
  selectedStatus: LessonStatus | 'all' = 'all';
  selectedDifficulty: string = 'all';

  // Use the LessonStatus enum for options
  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: LessonStatus.PENDING, label: 'Pending' },
    { value: LessonStatus.APPROVED, label: 'Approved' },
    { value: LessonStatus.REJECTED, label: 'Rejected' }
  ];

  difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  constructor(
    private lessonService: LessonService,
    private adminLessonService: AdminLessonService
  ) {}

  ngOnInit(): void {
    this.loadAllLessons();

  }

  loadAllLessons(): void {
    this.isLoading = true;

    this.lessonService.getAllLessons().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.filterLessons();
        console.log(lessons);
      },
      error: (err) => console.error('Failed to load teacher lessons', err)
    });

    this.adminLessonService.getAllLessons().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (lessons) => {
        this.adminLessons = lessons;
        this.filterAdminLessons();
      },
      error: (err) => console.error('Failed to load admin lessons', err)
    });
  }

  filterLessons(): void {
    this.filteredLessons = this.lessons.filter(lesson => {
      const matchesSearch = this.searchQuery ?
        lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;

      const matchesStatus = this.selectedStatus === 'all' ||
        lesson.status === this.selectedStatus;

      const matchesDifficulty = this.selectedDifficulty === 'all' ||
        lesson.difficultyLevel === this.selectedDifficulty;

      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }

  filterAdminLessons(): void {
    this.adminFilteredLessons = this.adminLessons.filter(lesson => {
      const matchesSearch = this.searchQuery ?
        lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;

      const matchesStatus = this.selectedStatus === 'all' ||
        lesson.status === this.selectedStatus;

      const matchesDifficulty = this.selectedDifficulty === 'all' ||
        lesson.difficultyLevel === this.selectedDifficulty;

      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }

  onSearchChange(): void {
    this.filterLessons();
    this.filterAdminLessons();
  }

  onStatusChange(): void {
    this.filterLessons();
    this.filterAdminLessons();
  }

  onDifficultyChange(): void {
    this.filterLessons();
    this.filterAdminLessons();
  }

  get activeLessonsCount(): number {
    return this.lessons.filter(lesson => lesson.status === 'APPROVED').length;
  }

  get freeLessonsCount(): number {
    return this.lessons.filter(lesson => lesson.isFree).length;
  }

  getMostPopularLesson(): LessonDTO | null {
    if (this.lessons.length === 0) return null;
    return this.lessons.reduce((prev, current) =>
      (prev.viewCount > current.viewCount) ? prev : current);
  }
}
