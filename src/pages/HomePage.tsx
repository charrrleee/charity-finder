import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onSearch = (searchTerm: string) => {
    setKeyword(searchTerm);
  }

  const goToHome = () => {
    navigate('/');
  }

  const goToFavourite = () => {
    navigate('/favourite');
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4 w-full">
        <button onClick={goToHome} className="mr-4">Home Icon</button>
        <SearchBar onSearch={onSearch}/>
        <button onClick={goToFavourite} className="ml-4">Favourite Button</button>
      </div>
      <Outlet context={[keyword, setKeyword]}/> 
    </div>
  )
}

export default HomePage;
