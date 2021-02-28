"use strict";
const express = require("express");
const router = express.Router();
const request = require("request");

// Home page
router.get("/", async (req, res) => {
  res.render("index");
});

// Home page
router.get("/recipe/:id", async (req, res) => {
  res.render("recipe");
});

// Autocomplete options for search bar
router.get("/search", async (req, res) => {
  try {
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=99c9cad1eb524cf6b73db2fca6d61074&query=${req.query.term}&number=${req.query.limit}`;
    request(url, { json: true }, (err, _, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
      res.send(body);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Find recipes given list of ingredients
router.post("/recipes", async (req, res) => {
  try {
    const ingredients = req.body.ingredients

    const list = ingredients.map(function (key) {
      return ("+" + key + ",")        
    }).join("").slice(1, -1);

    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=99c9cad1eb524cf6b73db2fca6d61074&ingredients=${list}&number=${req.query.limit}`;
    request(url, { json: true }, (err, _, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
      res.send(JSON.stringify(body));
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
