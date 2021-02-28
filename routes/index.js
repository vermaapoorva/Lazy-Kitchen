"use strict";
const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");

// Home page
router.get("/", async (req, res) => {
  res.render("index");
});

// Recipe page
router.get("/recipe/:id", async (req, res) => {
  try {
    const api_key = config.get("RECIPES_API_KEY");
    const url = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${api_key}`;
    request(url, { json: true }, (err, _, body) => {
      if (err) {
        return console.log(err);
      }
      // res.send(body);
      const data = {
        name: body.title,
        time: body.readyInMinutes,
        servings: body.servings,
        image: body.image,
        summary: body.summary,
        ingredients: body.extendedIngredients,
        instructions: body.analyzedInstructions,
      };
      console.log(data);
      res.render("recipe", data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Autocomplete options for search bar
router.get("/search", async (req, res) => {
  try {
    const api_key = config.get("RECIPES_API_KEY");
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${api_key}&query=${req.query.term}&number=${req.query.limit}`;
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
    const ingredients = req.body.ingredients;

    const list = ingredients
      .map(function (key) {
        return "+" + key + ",";
      })
      .join("")
      .slice(1, -1);

    const api_key = config.get("RECIPES_API_KEY");
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${api_key}&ingredients=${list}&number=${req.query.limit}`;
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
