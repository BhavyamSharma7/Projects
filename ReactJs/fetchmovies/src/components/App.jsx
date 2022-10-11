import React, { useState } from "react";
import MovieList from "./MovieList";


// let dummyMovies = [
//     {
//         id: "1",
//         title: "1st title",
//         opening: "Text 1",
//         release_date: " R Text 1"
//     },
//     {
//         id: "2",
//         title: "2nd title",
//         opening: "Text 2",
//         release_date: " R Text 2"
//     }
// ];

function App() {

    const [movies, setMovies] = useState([]);
    
    async function fetchMoviesHandler() {
        
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();

        const TransformedMovies = data.results.map(movieData => {
            return (
                {
                    id: movieData.episode_id,
                    title: movieData.title,
                    opening: movieData.opening_crawl,
                    release_date: movieData.release_date
                }
            );
        });

        setMovies(TransformedMovies);
    };


    return (
        <div id="main-container">
            <section id="fetching-movies" className="flex">
                <button onClick={fetchMoviesHandler}>Fetch</button>
            </section>
            <section>
                <MovieList Movies={ movies } />
            </section>
        </div>
    );
}

export default App;