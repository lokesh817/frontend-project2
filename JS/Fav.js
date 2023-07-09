// local stored fav list
var getFavList = JSON.parse(localStorage.getItem('myFavList'));
// Get the container where the cards will be appended
const container = document.getElementById('card-container');
// function for getting all favourite items
function callApiAndDisplayResponse(element) {
    const apiURL=`https://www.themealdb.com/api/json/v1/1/search.php?s=${element}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        // Get the first meal from the API response
        const meal = data.meals[0];
        // create dom for a card and add it to our container
        const card = createCardDom(meal.strMeal,meal.strMealThumb);
        container.appendChild(card);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Function to create a card element
function createCardDom(name, imageUrl) {
    // Create the card container
    const card = document.createElement('div');
    card.classList.add('card');
  
    // Create the image element
    const image = document.createElement('img');
    image.src = imageUrl;
    card.appendChild(image);
  
    // Create the name element
    const nameElement = document.createElement('div');
    nameElement.classList.add('name');
    nameElement.textContent = name;
    nameElement.addEventListener('click',()=>{
        window.open(`FoodDetail.html?abc=${name}`)
    })
    // Create the remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('card-remove','fas', 'fa-trash');

    // Add event listener to remove the card on button click
    removeBtn.addEventListener('click', () => {
        card.remove();
        // remove deleted element from list
        const index = getFavList.indexOf(name);
        if (index !== -1) {
            getFavList.splice(index, 1);
        }
    });
    card.appendChild(nameElement);
    card.appendChild(removeBtn);
  
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
  
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });
  
    return card;
  }

getFavList.forEach(item => {
    callApiAndDisplayResponse(item);
});