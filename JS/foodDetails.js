const mealName=document.getElementById('meal-name');
const mealImg=document.getElementById('meal-image');
const instruction=document.getElementById('meal-instructions');
const ingredient=document.getElementById('meal-ingredients');
var urlParams = new URLSearchParams(window.location.search);
var searchTerm = urlParams.get('abc');
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+encodeURIComponent(searchTerm))
.then(response => response.json())
.then(data=>{
    console.log(data);

    // Get the first meal from the API response
    const meal = data.meals[0];
    mealName.innerText=meal.strMeal;
    mealImg.setAttribute('src', meal.strMealThumb);;
    instruction.innerText=meal.strInstructions;
    
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
    ingredient.innerText=ingredients.toString();
    // ingredients.innerText=data.meals[0].ingredients1+data.meals[0].ingredients2+data.meals[0].ingredients3+data.meals[0].ingredients4;
})
.catch(error=>{
    console.log(error);
})