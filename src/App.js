import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcom from './search.svg';
import Moviecard from './Moviecard';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=7903873b';
const App = () => {
    const [searchTerm, setsearchTerm] = useState([]);
    const [movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data.Search);
        setMovies(data.Search);
        setsearchTerm(title);
    }
    useEffect(() => {
        searchMovies('Zootopia');
    }, []
    )
    return (
        <div className="app">
            <h1>
                Must Watch Movies
            </h1>
            <div className="search">
                <input
                    placeholder="Enter the title.."
                    value={searchTerm}
                    onChange={(e) => { setsearchTerm(e.target.value) }} />
                <img src={SearchIcom} alt='Search'
                    onClick={() => { (searchTerm.length > 0 ? searchMovies(searchTerm) : alert('Enter the search text')) }}></img>
            </div>
            {movies.length > 0 ?
                (
                    <div className="container">
                        {movies.map((movie1) =>
                            (<Moviecard movie={movie1} key={movie1.imdbID} />))
                        }
                    </div>)
                :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

        </div>
    );
}

export default App;