import {StudentDTO} from '../dto/student-dto';

export interface ParentDTOO {
  id: number;
  name: string;
  email: string;
  imgUrl?: string;
  password?: string; // Only for registration
  children: any[]; // Remove optional modifier and always initialize as empty array
}

export interface RegisterParentRequest {
  name: string;
  email: string;
  imgUrl?: string;
  password: string;
}
