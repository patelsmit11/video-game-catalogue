import { Component, OnInit } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../core/models/game.model';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { GenreTypes } from '../../core/models/genre-types.enum';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  imports: [RouterModule, NgFor, DatePipe],
})

export class GameListComponent implements OnInit {
  games: Game[] = [];
  genreKeys: { key: string; value: number }[] = [];

  constructor(private gameService: GameService) { 
    this.genreKeys = Object.entries(GenreTypes)
      .filter(([key, value]) => typeof value === 'number')
      .map(([key, value]) => ({ key, value: value as number }));
  }

  // Lifecycle hook triggered after component initialization
  ngOnInit(): void {
    this.gameService.getAll().subscribe((data) => {
      this.games = data;
      this.initializeDataTable();
    });
  }

  // Confirm deletion of a game and proceed if the user agrees
  confirmDelete(gameId: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this game?');
    if (confirmed) {
      this.deleteGame(gameId);
    }
  }

  // Delete a game by its ID
  deleteGame(id: number): void {
    $('.table').DataTable().destroy();
    this.gameService.delete(id).subscribe(() => {
      this.games = this.games.filter((g) => g.id !== id);
      this.initializeDataTable();
    });
  }

  // Initialize the DataTable with specific options
  initializeDataTable(): void {
    setTimeout(() => {
      $('.table').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        columnDefs: [{ orderable: false, targets: [6] }],
      });
    }, 0);
  }
}
