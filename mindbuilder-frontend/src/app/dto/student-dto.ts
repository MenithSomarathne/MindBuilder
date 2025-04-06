export interface StudentDTO {
  id: number;
  name: string;
  email: string;
  parent?: {
    id: number;
    name: string;
    email: string;
  };
  rank?: number;       // Backend might use 'rank' instead of 'studentRank'
  marks?: number;      // Backend might use 'marks' instead of 'totalMarks'
  imgUrl?: string;
  studentRank?: number;
  totalMarks?: number;
}
