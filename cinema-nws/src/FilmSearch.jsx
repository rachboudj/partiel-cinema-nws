import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import FilmSearchCard from './components/FilmSearchCard';


export default function filmSearch() {
    const API_KEY = '18ffbdd4f338668948dfeecc71baa949';
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm.trim() === '') return;

            try {
                const searchQuery = `&query=${encodeURIComponent(searchTerm)}`;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&page=${currentPage}&include_adult=false${searchQuery}`
                );

                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Erreur lors de la récupération des films', error);
            }
        };

        fetchMovies();
    }, [currentPage, searchTerm]);

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => {
            const newPage = prev + direction;
            return newPage > 0 && newPage <= totalPages ? newPage : prev;
        });
    };

    return (
        <div>
            <h1>Rechercher un film</h1>
            <Link to="/">Retour</Link>
            <div>
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />
            </div>

            <div className="results">
                {movies.length === 0 ? (
                    <p>Aucun résultat trouvé.</p>
                ) : (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <Link to={`/film/${movie.id}`}>
                                <FilmSearchCard 
                                    movie={movie}
                                />
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
            )}
        </div>
    );
}
