const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  res.sendStatus(500)
});

// This gets the individual movie's genre data.
router.get('/individual/:id', (req, res) => {
  console.log('Getting genre for movie ID:', req.params);
  let movieId = req.params.id

  // This query text gets the genres of the specified movie ID
  let queryText = `SELECT "genres"."name" FROM "genres"
JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genre_id"
JOIN "movies" ON "movies_genres"."movie_id"= "movies"."id"
WHERE "movies"."id" = $1;`;

  // This is experimental queryText, it overcomplicates the problem a little bit so it won't be implemented
  // let queryText = `SELECT "m"."id", "m"."title", "m"."poster", "m"."description", array(SELECT "genres"."name" FROM "movies" AS "m" JOIN "movies_genres" AS "mg" ON "m"."id" = "mg"."movie_id" JOIN "genres" ON "mg"."genre_id"="genres"."id" WHERE "m"."id" = $1)
  // FROM "movies" AS "m" JOIN "movies_genres" AS "mg" ON "m"."id" = "mg"."movie_id" JOIN "genres" ON "mg"."genre_id"="genres"."id" WHERE "m"."id" = $1
  // GROUP BY "m"."id", "m"."title", "m"."poster", "m"."description";`;

  pool.query(queryText, [movieId])
    .then(response => {
      console.log('Server response', response.rows);
      res.send(response.rows)
    }).catch(error => {
      res.sendStatus(500)
    })
});

module.exports = router;