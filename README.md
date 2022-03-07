# SAGAS MOVIE GALLERY

## Description

_Duration: Weekend Sprint_

This project was started in order to solidify my knowledge of Redux, Sagas, and advanced SQL queries.

On page load of the home page, all the movies' data gets loaded except for the genres associated with each movie. On click of a movie, a Saga is called that stores those details in a reducer, while a GET request is made to the server that joins three data tables to retrieve the correlating genre data. The movie genre data is then sent to the same movie reducer where it is stored. During this time, the user is redirected to the '/details' page, where all of this data is displayed on the DOM. On click of the return button returns the user to the home page.

I used CSS grid to structure the cards in the gallery, as well as the '/details' page.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

1. Create a database named `saga_movies_weekend`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Set up the database, start the server and client.
2. On page load, look through the gallery of movies, and select one.
3. Read through the description, and click on the return button to return home.
4. Check out the other movies and descriptions, enjoy!

## Built With

Node.js
Express
React
Redux
Sagas
Axios
PostgresQL


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. I'd also like to thank my family and friends for their ongoing support.

## Support
If you have suggestions or issues, please email me at krale006@umn.edu.