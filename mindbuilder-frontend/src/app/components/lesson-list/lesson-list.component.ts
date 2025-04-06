import {Component, ElementRef, input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from '../../service/lesson.service';
import { TeacherService } from '../../service/teacher.service';
import { LessonCreateDTO, LessonDTO, LessonUpdateDTO } from '../../model/lesson.model';
import { LessonStatus } from '../../model/lesson-status.enum';
import {Teacher} from '../../model/teacher.model';
import {IQGameResponseDTO} from '../../dto/iq-game-response.dto';
import {IQGameService} from '../../service/iq-game.service';
import {faLocale} from 'ngx-bootstrap/chronos';
import {QuillEditorComponent, QuillModules} from 'ngx-quill';
import {environment} from '../../../environments/environment';

interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  format?: string;
  resource_type?: string;
  width?: number;
  height?: number;
  bytes?: number;
  created_at?: string;
  original_filename?: string;
  [key: string]: any;
}
@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'],
  standalone: false
})
export class LessonListComponent implements OnInit {
  selectedThumbnailFile: File | null = null;
  isUploading = false;
  uploadProgress = 0;
  lessons: LessonDTO[] = [];
  filteredLessons: LessonDTO[] = [];
  searchText: string = '';
  filterBy: string = 'all';
  lessonForm: FormGroup;
  isEditMode = false;
  currentLessonId: number | null = null;
  lessonStatuses: LessonStatus[] = Object.values(LessonStatus) as LessonStatus[];
  teachers: Teacher[] = [];
  games: IQGameResponseDTO[] = [];

  @ViewChild('thumbnailInput') thumbnailInput!: ElementRef<HTMLInputElement>;

  onThumbnailSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedThumbnailFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
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
    if (this.thumbnailInput) {
      this.thumbnailInput.nativeElement.value = '';
    }
  }

  modules = input<QuillModules>({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  });

  editorStyle = {
    height: '150px',
    backgroundColor: '#ffffff'
  };


  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private gameService: IQGameService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.lessonForm = this.fb.group({
      teacherId: [null, Validators.required],
      gameId: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      isFree: [false],
      durationMinutes: [0, [Validators.required, Validators.min(1)]],
      difficultyLevel: ['', Validators.required],
      minRecommendedAge: [0, [Validators.required, Validators.min(0)]],
      maxRecommendedAge: [0, [Validators.required, Validators.min(0)]],
      videoUrl: [''],
      thumbnailUrl: [''],
      isActive: [true],
      isPurchasable: [true],
      status: [LessonStatus.PENDING]
    });
  }

  ngOnInit(): void {
    this.loadLessons();
    this.loadTeachers();
    this.loadGames();
  }

  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading lessons', err)
    });
  }

  logChange(event: any) {
    console.log('Editor content changed:', event);
  }


  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (err) => console.error('Error loading teachers', err)
    });
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (err) => console.error('Error loading games', err)
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

  openAddModal(content: any): void {
    this.isEditMode = false;
    this.lessonForm.reset({
      teacherId: null,
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
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  openEditModal(content: any, lesson: LessonDTO): void {
    this.isEditMode = true;
    this.currentLessonId = lesson.lessonId;
    this.lessonForm.patchValue({
      teacherId: lesson.teacherId,
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
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  onSubmit(): void {
    if (this.lessonForm.invalid) return;

    if (this.isEditMode && this.currentLessonId) {
      const lessonUpdate: LessonUpdateDTO = this.lessonForm.value;
      this.lessonService.updateLesson(this.currentLessonId, lessonUpdate).subscribe({
        next: () => {
          this.loadLessons();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating lesson', err)
      });
    } else {
      const lessonCreate: LessonCreateDTO = this.lessonForm.value;
      this.lessonService.createLesson(lessonCreate).subscribe({
        next: () => {
          this.loadLessons();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error creating lesson', err)
      });
    }
  }

  confirmDelete(content: any, id: number): void {
    this.currentLessonId = id;
    this.modalService.open(content);
  }

  deleteLesson(): void {
    if (this.currentLessonId) {
      this.lessonService.deleteLesson(this.currentLessonId).subscribe({
        next: () => {
          this.loadLessons();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error deleting lesson', err)
      });
    }
  }

  protected readonly LessonStatus = LessonStatus;
}
