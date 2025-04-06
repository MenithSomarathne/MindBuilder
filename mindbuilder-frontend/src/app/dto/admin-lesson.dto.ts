export interface AdminLessonDTO {
  lessonId: number;
  gameId: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  isFree: boolean;
  durationMinutes: number;
  difficultyLevel: string;
  minRecommendedAge: number;
  maxRecommendedAge: number;
  isActive: boolean;
  createdDate: Date;
  isPurchasable: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  purchaseCount: number;
  status: LessonStatus;
}

export enum LessonStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
