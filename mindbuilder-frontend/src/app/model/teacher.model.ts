export interface Teacher {
  id: number;
  name: string;
  email: string;
  role: string;
  imgUrl?: string;
}

export interface TeacherRegistration {
  name: string;
  email: string;
  password: string;
  imgUrl?: string;
}

export interface TeacherUpdate {
  id: number;
  name: string;
  email: string;
  imgUrl?: string;
}
