export interface IQGameResponseDTO {
  gameId: number;
  teacherId: number;
  teacherName: string;
  title: string;
  difficultyLevel: string;
  lessonIds: number[];
  resultIds: number[];
}
