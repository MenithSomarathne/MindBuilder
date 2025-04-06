import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Teacher, TeacherRegistration, TeacherUpdate } from '../../model/teacher.model';
import { TeacherService } from '../../service/teacher.service';
import axios from 'axios';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  standalone: false
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  searchText: string = '';
  teacherForm: FormGroup;
  isEditMode = false;
  currentTeacherId: number | null = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading = false;
  showPassword = false;
  uploadProgress = 0;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      imgUrl: ['']
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadImage(): Promise<string> {
    if (!this.selectedImage) return '';

    this.isUploading = true;
    this.uploadProgress = 0;

    const CLOUD_NAME = 'dsxmufxmq';
    const UPLOAD_PRESET = 'mern-app';
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', this.selectedImage);
    formData.append('upload_preset', UPLOAD_PRESET);

    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          this.uploadProgress = Math.round((event.loaded * 100) / event.total);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject(new Error('Image upload failed'));
        }
        this.isUploading = false;
        this.uploadProgress = 0;
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Image upload failed'));
        this.isUploading = false;
        this.uploadProgress = 0;
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload aborted'));
        this.isUploading = false;
        this.uploadProgress = 0;
      });

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }


  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading teachers', err)
    });
  }

  applyFilter(): void {
    this.filteredTeachers = this.teachers.filter(teacher => {
      return teacher.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        teacher.email.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  openAddModal(content: any): void {
    this.isEditMode = false;
    this.teacherForm.reset();
    this.teacherForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.teacherForm.get('password')?.updateValueAndValidity();
    this.modalService.open(content);
  }

  openEditModal(content: any, teacher: Teacher): void {
    this.isEditMode = true;
    this.currentTeacherId = teacher.id;
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      imgUrl: teacher.imgUrl || ''
    });
    this.teacherForm.get('password')?.clearValidators();
    this.teacherForm.get('password')?.updateValueAndValidity();
    this.modalService.open(content);
  }

  async onSubmit(): Promise<void> {
    if (this.teacherForm.invalid) return;

    try {
      let imgUrl = '';
      if (this.selectedImage) {
        imgUrl = await this.uploadImage();
      }

      if (this.isEditMode && this.currentTeacherId) {
        const updateData: TeacherUpdate = {
          id: this.currentTeacherId,
          name: this.teacherForm.value.name,
          email: this.teacherForm.value.email,
          imgUrl: imgUrl || this.teacherForm.value.imgUrl
        };

        this.teacherService.updateTeacher(updateData).subscribe({
          next: () => {
            this.loadTeachers();
            this.modalService.dismissAll();
            this.resetForm();
          },
          error: (err) => console.error('Error updating teacher', err)
        });
      } else {
        const registrationData: TeacherRegistration = {
          name: this.teacherForm.value.name,
          email: this.teacherForm.value.email,
          password: this.teacherForm.value.password,
          imgUrl: imgUrl
        };

        this.teacherService.registerTeacher(registrationData).subscribe({
          next: () => {
            this.loadTeachers();
            this.modalService.dismissAll();
            this.resetForm();
          },
          error: (err) => console.error('Error registering teacher', err)
        });
      }
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  }

  resetForm(): void {
    this.teacherForm.reset();
    this.selectedImage = null;
    this.imagePreview = null;
    this.isEditMode = false;
    this.currentTeacherId = null;
  }
  confirmDelete(content: any, id: number): void {
    this.currentTeacherId = id;
    this.modalService.open(content);
  }

  deleteTeacher(): void {
    if (this.currentTeacherId) {
      this.teacherService.deleteTeacher(this.currentTeacherId).subscribe({
        next: () => {
          this.loadTeachers();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error deleting teacher', err)
      });
    }
  }
}
