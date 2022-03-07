import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
//------------<  END IMPORTS  >--------------------------------

// Create the rootSaga generator function----------------------
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies); // This  fetches movie data for the '/home' page gallery
    yield takeEvery('SELECT_MOVIE', selectMovie); // This gets individual movie data for the '/details' view
}
//-------------------------------------------------------------


//---------<  S A G A S  >-----------------------------------------------------------------
function* fetchAllMovies() {
    // get all movies from the DB
    // console.log('fetchAllMovies: getting movies from database (1/2)'); // GET route test log
    try {
        const movies = yield axios.get('/api/movie');
        // console.log('fetchAllMovies: response from server (2/2):', movies.data); // GET route test log
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('fetchAllMovies: Error retrieving movies (2/2)');
    }

}
function* selectMovie(action) {
    const movieDetails = action.payload;
    console.log('SelectMovie: selecting movie, id is:', movieDetails.id);
    try {
        // yield put({ type: 'RESET_MOVIE_DETAILS'}) // This is in case there are bugs later on revolving around the movie details not being cleared out properly
        const movieGenres = yield axios.get(`/api/genre/individual/${movieDetails.id}`)
        yield put({ type: 'SET_SELECTED_MOVIE_DETAILS', payload: movieDetails})
        yield put({ type: 'SET_SELECTED_MOVIE_GENRES', payload: movieGenres.data })
    } catch {
        console.log('selectMovie: Error getting individual movie genre data');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
//---------<//  E N D   S A G A S  >--------------------------------------------------------



// --------------<  R E D U C E R S  >------------------------------------------------------
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store data from currently selected movie
const selectedMovie = (state = {
    id: '',
    title: '',
    poster: '',
    description: '',
    genres: []
}, action) => {

    if (action.type === 'SET_SELECTED_MOVIE_DETAILS') {
        const { id, title, poster, description } = action.payload;
        return {...state,
            id: id,
            title: title,
            poster: poster,
            description: description
        };
    }
    if (action.type === 'SET_SELECTED_MOVIE_GENRES') {
        const genres = action.payload;
        return {...state,
            genres: genres,
        };
    }
    if (action.type === 'RESET_MOVIE_DETAILS') {
        return {
            id: '',
            title: '',
            poster: '',
            description: '',
            genres: []};
    }
    // If action.type is anything else, it'll just return the last value of state.
    return state;
}
// --------------<// E N D   R E D U C E R S  >-------------------------------------------

// --------------<  R E D U X  S T O R E /   >--------------------------
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware
        , logger // logger tracks changes happening to reducers, it's on it's own line to easily toggle it on/off between tests
    ),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
