
// Declare and initialize variables
let data1 = false; // Flag variable
let searchBox = document.getElementById('search-box'); // Get search box element
let searchResultListLink = []; // Array to store search result links
let favMealList = []; // Array to store favorite meals

// Convert favMealList array to a string and save it to localStorage
localStorage.setItem('myFavList', JSON.stringify(favMealList));

// Add input event listener to search box
searchBox.addEventListener('input', function() {
  let search_field = document.getElementById('search-box'); // Get search box element
  let searchTerm = search_field.value; // Get the entered search term

  // Clear search results if search term is empty or contains only spaces
  if (searchTerm == ' ' || searchTerm == '') {
    const searchList = document.getElementById('search-results'); // Get search results list element
    searchList.innerHTML = ''; // Clear the search results list
    return;
  }

  // Fetch search results from the API based on the search term
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(searchTerm))
    .then(response => response.json())
    .then(data => {
      const ulElement = document.getElementById('search-results'); // Get search results list element
      ulElement.innerHTML = ''; // Clear previous search results

      // Iterate over each meal in the search results
      if (data.meals != null) {
        data.meals.forEach(meal => {
          // Create list item, anchor, and input elements for each search result
          const liElement = document.createElement('li');
          const aElement = document.createElement('a');
          const inputElement = document.createElement('input');

          aElement.href = meal.strMeal; // Set the URL for each search result
          inputElement.type = 'text';
          inputElement.value = meal.strMeal; // Set the text for each search result

          liElement.classList.add('list-item'); // Add class to list item
          aElement.appendChild(inputElement); // Append input element to anchor
          liElement.appendChild(aElement); // Append anchor to list item
          ulElement.appendChild(liElement); // Append list item to search results list
        });
      }
    })
    .then(() => {
      // Add click event listener to each search result link
      searchResultListLink = document.querySelectorAll('#search-results li a');
      if (searchResultListLink != null) {
        console.log(searchResultListLink);
        searchResultListLink.forEach((Link) => {
          Link.addEventListener('click', function(e) {
            e.preventDefault();
            const strVal = Link.href.split('/');
            const searchTerm = strVal[strVal.length - 1];
            window.open(`FoodDetail.html?abc=${searchTerm}`);
          });
        });
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the API call
      console.log(error);
    });
});

let details = document.getElementById('detail'); // Get detail element
if (data1 != false) {
  details.innerText = JSON.stringify(data1); // Display data1 as a string in the detail element
}
