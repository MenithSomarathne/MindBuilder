import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {PurchaseLessonRequest} from '../dto/purchase-lesson-request';
import {PurchaseLessonResponse} from '../dto/purchase-lesson-response';
import {ParentPurchasesDto} from '../dto/parent-purchases-dto';

@Injectable({
  providedIn: 'root'
})
export class ParentLessonPurchaseService {
  private apiUrl = `${environment.apiBaseUrl}/api/parent-lesson-purchases`;

  constructor(private http: HttpClient) { }

  purchaseLesson(request: PurchaseLessonRequest): Observable<PurchaseLessonResponse> {
    return this.http.post<PurchaseLessonResponse>(this.apiUrl, request);
  }

  getPurchasesByParent(parentId: number): Observable<ParentPurchasesDto[]> {
    return this.http.get<ParentPurchasesDto[]>(`${this.apiUrl}/parent/${parentId}`);
  }

  getPurchasedLessonIds(parentId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/parent/${parentId}/lesson-ids`);
  }
}
