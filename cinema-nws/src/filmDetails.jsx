import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilmDetailsCard from './components/FilmDetailCard';

export default function filmDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [actors, setActors] = useState([]);
    const API_KEY = '18ffbdd4f338668948dfeecc71baa949';

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const [movieResponse, reviewsResponse, actorsResponse] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=fr&page=1`),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr`)
                ]);
                setMovie(movieResponse.data);
                setReviews(reviewsResponse.data.results);
                setActors(actorsResponse.data.cast);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du film:', error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (!movie) return <div>Chargement...</div>;

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='font-black text-2xl'>Détails du film</h1>
                <Link
                    className="text-white bg-gradient-to-r bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                    to={`/`}>Retour</Link>
            </div>

            <FilmDetailsCard
                movie={movie}
            />

            <div>
                {actors.length === 0 ? (
                    <p>Aucun acteur disponible pour ce film.</p>
                ) : (
                    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Les acteurs</h2>
                        </div>

                        <div class="flex flex-wrap">
                            {actors.slice(0, 10).map((actor) => (
                                <div key={actor.id} className="w-1/3 mt-6">
                                    <div class="text-center text-gray-500 dark:text-gray-400">
                                        <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                                        <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            <p>{actor.name}</p>
                                        </h3>
                                        <p>{actor.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h2 className='text-2xl font-extrabold text-gray-900'>Avis</h2>
                {reviews.length === 0 ? (
                    <p>Aucun avis disponible pour ce film.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>


    )
}
