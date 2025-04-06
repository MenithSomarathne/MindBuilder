import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ParentService} from '../../service/parent.service';
import {ParentDTOO, RegisterParentRequest} from '../../model/parent.model';

@Component({
  selector: 'app-parent-management',
  templateUrl: './parent-management.component.html',
  styleUrls: ['./parent-management.component.css'],
  standalone: false
})
export class ParentManagementComponent implements OnInit {
  @ViewChild('childrenModal') childrenModal!: TemplateRef<any>;

  parents: ParentDTOO[] = [];
  filteredParents: ParentDTOO[] = [];
  searchText: string = '';
  filterBy: string = 'all';
  isEditMode: boolean = false;
  parentForm: FormGroup;
  parentToDelete: ParentDTOO | null = {
    id: 0,
    name: '',
    email: '',
    children: []
  };
  selectedParent: ParentDTOO | null = {
    id: 0,
    name: '',
    email: '',
    children: []
  };

  modalRef?: BsModalRef;

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading = false;
  uploadProgress = 0;

  constructor(
    private parentService: ParentService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.parentForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      imgUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.parentService.getAllParentss().subscribe({
      next: (parents) => {
        this.parents = parents;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading parents:', err)
    });
  }

  applyFilter(): void {
    this.filteredParents = this.parents.filter(parent => {
      const matchesSearch = this.searchText === '' ||
        parent.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        parent.email.toLowerCase().includes(this.searchText.toLowerCase());

      // Apply additional filters
      let matchesFilter = true;
      if (this.filterBy === 'children') {
        matchesFilter = parent.children.length > 0;
      } else if (this.filterBy === 'noChildren') {
        matchesFilter = parent.children.length === 0;
      }

      return matchesSearch && matchesFilter;
    });
  }

  openAddModal(template: TemplateRef<any>): void {
    this.isEditMode = false;
    this.parentForm.reset();
    this.parentForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.parentForm.get('password')?.updateValueAndValidity();
    this.modalRef = this.modalService.show(template);
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

  openEditModal(template: TemplateRef<any>, parent: ParentDTOO): void {
    this.isEditMode = true;
    this.parentForm.patchValue({
      id: parent.id,
      name: parent.name,
      email: parent.email
    });
    this.parentForm.get('password')?.clearValidators();
    this.parentForm.get('password')?.updateValueAndValidity();
    this.modalRef = this.modalService.show(template);
  }

  confirmDelete(template: TemplateRef<any>, parentId: number): void {
    this.parentToDelete = this.parents.find(p => p.id === parentId) || null;
    this.modalRef = this.modalService.show(template);
  }

  viewChildren(parentId: number): void {
    this.selectedParent = this.parents.find(p => p.id === parentId) || {
      id: 0,
      name: '',
      email: '',
      children: []
    };

    if (this.selectedParent && (!this.selectedParent.children || this.selectedParent.children.length === 0)) {
      this.parentService.getStudentsByParent(parentId).subscribe({
        next: (children) => {
          if (this.selectedParent) {
            this.selectedParent.children = children || [];
          }
          this.modalRef = this.modalService.show(this.childrenModal);
        },
        error: (err) => console.error('Error loading children:', err)
      });
    } else {
      this.modalRef = this.modalService.show(this.childrenModal);
    }
  }

  // Add this method to handle modal dismissals
  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = undefined;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.parentForm.invalid) return;

    try {
      let imgUrl = '';
      if (this.selectedImage) {
        imgUrl = await this.uploadImage();
      }

      if (this.isEditMode) {
        const parentData: ParentDTOO = {
          id: this.parentForm.value.id,
          name: this.parentForm.value.name,
          email: this.parentForm.value.email,
          imgUrl: imgUrl || this.parentForm.value.imgUrl,
          children: this.selectedParent?.children || []
        };

        const parentId = this.parentForm.value.id;
        this.parentService.updateParent(parentId, parentData).subscribe({
          next: (updatedParent) => {
            const index = this.parents.findIndex(p => p.id === updatedParent.id);
            if (index !== -1) {
              this.parents[index] = updatedParent;
            }
            this.applyFilter();
            this.closeModal();
          },
          error: (err) => console.error('Error updating parent:', err)
        });
      } else {
        const parentData: RegisterParentRequest = {
          name: this.parentForm.value.name,
          email: this.parentForm.value.email,
          password: this.parentForm.value.password,
          imgUrl: imgUrl
        };

        this.parentService.registerParent(parentData).subscribe({
          next: (newParent) => {
            this.parents.push(newParent);
            this.applyFilter();
            this.closeModal();
          },
          error: (err) => console.error('Error registering parent:', err)
        });
      }
    } catch (error) {
      console.error('Error saving parent:', error);
    }
  }

  deleteParent(): void {
    if (!this.parentToDelete) return;

    this.parentService.deleteParent(this.parentToDelete.id).subscribe({
      next: () => {
        this.parents = this.parents.filter(p => p.id !== this.parentToDelete?.id);
        this.applyFilter();
        this.modalRef?.hide();
        this.parentToDelete = null;
      },
      error: (err) => console.error('Error deleting parent:', err)
    });
  }
}
