import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CharityDetailType from '../types/CharityDetail.types';

const CharityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [charity, setCharity] = useState<CharityDetailType | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const getCharityDetail = () => {
    const url = `https://partners.every.org/v0.2/nonprofit/${id}?apiKey=${import.meta.env.VITE_API_KEY}`;
    axios.get(url)
      .then((resp) => resp.data.data.nonprofit)
      .then((resp: CharityDetailType) => setCharity(resp))
      .catch((error) => console.log(error));
  }

  useEffect(getCharityDetail, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: any) => fav.id === id));
  }, [id]);

  const handleToggleFavorite = () => {
    if (charity) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = isFavorite
        ? favorites.filter((fav: any) => fav.id !== charity.id)
        : [...favorites, charity];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log(localStorage)
      setIsFavorite(!isFavorite);
    }
  };

  if (!charity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <img src={charity.coverImageUrl} alt="Charity Cover" className="w-full" />
      <h2 className="text-2xl font-bold mb-2">{charity.name}</h2>
      <p className="text-gray-700 mb-4">{charity.description}</p>
      <p className="text-gray-700">Location: {charity.locationAddress}</p>
      <button onClick={handleToggleFavorite} className="bg-blue-500 text-white py-2 px-4 mt-6">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default CharityDetail;
