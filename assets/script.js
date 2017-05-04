$(document).ready(function() {

//beginning array of ingredients to add to
var ingredients = ['Parsley', 'Flour', 'Shallots', 'Red Wine', 'Spinach', 'Eggs']

//make the starting buttons appear and set up to dynamically change
//taken from movie button in-class assignment
function displayIngredient(){
	var ingredient = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ingredient + "&limit=5&api_key=dc6zaTOxFJmzC";

	//get ajax
	  $.ajax({
      url: queryURL,
      method: 'GET'
      //make function taking input response and linking var results
    }).done(function(response) {
      	console.log(response);
      	var results = response.data;

      	//for loop 
     	 for (var i = 0; i < results.length; i++) {

     	//take out r rated pg13 gifs
     	if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
	      	var ingredDiv = $('<div class="ingredientPic">');

	      	//label rating for each gif
	      	var p = $("<p>").text("Rating: " + results[i].rating);
	      	var ingredientImage = $("<img data-state='still'>");

	      	ingredientImage.attr("src", results[i].images.fixed_height.url);


	      	ingredDiv.append(p);
	        ingredDiv.append(ingredientImage);
			
			$("#displayGifs").prepend(ingredDiv);
			}
  		}

      });
}


//pausing and animating function
$(".imageClass").on("click", function() {
      // var state then set data state
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

//make function to create the buttons of the original array ingredients
function renderButtons(ingredient){
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
//code that I stole from chris that I cant get working
function configImg(data, image, ingredient){
    var imageURL = data.images.fixed_height.url;
    var imageURLStill = data.images.fixed_height_still.url;
    ingredientImage.addClass("gif");
    ingredientImage.attr("src", ImageURLStill);
    ingredientImage.attr("alt", ingredient);
   ingredientImage.attr("data-state", "still");
   ingredientImage.attr("data-still", ImageURLStill);
   ingredientImage.attr("data-animate", imageURL);
};

//utilize previous function to accept new movies after submit button click
//also taken from movie button assignment
//using event to reference it on the next line ?  actually not too sure about event
$('#addIngredient').on('click', function (event){
	event.preventDefault();
	var ing= $('#ingredientInput').val().trim();
	ingredients.push(ing);
	//have to call render button function to process array
	renderButtons();
});

$(document).on("click", ".ingredientClass", displayIngredient);

renderButtons();


//pausing gifs -- go to saturday class vid @1:11



});