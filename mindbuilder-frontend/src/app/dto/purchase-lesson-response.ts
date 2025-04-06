
export interface PurchaseLessonResponse {
  purchaseId: number;
  parentId: number;
  lessonId: number;
  lessonTitle: string;
  purchaseDate: Date;
  purchasePrice: number;
  currency: string;
}
