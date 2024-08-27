import React from 'react';

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

const FilmSearchCard = ({ movie }) => {
    return (
        <div className="mt-6 w-33">
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className='rounded-md'
            />
            <div className="movie-info">
                <h3 className='mt-2 font-bold'>{movie.title}</h3>
                <p className='text-sm mt-4'><strong>Date de sortie:</strong> {movie.release_date}</p>
                <p className='w-56'>{truncateText(movie.overview, 120)}</p>
            </div>
        </div>
    );
}

export default FilmSearchCard;
