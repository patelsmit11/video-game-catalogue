import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GenreTypes } from '../../core/models/genre-types.enum';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, NgIf, NgFor],
})

export class GameEditComponent implements OnInit {
  videoGameForm: FormGroup;
  genreKeys: { key: string; value: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private fb: FormBuilder
  ) {
    this.genreKeys = Object.entries(GenreTypes)
      .filter(([key, value]) => typeof value === 'number')
      .map(([key, value]) => ({ key, value: value as number }));

    // Initialize the form group with default values and validation rules
    this.videoGameForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      genre: [null, Validators.required],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      price: [null, [Validators.required, Validators.min(0)]],
      publisher: [''],
      releaseDate: [null, Validators.required],
    });
  }

  // Lifecycle hook triggered after component initialization
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      // If an ID exists, fetch the game details and patch the form values
      this.gameService.getById(id).subscribe((data) => {
        this.videoGameForm.patchValue({
          id: data.id,
          title: data.title,
          genre: data.genre,
          rating: data.rating,
          price: data.price,
          publisher: data.publisher,
          releaseDate: new Date(data.releaseDate).toISOString().split('T')[0],
        });
      });
    }
  }

  // Save the game to the backend
  saveGame(): void {

    this.trimFormValues();
    if (this.videoGameForm.valid) {
      const gamePayload = this.videoGameForm.value;
      this.gameService.save(gamePayload).subscribe({
        next: () => {
          this.videoGameForm.reset();
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Error saving video game:', err);
        }
      });
    }
    else {
      this.videoGameForm.markAllAsTouched();
      console.log('Form is invalid!');
    }
  }

  // Trims string values before submission
  trimFormValues() {
    Object.keys(this.videoGameForm.controls).forEach(key => {
      const control = this.videoGameForm.get(key);
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
}
