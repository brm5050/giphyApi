$(document).ready(function() {

//beginning array of ingredients to add to
var ingredients = ['Parsley', 'Flour', 'Shallots', 'Red Wine', 'Spinach', 'Eggs']

//make the starting buttons appear and set up to dynamically change
//taken from movie button in-class assignment
function displayIngredient(){
	var ingredient = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ingredient + "&api_key=dc6zaTOxFJmzC";

	  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);

      var ingredDiv = $('<div class="ingredientClass">');
      //add rating and other data

      
      });
}

function renderButtons(){
	$('#ingredientView').empty();

	for (var i = 0; i < ingredients.length; i++) {
		var newButton = $('<button>');
		newButton.addClass('ingredientClass');
		newButton.attr('data-name' , ingredients[i]);
		newButton.text(ingredients[i]);
		$('#ingredientView').append(newButton);
		console.log(newButton);
	}

}


//utilize previous function to accept new movies after submit button click
//also taken from movie button assignment
$('#addIngredient').on('click', function (event){
	event.preventDefault();
	var ing= $('#ingredientInput').val().trim();
	ingredients.push(ing);
	//have to call render button function to process array
	renderButtons();
});

$(document).on("click", ".ingredientClass", displayIngredient);

renderButtons();


//pausing gifs -- go to saturday class @1:11



});