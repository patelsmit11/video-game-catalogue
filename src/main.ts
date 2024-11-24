import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { GameListComponent } from './app/features/game-list/game-list.component';
import { GameEditComponent } from './app/features/game-edit/game-edit.component';

bootstrapApplication(AppComponent, {
  providers: [
    // Import routing module with route definitions
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', component: GameListComponent }, // Default route (root) displays the game list
        { path: 'edit/:id', component: GameEditComponent }, // Route for editing a game, with dynamic 'id' parameter
        { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route redirects any unknown paths to the root
      ])
    ),
    // Provide HttpClient for making API requests
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
