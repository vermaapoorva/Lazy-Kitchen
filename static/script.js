var ingredientsSelected = [];

// different fucntions to redirect : .navigate() , .assign()

$(document).ready(function () {
    console.log("running");
  $("#dropdownMenu").autocomplete({
    source: async function (request, response) {
      let data = await fetch(
        `http://localhost:5000/search?term=${request.term}&limit=3`
      )
        .then((results) => results.json())
        .then((results) =>
          results.map((result) => {
            return { label: result.name, value: result.name };
          })
        );
      response(data);
    },
    minLength: 2,
    select: function(event, ui){
      console.log(ui.item)
    }
  });
});

/*
function:
  autocomplete - get dropdown options from backend
  select from dropdown - add selected item to ingredientsSelected
  remove ingredient - remove ingredient from selected items
  update recipes - show recipes using ingredientsSelected       
*/