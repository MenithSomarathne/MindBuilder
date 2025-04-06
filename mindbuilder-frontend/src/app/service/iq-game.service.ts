import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {IQGameResponseDTO} from '../dto/iq-game-response.dto';
import {IQGameDTO} from '../dto/iq-game.dto';

@Injectable({
  providedIn: 'root'
})
export class IQGameService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/iq-games`;

  constructor(private http: HttpClient) { }

  /**
   * Create a new IQ Game
   * @param gameDTO The game data to create
   * @returns Observable of the created game
   */
  createGame(gameDTO: IQGameDTO): Observable<IQGameResponseDTO> {
    console.log('gameDTO', gameDTO);
    return this.http.post<IQGameResponseDTO>(this.apiUrl, gameDTO);
  }

  /**
   * Get a specific IQ Game by ID
   * @param id The game ID
   * @returns Observable of the game
   */
  getGameById(id: number): Observable<IQGameResponseDTO> {
    return this.http.get<IQGameResponseDTO>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all IQ Games
   * @returns Observable of game list
   */
  getAllGames(): Observable<IQGameResponseDTO[]> {
    return this.http.get<IQGameResponseDTO[]>(this.apiUrl);
  }

  /**
   * Get games by teacher ID
   * @param teacherId The teacher ID
   * @returns Observable of game list
   */
  getGamesByTeacher(teacherId: number): Observable<IQGameResponseDTO[]> {
    return this.http.get<IQGameResponseDTO[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  /**
   * Get games by difficulty level
   * @param level The difficulty level
   * @returns Observable of game list
   */
  getGamesByDifficulty(level: string): Observable<IQGameResponseDTO[]> {
    return this.http.get<IQGameResponseDTO[]>(`${this.apiUrl}/difficulty/${level}`);
  }

  /**
   * Update an existing game
   * @param id The game ID to update
   * @param gameDTO The updated game data
   * @returns Observable of the updated game
   */
  updateGame(id: number, gameDTO: IQGameDTO): Observable<IQGameResponseDTO> {
    return this.http.put<IQGameResponseDTO>(`${this.apiUrl}/${id}`, gameDTO);
  }

  /**
   * Delete a game
   * @param id The game ID to delete
   * @returns Observable of void
   */
  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
