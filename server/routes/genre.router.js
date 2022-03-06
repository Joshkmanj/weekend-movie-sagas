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
  res.sendStatus(500)
});

module.exports = router;