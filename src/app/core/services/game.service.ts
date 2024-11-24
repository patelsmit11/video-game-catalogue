import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
/**
 * Service to manage CRUD operations for games.
 * Provides methods for fetching, adding, updating, and deleting games via HTTP requests.
 */
export class GameService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
  }

  /**
   * Fetch all games from the server.
   * @returns Observable of an array of `Game` objects.
   */
  getAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  /**
   * Fetch a specific game by its ID.
   * @param id - The unique identifier of the game to retrieve.
   * @returns Observable of the `Game` object.
   */
  getById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  /**
   * Save a game to the server.
   * If the game has an `id`, it will update the existing game.
   * Otherwise, it will create a new game.
   * @param game - The `Game` object to save.
   * @returns Observable of type `void` upon success.
   */
  save(game: Game): Observable<void> {
    return game.id
      ? this.http.put<void>(`${this.apiUrl}/${game.id}`, game)
      : this.http.post<void>(this.apiUrl, game);
  }

  /**
   * Delete a game from the server by its ID.
   * @param id - The unique identifier of the game to delete.
   * @returns Observable of type `void` upon success.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
