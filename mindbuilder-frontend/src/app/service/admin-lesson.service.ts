import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {AdminLessonRequest} from '../dto/admin-lesson-request.dto';
import {AdminLessonDTO} from '../dto/admin-lesson.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminLessonService {
  private apiUrl = `${environment.apiBaseUrl}/api/admin/lessons`;

  constructor(private http: HttpClient) { }

  createLesson(request: AdminLessonRequest): Observable<AdminLessonDTO> {
    return this.http.post<AdminLessonDTO>(this.apiUrl, request);
  }

  getLessonById(id: number): Observable<AdminLessonDTO> {
    return this.http.get<AdminLessonDTO>(`${this.apiUrl}/${id}`);
  }

  getAllLessons(): Observable<AdminLessonDTO[]> {
    return this.http.get<AdminLessonDTO[]>(this.apiUrl);
  }

  updateLesson(id: number, request: AdminLessonRequest): Observable<AdminLessonDTO> {
    return this.http.put<AdminLessonDTO>(`${this.apiUrl}/${id}`, request);
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  changeLessonStatus(id: number, status: string): Observable<AdminLessonDTO> {
    return this.http.patch<AdminLessonDTO>(`${this.apiUrl}/${id}/status/${status}`, {});
  }

  getLessonsByStatus(status: string): Observable<AdminLessonDTO[]> {
    return this.http.get<AdminLessonDTO[]>(`${this.apiUrl}/status/${status}`);
  }

  getActiveLessons(): Observable<AdminLessonDTO[]> {
    return this.http.get<AdminLessonDTO[]>(`${this.apiUrl}/active`);
  }

  incrementViewCount(id: number): Observable<AdminLessonDTO> {
    return this.http.patch<AdminLessonDTO>(`${this.apiUrl}/${id}/view`, {});
  }

  incrementPurchaseCount(id: number): Observable<AdminLessonDTO> {
    return this.http.patch<AdminLessonDTO>(`${this.apiUrl}/${id}/purchase`, {});
  }
}
