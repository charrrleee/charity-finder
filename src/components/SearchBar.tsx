import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [causeList, setCauseList] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/CauseList.json')
      .then(response => setCauseList(response.data.causes))
      .catch(error => console.error('Error fetching CauseList.json:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    setSuggestions(causeList.filter(cause => cause.toLowerCase().includes(value.toLowerCase())));
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setSuggestions([]); // Clear suggestions after click
    if (location.pathname.includes("/charity/")) {
      navigate('/');
    }


    console.log('Current path:', location.pathname);
  }

  return (
    <div className="relative inline-block w-64">
      <input
        type="text"
        className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter your search term..."
      />
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              className="w-full px-4 py-2 text-left hover:bg-blue-100 text-white"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
