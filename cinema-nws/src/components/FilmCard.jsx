import React from 'react';
import { Link } from 'react-router-dom';

const FilmCard = ({ movie }) => {
  return (
    <div className="mt-6 w-33">
      <Link to={`/film/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className='rounded-md'
        />
        <h3 className='mt-2 font-medium'>{movie.title}</h3>
      </Link>
    </div>
  );
};

export default FilmCard;