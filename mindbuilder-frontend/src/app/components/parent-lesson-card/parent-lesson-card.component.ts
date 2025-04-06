import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ParentLessonPurchaseService } from '../../service/parent-lesson-purchase.service';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseLessonResponse } from '../../dto/purchase-lesson-response';
import { PurchaseLessonRequest } from '../../dto/purchase-lesson-request';

@Component({
  selector: 'app-parent-lesson-card',
  templateUrl: './parent-lesson-card.component.html',
  styleUrls: ['./parent-lesson-card.component.css'],
  standalone: false,
})
export class ParentLessonCardComponent implements OnInit {
  @Input() lesson: any;
  @Input() showActions = true;
  @Output() purchaseComplete = new EventEmitter<PurchaseLessonResponse>();

  showPurchaseModal = false;
  isProcessing = false;
  selectedPaymentMethod: string = 'card';
  isPurchased = false;

  constructor(
    private purchaseService: ParentLessonPurchaseService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkIfPurchased();
  }

  checkIfPurchased(): void {
    const parentId = this.authService.getCurrentUser()?.id;
    if (parentId && this.lesson?.lessonId) {
      this.purchaseService.getPurchasedLessonIds(parentId).subscribe({
        next: (lessonIds) => {
          this.isPurchased = lessonIds.includes(this.lesson.lessonId);
        },
        error: (err) => {
          console.error('Error checking purchased lessons:', err);
        }
      });
    }
  }

  get difficultyColor(): string {
    switch (this.lesson.difficultyLevel?.toLowerCase()) {
      case 'beginner': return 'from-green-400 to-green-500';
      case 'intermediate': return 'from-amber-400 to-amber-500';
      case 'advanced': return 'from-red-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  }

  get statusColor(): string {
    switch (this.lesson.status?.toLowerCase()) {
      case 'active': return 'from-green-400 to-green-500';
      case 'pending': return 'from-blue-400 to-blue-500';
      case 'draft': return 'from-yellow-400 to-yellow-500';
      case 'archived': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  }

  openPurchaseModal(): void {
    this.showPurchaseModal = true;
    document.body.style.overflow = 'hidden';
  }

  closePurchaseModal(): void {
    this.showPurchaseModal = false;
    document.body.style.overflow = '';
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  onPurchase(): void {
    if (this.isProcessing) return;

    this.isProcessing = true;

    const parentId = this.authService.getCurrentUser()?.id;
    if (!parentId) {
      this.snackBar.open('Please log in to make a purchase', 'Close', { duration: 3000 });
      this.isProcessing = false;
      return;
    }

    const request: PurchaseLessonRequest = {
      parentId: parentId,
      lessonId: this.lesson.lessonId
    };

    this.purchaseService.purchaseLesson(request).subscribe({
      next: (response) => {
        this.snackBar.open('Purchase successful!', 'Close', { duration: 3000 });
        this.purchaseComplete.emit(response);
        this.isPurchased = true; // Update purchased status
        this.closePurchaseModal();
        this.isProcessing = false;
      },
      error: (err) => {
        console.error('Purchase failed:', err);
        this.snackBar.open('Purchase failed. Please try again.', 'Close', { duration: 3000 });
        this.isProcessing = false;
      }
    });
  }
}
