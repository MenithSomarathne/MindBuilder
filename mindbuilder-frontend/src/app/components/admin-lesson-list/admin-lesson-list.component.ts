import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IQGameDTO } from '../../dto/iq-game.dto';
import {IQGameResponseDTO} from '../../dto/iq-game-response.dto';
import {AdminLessonDTO, LessonStatus} from '../../dto/admin-lesson.dto';
import {AdminLessonService} from '../../service/admin-lesson.service';
import {IQGameService} from '../../service/iq-game.service';
import {AdminLessonRequest} from '../../dto/admin-lesson-request.dto';
import {environment} from '../../../environments/environment';

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

@Component({
  selector: 'app-admin-lesson-list',
  templateUrl: './admin-lesson-list.component.html',
  styleUrls: ['./admin-lesson-list.component.css'],
  standalone: false
})
export class AdminLessonListComponent implements OnInit {
  @ViewChild('lessonModal') lessonModal!: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  @ViewChild('thumbnailInput') thumbnailInput!: ElementRef<HTMLInputElement>;

  lessons: AdminLessonDTO[] = [];
  filteredLessons: AdminLessonDTO[] = [];
  games: IQGameResponseDTO[] = [];
  searchText: string = '';
  filterBy: string = 'all';
  lessonForm: FormGroup;
  isEditMode = false;
  currentLessonId: number | null = null;
  lessonStatuses = Object.values(LessonStatus);

  // Thumbnail upload
  selectedThumbnailFile: File | null = null;
  isUploading = false;
  uploadProgress = 0;

  constructor(
    private adminLessonService: AdminLessonService,
    private iqGameService: IQGameService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.lessonForm = this.fb.group({
      gameId: [null, Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      isFree: [false],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
      difficultyLevel: ['', Validators.required],
      minRecommendedAge: [0, [Validators.required, Validators.min(0)]],
      maxRecommendedAge: [0, [Validators.required, Validators.min(0)]],
      videoUrl: ['', Validators.pattern('https?://.+')],
      thumbnailUrl: [''],
      isActive: [true],
      isPurchasable: [true],
      status: [LessonStatus.PENDING]
    });
  }

  ngOnInit(): void {
    this.loadLessons();
    this.loadGames();
  }

  loadLessons(): void {
    this.adminLessonService.getAllLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.applyFilter();
      },
      error: (err) => console.error('Failed to load lessons', err)
    });
  }

  loadGames(): void {
    this.iqGameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (err) => console.error('Failed to load games', err)
    });
  }

  applyFilter(): void {
    this.filteredLessons = this.lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        lesson.description.toLowerCase().includes(this.searchText.toLowerCase());

      if (this.filterBy === 'price') {
        return matchesSearch && lesson.price > 0;
      } else if (this.filterBy === 'duration') {
        return matchesSearch && lesson.durationMinutes > 0;
      }
      return matchesSearch;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentLessonId = null;
    this.lessonForm.reset({
      gameId: null,
      title: '',
      description: '',
      price: 0,
      currency: 'USD',
      isFree: false,
      durationMinutes: 0,
      difficultyLevel: '',
      minRecommendedAge: 0,
      maxRecommendedAge: 0,
      videoUrl: '',
      thumbnailUrl: '',
      isActive: true,
      isPurchasable: true,
      status: LessonStatus.PENDING
    });
    this.clearThumbnail();
    this.modalService.open(this.lessonModal, { size: 'xl', centered: true });
  }

  openEditModal(lesson: AdminLessonDTO): void {
    this.isEditMode = true;
    this.currentLessonId = lesson.lessonId;
    this.lessonForm.patchValue({
      gameId: lesson.gameId,
      title: lesson.title,
      description: lesson.description,
      price: lesson.price,
      currency: lesson.currency,
      isFree: lesson.isFree,
      durationMinutes: lesson.durationMinutes,
      difficultyLevel: lesson.difficultyLevel,
      minRecommendedAge: lesson.minRecommendedAge,
      maxRecommendedAge: lesson.maxRecommendedAge,
      videoUrl: lesson.videoUrl,
      thumbnailUrl: lesson.thumbnailUrl,
      isActive: lesson.isActive,
      isPurchasable: lesson.isPurchasable,
      status: lesson.status
    });
    this.modalService.open(this.lessonModal, { size: 'xl', centered: true });
  }

  onSubmit(): void {
    if (this.lessonForm.invalid) return;

    const request: AdminLessonRequest = this.lessonForm.value;

    if (this.isEditMode && this.currentLessonId) {
      this.adminLessonService.updateLesson(this.currentLessonId, request).subscribe({
        next: () => {
          this.loadLessons();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Failed to update lesson', err)
      });
    } else {
      this.adminLessonService.createLesson(request).subscribe({
        next: () => {
          this.loadLessons();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Failed to create lesson', err)
      });
    }
  }

  confirmDelete(lessonId: number): void {
    this.currentLessonId = lessonId;
    this.modalService.open(this.deleteModal);
  }

  deleteLesson(): void {
    if (this.currentLessonId) {
      this.adminLessonService.deleteLesson(this.currentLessonId).subscribe({
        next: () => {
          this.loadLessons();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Failed to delete lesson', err)
      });
    }
  }

  changeLessonStatus(lessonId: number, status: string): void {
    this.adminLessonService.changeLessonStatus(lessonId, status).subscribe({
      next: () => {
        this.loadLessons();
      },
      error: (err) => console.error('Failed to change lesson status', err)
    });
  }

  // Thumbnail upload methods
  onThumbnailSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedThumbnailFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.lessonForm.patchValue({ thumbnailUrl: e.target.result as string });
        }
      };
      reader.readAsDataURL(this.selectedThumbnailFile);
    }
  }

  async uploadThumbnail(): Promise<void> {
    if (!this.selectedThumbnailFile) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    try {
      const formData = new FormData();
      formData.append('file', this.selectedThumbnailFile);
      formData.append('upload_preset', 'mern-app');

      const requestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/image/upload`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result: CloudinaryResponse = await response.json();
      this.lessonForm.patchValue({ thumbnailUrl: result.secure_url });
      this.selectedThumbnailFile = null;

      if (this.thumbnailInput?.nativeElement) {
        this.thumbnailInput.nativeElement.value = '';
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
    } finally {
      this.isUploading = false;
      this.uploadProgress = 0;
    }
  }

  clearThumbnail(): void {
    this.lessonForm.patchValue({ thumbnailUrl: '' });
    this.selectedThumbnailFile = null;
    if (this.thumbnailInput?.nativeElement) {
      this.thumbnailInput.nativeElement.value = '';
    }
  }
}
