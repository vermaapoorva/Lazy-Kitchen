"use strict";
const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", async (req, res) => {
    res.render('index')
})

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
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
