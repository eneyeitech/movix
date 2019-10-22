export interface IMovie {
  id: number;
  name: string;
  year: number;
  imageUrl: string;
  rated: number;
  released: Date;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  favorites: string[];
  trailerUrl: string;
}


export interface ISession {
  id: number;
  name: string;
  presenter: string;
  duration: number;
  level: string;
  abstract: string;
  voters: string[];
}
