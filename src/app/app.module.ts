import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  MoviesListComponent,
  MovieThumbnailComponent,
  MovieService,
  MovieDetailsComponent,
  MovieListResolver,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  MovieResolver,
  MoviesFavoriteComponent,
  MovieFavoriteResolver
} from './movies/index';

import { AppComponent } from './movies-app.component';
import { NavBarComponent } from './nav/navbar.component';
import {
  TOASTR_TOKEN, CollapsibleWellComponent,
  JQ_TOKEN, Toastr, SimpleModalComponent,
  ModalTriggerDirective
} from './common/index';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './user/signup.component';

const toastr: Toastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieThumbnailComponent,
    MovieDetailsComponent,
    NavBarComponent,
    Error404Component,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator,
    MoviesFavoriteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  providers: [
    MovieService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    MovieResolver,
    MovieListResolver,
    MovieFavoriteResolver,
    AuthService,
    VoterService,
    {
      provide: 'canDeactivateCreateMovie',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component: SignUpComponent) {
  if (component.isDirty) {
    return window.confirm(`
    You have not saved this movie, do you really want to cancel?`);
  } else {
    return true;
  }
}
