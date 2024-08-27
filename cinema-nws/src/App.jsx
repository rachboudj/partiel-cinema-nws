import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const API_KEY = '18ffbdd4f338668948dfeecc71baa949';

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comédie' },
    { id: 80, name: 'Crime' },
  ];

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genre = selectedGenre ? `&with_genres=${selectedGenre}` : '';
        console.log(genre)
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=fr&page=${currentPage}&sort_by=popularity.desc${genre}`

        );
        setMovies(response.data.results.slice(0, 10));
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(`Erreur lors de la récupération des films`, error);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      const newPage = prev + direction;
      return newPage > 0 && newPage <= totalPages ? newPage : prev;
    });
  };

  return (
    <>
      <>
        <div className="genre-select">
          <label htmlFor="genre">Choisir un genre:</label>
          <select
            id="genre"
            value={selectedGenre || ''}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Tous les genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-wrap'>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}

        </div>
        <div>
          <button
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </>
    </>
  )
}

export default App
