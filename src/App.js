import { useState } from "react";
import   "./App.css";

export default function MovieWatchListCalaaApp() {
  const [movies, setMovies] = useState([]);

  function handleAddMovie(movie) {
    setMovies((movies) => [...movies, movie]);
  }

  return (
    <div className="app">
      <Logo />
      <MovieForm onAddMovie={handleAddMovie} />
      <MovieList movies={movies} />
      <footer movies={movies} />
    </div>
  );
}

function Logo() {
  return <h1>Movie WatchList 🍿</h1>;
}

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [watched,setWatched]= useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title) return;

    const newMovie = { title, watched, id: Date.now() };
    onAddMovie(newMovie);

    setTitle("");
    setWatched(false);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>add a Movie Here </h3>
      <input
      type="text"
      placeholder="Enter your movie title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

function MovieList({movies,onDeleteMovie }) {
  return (
    <div className="list">
      <ul>
        {movies.map((movie) =>(
          <MovieItem movie={movie} key={movie.id} onDeleteMovie={onDeleteMovie}
           />
        ))}
      </ul>
    </div>
  );
}

function MovieItem({ movie }) {
  return (
    <li>
      <span style={MovieForm.watched ? {textDecoration: "line-through"} : {}}>
        {movie.title}
      </span>
      <button>❌</button>
    </li>
  );
}

function footer({ movies }) {
  const watchedMovies = movies.filter((movie) => movie.watched);
  const percentWatched = (watchedMovies.lenght / movies.lenght) * 100 || 0;

  return (
    <footer className="stats">
      <em>
        you have {movies.lenght} movies in your list, and { watchedMovies.lenght}{" "}
        ({percentWatched.toFixed(2)}%) watched.
      </em>
    </footer>
  );
}