// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function MovieItem({movie}){

    const history = useHistory()
    const dispatch = useDispatch();
    // const [movieData , setMovieData] = useState(movie)

    function movieClick(movieObject){
        dispatch({ type:'SELECT_MOVIE', payload: movieObject}) // Movie id is sent to the saga 'selectMovie'
        history.push('/details') // On click of the movie, this brings the user to the next page
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