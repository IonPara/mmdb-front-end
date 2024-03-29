import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { MovieType } from "../../components/Movies/Movies";
import { Response } from "../../components/Movies/Movies";
import { sortMovieList, sortTvList } from "../hooks/hooks";

type ResponseType = MovieType[] | undefined;

interface Genre {
  id: number;
  name: string;
}

export interface PersonType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: Person[];
}
interface Person {
  adult: false;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ExtendedPersonType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: 1;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

interface CastType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  department?: string;
  job?: string;
  episode_count?: string;
  media_type: string;
}

interface CombinedCreditsType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  department?: string;
  job?: string;
  episode_count?: string;
  media_type: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  name: string;
  number_of_seasons: number;
}

export interface MovieCredits {
  id: number;
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }[];
  crew: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  }[];
}

// Define a type for the slice state
export interface MovieState {
  movies: {
    nowPlaying: ResponseType;
    popular: ResponseType;
    topRated: ResponseType;
    searchedMovies: Response | undefined;
    movieGenres: Genre[] | undefined;
  };
  tv: {
    nowPlaying: ResponseType;
    popular: ResponseType;
    topRated: ResponseType;
    searchedTvShows: Response | undefined;
    tvGenres: Genre[] | undefined;
  };
  videos: {
    keys: string[];
    titles: string[];
  };
  people: PersonType[];
  movieDetails: MovieDetails | undefined;
  movieCredits: MovieCredits | undefined;
  type: string;
  person: {
    personDetails: ExtendedPersonType | undefined;
    combinedCredits: CombinedCreditsType[] | undefined;
  };
}

// Define the initial state using that type
const initialState: MovieState = {
  movies: {
    nowPlaying: undefined,
    popular: undefined,
    topRated: undefined,
    searchedMovies: undefined,
    movieGenres: undefined,
  },
  tv: {
    nowPlaying: undefined,
    popular: undefined,
    topRated: undefined,
    searchedTvShows: undefined,
    tvGenres: undefined,
  },
  videos: {
    keys: [],
    titles: [],
  },
  people: [],
  movieDetails: undefined,
  movieCredits: undefined,
  type: "movie",
  person: {
    personDetails: undefined,
    combinedCredits: undefined,
  },
};

export const movieSlice = createSlice({
  name: "movies",
  // The initial state
  initialState,
  // The reducers
  reducers: {
    setNowPlaying: (state, action: PayloadAction<[Response, string]>) => {
      if (action.payload[1] === "movies") {
        state.movies.nowPlaying = action.payload[0].results;
      }
      if (action.payload[1] === "tv") {
        state.tv.nowPlaying = action.payload[0].results;
      }
    },
    setPopular: (state, action: PayloadAction<[Response, string]>) => {
      if (action.payload[1] === "movies") {
        state.movies.popular = action.payload[0].results;
      }
      if (action.payload[1] === "tv") {
        state.tv.popular = action.payload[0].results;
      }
    },
    setTopRated: (state, action: PayloadAction<[Response, string]>) => {
      if (action.payload[1] === "movies") {
        state.movies.topRated = action.payload[0].results;
      }
      if (action.payload[1] === "tv") {
        state.tv.topRated = action.payload[0].results;
      }
    },
    addMovies: (state, action: PayloadAction<[Response, string, string]>) => {
      const results = action.payload[0].results;
      switch (action.payload[1]) {
        case "now_playing": {
          if (action.payload[2] === "movies") {
            state.movies.nowPlaying = state.movies.nowPlaying?.concat(results);
          }
          break;
        }
        case "popular": {
          if (action.payload[2] === "movies") {
            state.movies.popular = state.movies.popular?.concat(results);
          }
          if (action.payload[2] === "tv") {
            state.tv.popular = state.tv.popular?.concat(results);
          }
          break;
        }

        case "airing_today": {
          if (action.payload[2] === "tv") {
            state.tv.nowPlaying = state.tv.nowPlaying?.concat(results);
          }
        }
        default: {
          if (action.payload[2] === "movies") {
            state.movies.topRated = state.movies.topRated?.concat(results);
          }
          if (action.payload[2] === "tv") {
            state.tv.topRated = state.tv.topRated?.concat(results);
          }
          break;
        }
      }
    },
    addKeys: (state, action: PayloadAction<string>) => {
      state.videos.keys.push(action.payload);
    },
    addTitles: (state, action: PayloadAction<string>) => {
      state.videos.titles.push(action.payload);
    },
    setSearchedMovies: (state, action: PayloadAction<Response>) => {
      state.movies.searchedMovies = action.payload;
    },
    setSearchedTvShows: (state, action: PayloadAction<Response>) => {
      state.tv.searchedTvShows = action.payload;
    },
    setMovieGenres: (state, action: PayloadAction<Genre[]>) => {
      state.movies.movieGenres = action.payload;
    },
    setTvGenres: (state, action: PayloadAction<Genre[]>) => {
      state.tv.tvGenres = action.payload;
    },
    sortMovies: (state, action: PayloadAction<string[]>) => {
      if (action.payload[0] === "now_playing") {
        state.movies.nowPlaying = sortMovieList(
          action.payload[1],
          state.movies.nowPlaying
        );
      }
      if (action.payload[0] === "popular") {
        state.movies.popular = sortMovieList(
          action.payload[1],
          state.movies.popular
        );
      }
      if (action.payload[0] === "top_rated") {
        state.movies.topRated = sortMovieList(
          action.payload[1],
          state.movies.topRated
        );
      }
    },
    sortTvShows: (state, action: PayloadAction<string[]>) => {
      if (action.payload[0] === "airing_today") {
        state.tv.nowPlaying = sortTvList(
          action.payload[1],
          state.tv.nowPlaying
        );
      }
      if (action.payload[0] === "popular") {
        state.tv.popular = sortTvList(action.payload[1], state.tv.popular);
      }
      if (action.payload[0] === "top_rated") {
        state.tv.topRated = sortTvList(action.payload[1], state.tv.topRated);
      }
    },
    setPeople: (state, action: PayloadAction<PersonType[]>) => {
      state.people = action.payload;
    },
    loadMorePeople: (state, action: PayloadAction<PersonType[]>) => {
      state.people = state.people?.concat(action.payload);
    },
    setMovieDetails: (state, action: PayloadAction<any>) => {
      state.movieDetails = action.payload;
    },
    setMovieCredits: (state, action: PayloadAction<MovieCredits>) => {
      state.movieCredits = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setPerson: (state, action: PayloadAction<ExtendedPersonType>) => {
      state.person.personDetails = action.payload;
    },
    setCombinedCredits: (
      state,
      action: PayloadAction<CombinedCreditsType[]>
    ) => {
      state.person.combinedCredits = action.payload;
    },
  },
});

export const {
  setNowPlaying,
  setPopular,
  setTopRated,
  addMovies,
  addKeys,
  addTitles,
  setSearchedMovies,
  setSearchedTvShows,
  setMovieGenres,
  setTvGenres,
  sortMovies,
  sortTvShows,
  setPeople,
  loadMorePeople,
  setMovieDetails,
  setMovieCredits,
  setType,
  setPerson,
  setCombinedCredits,
} = movieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const movieReducer = (state: RootState) => state;

export default movieSlice.reducer;
