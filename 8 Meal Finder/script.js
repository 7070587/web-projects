const submiy = document.getElementById("submiy"),
  search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  resultHeadingEle = document.getElementById("result-heading"),
  mealsEle = document.getElementById("meals"),
  singleMealEle = document.getElementById("single-meal");

//search meal and fetch from api
async function searchMeal(e) {
  e.preventDefault();

  // clear single meal
  singleMealEle.innerHTML = "";

  // get search value
  const searchValue = search.value;

  // check search value for empty
  if (searchValue.trim()) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const data = await res.json();
    // console.log("data => ", data);

    // search value title
    resultHeadingEle.innerHTML = `<h2>Search results for '${searchValue}':</h2>`;

    // show search result
    if (data.meals === null) {
      resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
    } else {
      console.log(" => ", data.meals);
      mealsEle.innerHTML = data.meals
        .map(
          (meal) =>
            `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal__img"/>
              <div class="meal__info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
        )
        .join("");
    }
  } else {
    alert("Please enter a search term");
  }
}

submit.addEventListener("submit", searchMeal);
