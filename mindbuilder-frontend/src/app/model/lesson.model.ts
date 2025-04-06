// src/app/models/lesson.model.ts
import { LessonStatus } from './lesson-status.enum';

export interface LessonDTO {
  lessonId: number;
  teacherId: number;
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
  createdDate: string; // ISO date string (e.g., "2025-03-31T12:00:00")
  isPurchasable: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  purchaseCount: number;
  version: number;
  status: LessonStatus;
}

export interface LessonCreateDTO {
  teacherId: number;
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
  videoUrl: string;
  thumbnailUrl: string;
}

export interface LessonUpdateDTO {
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
