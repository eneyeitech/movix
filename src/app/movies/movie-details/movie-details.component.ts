import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ISession, IMovie } from '../shared';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';


@Component({
  templateUrl: './movie-details.component.html',
  styles: [`
    .container {padding-left:20px;padding-right: 20px;}
    .movie-image {height: 250px}
    .movie-info{margin-top: 15px}
    .movie-info li{display:inline-block;margin-right:15px;}
    a {cursor: pointer}
  `]
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'votes';

  constructor(public auth: AuthService, private movieService: MovieService,
    private route: ActivatedRoute, private voterService: VoterService) {

  }
  ngOnInit() {
    this.route.data.forEach((data) => {
      this.movie = data['movie'];
      this.addMode = false;
    });

  }

  toggleVote(movie: IMovie) {
    if (this.userHasVoted(movie)) {
      this.voterService.deleteVoter(movie.id, movie, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(movie.id, movie, this.auth.currentUser.userName);
    }
  }

  userHasVoted(movie: IMovie) {
    return this.voterService.userHasVoted(movie, this.auth.currentUser.userName);
  }


}
