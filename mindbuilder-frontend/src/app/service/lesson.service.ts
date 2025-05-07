// src/app/services/lesson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LessonCreateDTO, LessonDTO, LessonUpdateDTO} from '../model/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:8080/api/lessons';

  constructor(private http: HttpClient) {}

  getAllLessons(): Observable<LessonDTO[]> {
    return this.http.get<LessonDTO[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getLessonById(id: number): Observable<LessonDTO> {
    return this.http.get<LessonDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createLesson(lesson: LessonCreateDTO): Observable<LessonDTO> {
    console.log('lesson', lesson);
    return this.http.post<LessonDTO>(this.apiUrl, lesson).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing lesson
  updateLesson(id: number, lesson: LessonUpdateDTO): Observable<LessonDTO> {
    return this.http.put<LessonDTO>(`${this.apiUrl}/${id}`, lesson).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a lesson
  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getLessonsPurchasedByParent(studentId: number): Observable<LessonDTO[]> {
    return this.http.get<LessonDTO[]>(`${this.apiUrl}/student/${studentId}/purchased-by-parent`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
