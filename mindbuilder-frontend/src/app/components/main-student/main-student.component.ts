import { Component } from '@angular/core';
import {LessonDTO} from '../../model/lesson.model';
import {AdminLessonDTO, LessonStatus} from '../../dto/admin-lesson.dto';
import {LessonService} from '../../service/lesson.service';
import {AdminLessonService} from '../../service/admin-lesson.service';
import {finalize} from 'rxjs';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-main-student',
  standalone: false,
  templateUrl: './main-student.component.html',
  styleUrl: './main-student.component.css'
})
export class MainStudentComponent {

  lessons: LessonDTO[] = [];
  filteredLessons: LessonDTO[] = [];

  adminLessons: AdminLessonDTO[] = [];
  adminFilteredLessons: AdminLessonDTO[] = [];

  isLoading = true;
  searchQuery = '';
  selectedStatus: LessonStatus | 'all' = 'all';
  selectedDifficulty: string = 'all';

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
    private adminLessonService: AdminLessonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkIfPurchased();
    this.loadAllLessons();

  }

  checkIfPurchased(): void {
  }
  loadAllLessons(): void {
    this.isLoading = true;
    const studentId = this.authService.getCurrentUser()?.id;

    this.lessonService.getLessonsPurchasedByParent(studentId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.filterLessons();
        console.log(lessons);
      },
      error: (err) => console.error('Failed to load teacher lessons', err)
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

  onSearchChange(): void {
    this.filterLessons();
  }

  onStatusChange(): void {
    this.filterLessons();
  }

  onDifficultyChange(): void {
    this.filterLessons();
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
