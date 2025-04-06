import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Teacher, TeacherRegistration, TeacherUpdate} from '../model/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = `${environment.apiBaseUrl}/api/teachers`;

  constructor(private http: HttpClient) { }

  registerTeacher(registrationData: TeacherRegistration): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiUrl}/register`, registrationData);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  updateTeacher(updateData: TeacherUpdate): Observable<Teacher> {
    return this.http.put<Teacher>(this.apiUrl, updateData);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTeacherByEmail(email: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/email/${email}`);
  }
}
