import React from "react";
import Movie from "./Movie";


function MovieList(props) {
    
    return (
        <div id="movies-list-container">
            {
                props.Movies.map((movie) => {
                    return (<Movie
                        title={movie.title}
                        opening={movie.opening}
                        release_date={movie.release_date}
                    />);
                })
            }
        </div>
    );

}

export default MovieList;