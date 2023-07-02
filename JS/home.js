let data1=false;
let searchBox=document.getElementById('search-box');
let searchResultListLink=[];
searchBox.addEventListener('input',function(){
    let search_field= document.getElementById('search-box');
    let searchTerm=search_field.value;
    if(searchTerm==' ' || searchTerm==''){
      const searchList = document.getElementById('search-results');
      searchList.innerHTML='';
      return;
    }
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+encodeURIComponent(searchTerm))
    .then(response => response.json())
    .then(data => {
      const ulElement = document.getElementById('search-results'); // Replace 'myUl' with the ID of your <ul> element
      ulElement.innerHTML = ''; // Clear previous results
      // searchResultList=[];//clear previous results
      data.meals.forEach(meal => {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        const inputElement = document.createElement('input');

        aElement.href = meal.strMeal; // Replace 'meal.strMeal' with the property that contains the URL for each search result
        // aElement.textContent = meal.strMeal; // Replace 'meal.strMeal' with the property that contains the text for each search result

        inputElement.type = 'text';
        inputElement.value = meal.strMeal; // Replace 'meal.strMeal' with the property that contains the text for each search result
        liElement.classList.add('list-item');
        aElement.appendChild(inputElement);
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
        
      });
    })
    .then(()=>{
      searchResultListLink=document.querySelectorAll('#search-results li a');
      if(searchResultListLink!=null){
        console.log(searchResultListLink);
        searchResultListLink.forEach((Link)=>{
        Link.addEventListener('click',function(e){
          e.preventDefault();
          const strVal=Link.href.split('/');
          const searchTerm=strVal[strVal.length-1];
          window.open(`FoodDetail.html?abc=${searchTerm}`,'_blank')
        })
      })
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the API cal
      console.log(error);
    });
    // console.log(searchResultList);
});
let details=document.getElementById('detail');
if(data1!=false){
  details.innerText=JSON.stringfy(data1);
}