import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Parent, Student} from '../../model/student.model';
import {StudentService} from '../../service/student.service';
import {ParentService} from '../../service/parent.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: false
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  parents: Parent[] = [];
  searchText: string = '';
  filterBy: string = 'all';
  studentForm: FormGroup;
  isEditMode = false;
  currentStudentId: number | null = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading = false;
  showPassword = false;

  constructor(
    private studentService: StudentService,
    private parentService: ParentService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      parentId: [null],
      studentRank: [0, [Validators.min(0)]],
      totalMarks: [0, [Validators.min(0)]],
      imgUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadParents();
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordControl = this.studentForm.get('password');
    if (passwordControl) {
      const input = document.querySelector('input[formControlName="password"]') as HTMLInputElement;
      input.type = this.showPassword ? 'text' : 'password';
    }
  }
  async uploadImage(): Promise<string> {
    if (!this.selectedImage) return '';

    this.isUploading = true;
    const CLOUD_NAME = 'dsxmufxmq';
    // const UPLOAD_PRESET = 'your-upload-preset';

    const formData = new FormData();
    formData.append('file', this.selectedImage);
    formData.append('upload_preset', "mern-app");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      this.isUploading = false;
    }
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.applyFilter();
        console.log('Students:', students)
      },
      error: (err) => console.error('Error loading students', err)
    });
  }

  loadParents(): void {
    this.parentService.getAllParents().subscribe({
      next: (parents) => {
        this.parents = parents;
      },
      error: (err) => console.error('Error loading parents', err)
    });
  }

  applyFilter(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchText.toLowerCase());

      if (this.filterBy === 'rank') {
        return matchesSearch && student.studentRank > 0;
      } else if (this.filterBy === 'marks') {
        return matchesSearch && student.totalMarks > 0;
      }
      return matchesSearch;
    });
  }

  openAddModal(content: any): void {
    this.isEditMode = false;
    this.studentForm.reset({
      studentRank: 0,
      totalMarks: 0
    });
    this.studentForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.modalService.open(content);
  }

  openEditModal(content: any, student: Student): void {
    this.isEditMode = true;
    this.currentStudentId = student.id;
    this.studentForm.patchValue({
      name: student.name,
      email: student.email,
      parentId: student.parent?.id || null,
      studentRank: student.studentRank,
      totalMarks: student.totalMarks,
      imgUrl: student.imgUrl // Ensure this is set
    });
    this.studentForm.get('password')?.clearValidators();
    this.modalService.open(content);
  }

  async onSubmit(): Promise<void> {
    if (this.studentForm.invalid) return;

    try {
      let imgUrl = '';
      if (this.selectedImage) {
        imgUrl = await this.uploadImage();
      }

      const studentData = {
        ...this.studentForm.value,
        imgUrl: imgUrl || this.studentForm.value.imgUrl
      };

      if (this.isEditMode && this.currentStudentId) {
        await this.studentService.updateStudent(this.currentStudentId, studentData).toPromise();
      } else {
        await this.studentService.registerStudent(studentData).toPromise();
      }

      this.loadStudents();
      this.modalService.dismissAll();
      this.resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  }

  resetForm(): void {
    this.studentForm.reset({
      studentRank: 0,
      totalMarks: 0
    });
    this.selectedImage = null;
    this.imagePreview = null;
    this.isEditMode = false;
    this.currentStudentId = null;
  }

  confirmDelete(content: any, id: number): void {
    this.currentStudentId = id;
    this.modalService.open(content);
  }

  deleteStudent(): void {
    if (this.currentStudentId) {
      this.studentService.deleteStudent(this.currentStudentId).subscribe({
        next: () => {
          this.loadStudents();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error deleting student', err)
      });
    }
  }
}
