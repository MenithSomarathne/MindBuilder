import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {StudentDTO} from '../dto/student-dto';
import {Student} from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiBaseUrl}/api/students`;

  constructor(private http: HttpClient) { }

  registerStudent(student: any): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/register`, student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<StudentDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.mapDtoToStudent(dto))
      ));
  }

  private mapDtoToStudent(dto: StudentDTO): Student {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      parent: dto.parent ? {
        id: dto.parent.id,
        name: dto.parent.name,
        email: dto.parent.email
      } : undefined,
      imgUrl: dto.imgUrl,
      studentRank: dto.rank ?? dto.studentRank ?? 0,
      totalMarks: dto.marks ?? dto.totalMarks ?? 0
    };
  }
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  getStudentsByParent(parentId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/parent/${parentId}`);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  updateStudentRank(id: number, rank: number): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${id}/rank?rank=${rank}`, {});
  }

  updateStudentMarks(id: number, marks: number): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${id}/marks?totalMarks=${marks}`, {});
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
