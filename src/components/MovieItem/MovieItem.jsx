import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieItem({movie}){

    const dispatch = useDispatch();
    // const [movieData , setMovieData] = useState(movie)

    function movieClick(movieObject){
        dispatch({ type:'SELECT_MOVIE', payload: movieObject}) // Movie id is sent to the saga 'selectMovie'
    }


    // console.log('MovieItem component recieves this prop:', movie); // Test log to ensure GET request data is making it here.
    return (
        <div className='card'
        onClick={()=>{movieClick(movie)}} // On click, movie data is sent to function above
        >
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    );
}
export default MovieItem;