import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, MovieService, IMovie } from '../movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size:15px}
    .nav-black{background:#282828}
    button {background:#202020}
    #searchForm {margin-right:100px}
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #bd362f;}
  `]
})
export class NavBarComponent {
  searchTerm = '';
  foundSessions: IMovie[];
  constructor(public auth: AuthService, private router: Router, private movieService: MovieService) {

  }

  searchSessions(searchTerm) {
    this.movieService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
