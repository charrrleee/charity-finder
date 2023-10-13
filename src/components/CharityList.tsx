import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Charity from '../types/Charity.types';
import axios from 'axios';

const CharityList: React.FC = () => {
    const [keyword, _] = useOutletContext();
    const [charities, setCharities] = useState<Charity[]>([]);

    const fetchCharitiesByKeyword = (keyword: string) => {
        const term = keyword ? keyword : "animals";
        const url = `https://partners.every.org/v0.2/browse/${term}?apiKey=${import.meta.env.VITE_API_KEY}`;
        axios.get(url)
        .then((resp) => resp.data.nonprofits)
        .then((resp) => resp.filter((obj) => obj.ein !== undefined))
        .then((resp: Charity[]) => setCharities(resp))
        .catch((e) => console.log(e));
    }

    useEffect(() => fetchCharitiesByKeyword(keyword), [keyword])

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4 p-4 max-w-screen-lg w-full">
                {charities.map((charity) => (
                    <div key={charity.ein} className="border p-4 rounded-lg">
                        <img src={charity.logoUrl} alt={`${charity.name} Logo`} className="mx-auto mb-4" />
                        <h1 className="text-xl font-bold mb-2">{charity.name}</h1>
                        <p className="text-sm">Location: {charity.location}</p>
                        <Link to={`/charity/${charity.ein}`} className="block mt-4 text-blue-500">Learn More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharityList;
