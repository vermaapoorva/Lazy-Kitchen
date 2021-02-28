var ingredients = { ingredients: [] };

// Maybe switch to using axios if time

/*
Autocomplete function
Get options for dropdown menu
*/
$(document).ready(function () {
  $("#dropdownMenu").autocomplete({
    source: async function (request, response) {
      let data = await fetch(
        `http://localhost:5000/search?term=${request.term}&limit=3`
      )
        .then((results) => results.json())
        .then((results) =>
          results.map((result) => {
            return { value: result.name };
          })
        );
      response(data);
    },
    minLength: 2,
    select: function (event, ui) {
      addIngredient(ui.item.value);
    },
  });
});

/*
Select from dropdown menu
Add selection to ingredients
*/
function addIngredient(name) {
  /*
  when option selected:
  get text from option
  store that option in ingredients
  updateRecipes()
  */
  ingredients.ingredients.push(name);
  console.log(JSON.stringify(ingredients));
  updateIngredients();
  updateRecipes();
}

/*
Delete ingredient on page
Delete ingredient from ingredients
*/
function deleteIngredient(ingredient) {
  /*
  when option in ingredients is selected
  delete from ingredients
  updateRecipes()
  */

  console.log("DELETING " + ingredient);
  var filtered = ingredients.ingredients.filter(function(value, index, arr){ 
      return value != ingredient;
  });
  ingredients.ingredients = filtered;
  updateIngredients();
}

/*
Update recipes
Render recipes using current ingredients
*/
function updateRecipes() {
  /*
  live update 
  when called brings top -- recipes
  sort - (according to what?)
  call to backend- list of receipes to display on front
  */
  var recipes = null;
  axios.post("http://localhost:5000/recipes?limit=5", ingredients, JSON).then(
    (response) => {
      displayRecipes(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}

function displayRecipes(recipes) {
  console.log(recipes);
  $(".recipes").children("div").remove();
  recipes.forEach((r) => {
    $(".recipes").append(`<div class="recipe" onClick=goToRecipe(${r.id})>
                          <h2>${r.title}</h2>
                          <img src = ${r.image}></img>
                        </div>`);
  });
}

/*
Update ingredients
Render ingredients using current ingredients
*/
function updateIngredients(name) {
  $(".ingredients").children("div").remove();
  ingredients.ingredients.forEach((i) => {
    $(".ingredients").append(`<div class = "ingredient"> <p class="ing">${i}
  </p><button class="btn" onClick="deleteIngredient(\'${i}\')"><i class="fa fa-close"></i></button></div>`);
  });
  updateRecipes();
}

function goToRecipe(id){
  window.location = `http://localhost:5000/recipe/${id}`
}

/*
function:
  DONE autocomplete - get dropdown options from backend
  DONE select from dropdown - add selected item to ingredients
  DONE remove ingredient - remove ingredient from selected items
  DONE update recipes - show recipes using ingredients       
*/

/*
TODO:
recipe.html

name
pic

summary

ingredients

instructions

*/
