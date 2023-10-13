import React from 'react';
import Charity from '../types/Charity.types';

const FavouriteCharities: React.FC = () => {
  const favouriteCharities = JSON.parse(localStorage.getItem('favorites') || '[]');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Favorite Charities</h2>
      {favouriteCharities.map((charity: Charity) => (
        <div key={charity.ein} className="max-w-md border p-4 rounded-lg mb-4">
          <img src={charity.logoUrl} alt={`${charity.name} Logo`} className="mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">{charity.name}</h3>
          <p>{charity.description}</p>
          <p className="text-gray-700">Location: {charity.location}</p>
        </div>
      ))}
    </div>
  );
};

export default FavouriteCharities;
