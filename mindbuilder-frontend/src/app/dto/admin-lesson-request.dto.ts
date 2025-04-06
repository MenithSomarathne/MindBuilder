import {LessonStatus} from './admin-lesson.dto';

export interface AdminLessonRequest {
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
  isPurchasable: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  status: LessonStatus;
}
