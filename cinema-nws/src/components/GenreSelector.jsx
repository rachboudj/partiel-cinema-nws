import React from 'react';

const GenreSelector = ({ selectedGenre, setSelectedGenre, genres }) => {
  return (
    <div className="mr-4">
      <select
        id="genre"
        value={selectedGenre || ''}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        aria-label="Sélectionnez un genre"
      >
        <option value="">Tous les genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
