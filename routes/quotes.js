const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(quotes.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

router.get('/:id', function(req, res, next) {
  id=req.params.id
  try {
    res.json(quotes.getById(id));
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

/* POST quote */
router.post('/', function(req, res, next) {
  try {
    res.json(quotes.create(req.body));
  } catch(err) {
    console.error(`Error while adding quotes `, err.message);
    next(err);
  }
});

router.delete('/:id', function(req, res, next) {
  id=req.params.id;
  try {
    res.json(quotes.deleteQuote(id));
    res.status(200).json("delete success")
    console.log("delete success")
  } catch(err) {
    console.error(`Error while adding quotes `, err.message);
    next(err);
  }
});

module.exports = router;