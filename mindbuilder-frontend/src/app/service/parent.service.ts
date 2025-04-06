import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {Parent} from '../model/student.model';
import {StudentDTO} from '../dto/student-dto';
import {ParentDTO} from '../model/student.model';
import {ParentDTOO, RegisterParentRequest} from '../model/parent.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = `${environment.apiBaseUrl}/api/parents`;

  constructor(private http: HttpClient) { }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<ParentDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.mapDtoToParent(dto))
      ));
  }

  private mapDtoToParent(dto: ParentDTO): Parent {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone_number || '',  // Map snake_case to camelCase
      address: dto.home_address || '' // Map different field names
    };
  }

  registerParent(request: RegisterParentRequest): Observable<ParentDTOO> {
    return this.http.post<ParentDTOO>(`${this.apiUrl}/register`, request);
  }

  // Get all parents
  getAllParentss(): Observable<ParentDTOO[]> {
    return this.http.get<ParentDTOO[]>(this.apiUrl);
  }

  // Get parent by ID
  getParentById(id: number): Observable<ParentDTOO> {
    return this.http.get<ParentDTOO>(`${this.apiUrl}/${id}`);
  }

  // Update parent
  updateParent(id: number, parent: ParentDTOO): Observable<ParentDTOO> {
    return this.http.put<ParentDTOO>(`${this.apiUrl}/${id}`, parent);
  }

  // Delete parent
  deleteParent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get students by parent ID
  getStudentsByParent(parentId: number): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.apiUrl}/${parentId}/students`);
  }
}
