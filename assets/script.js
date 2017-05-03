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
      	var results = response.data;
     	 for (var i = 0; i < results.length; i++) {
      	var ingredDiv = $('<div class="ingredientClass">');
      	var p = $("<p>").text("Rating: " + results[i].rating);
      	var ingredientImage = $("<img>");
      	ingredientImage.attr("src", results[i].images.fixed_height.url);

      	ingredDiv.append(p);
        ingredDiv.append(ingredientImage);
		
		$("#displayGifs").prepend(ingredDiv);
  		}

      });
}


//make function to create the buttons of the original array ingredients
function renderButtons(){
	//making where the buttons get dumped not have duplicates
	//starting with an empty div
	$('#ingredientView').empty();

	//dynamic for loop to go through globa var array and get the button info
	for (var i = 0; i < ingredients.length; i++) {
		//adding button to html
		var newButton = $('<button>');
		//adding class in html to button
		newButton.addClass('ingredientClass');
		//adding data-name attribute to each button
		newButton.attr('data-name' , ingredients[i]);
		//dynamic functionality that each button's type will be displayed as text
		newButton.text(ingredients[i]);
		//taking the newButton var we just made and putting it into the html div
		$('#ingredientView').append(newButton);
		//making sure it works
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