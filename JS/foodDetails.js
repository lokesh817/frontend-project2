// Get DOM elements
const mealName = document.getElementById('meal-name');
const mealImg = document.getElementById('meal-image');
const instruction = document.getElementById('meal-instructions');
const ingredient = document.getElementById('meal-ingredients');

// Get the search term from URL parameter
var urlParams = new URLSearchParams(window.location.search);
var searchTerm = urlParams.get('abc');

// Fetch meal details from API based on the search term
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(searchTerm))
  .then(response => response.json())
  .then(data => {
    // Get the first meal from the API response
    const meal = data.meals[0];

    // Set the meal name, image, instructions, and ingredients
    mealName.innerText = meal.strMeal;
    mealImg.setAttribute('src', meal.strMealThumb);
    instruction.innerText = meal.strInstructions;

    // Extract the ingredient keys and values
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      const ingredient = meal[ingredientKey];
      const measure = meal[measureKey];
      if (ingredient) {
        const ingredientWithMeasure = measure ? `${measure} ${ingredient}` : ingredient;
        ingredients.push(ingredientWithMeasure);
      } else {
        break;
      }
    }
    ingredient.innerText = ingredients.toString();
  })
  .catch(error => {
    console.log(error);
  });

// Attach the click event listener to the favorite button
let favButton = document.getElementById('add-to-favorites');
console.log('favButton', favButton);
favButton.addEventListener('click', handleFavoriteClick);

// Function to handle the favorite button click
function handleFavoriteClick(e) {
  e.preventDefault();

  // Retrieve the favorite list from localStorage
  var getFavList = JSON.parse(localStorage.getItem('myFavList'));

  // Check if the search term is already in the favorite list
  if (getFavList.includes(searchTerm)) {
    // Disable the button if already in favorites
    favButton.disabled = true;
  } else {
    // Add the search term to the favorite list and update localStorage
    getFavList.push(searchTerm);
    console.log("GetFavList:", getFavList);
    localStorage.setItem('myFavList', JSON.stringify(getFavList));
  }
}
