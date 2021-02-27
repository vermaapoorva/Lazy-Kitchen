"use strict";
const express = require("express");
const router = express.Router();
const request = require("request");

// Home page
router.get("/", async (req, res) => {
    res.render('index')
})

// Autocomplete options for search bar
router.get("/search", async (req, res) => {
  try {

    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=d374f44f9499470bad8a14160bfcfb9e&query=${req.query.term}&number=${req.query.limit}`

    if (true) {
      request(url, { json: true }, (err, _, body) => {
        if (err) {
          return console.log(err);
        }
        console.log(body);
        res.send(body);
      });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// // Find recipes given list of ingredients
// router

module.exports = router;
