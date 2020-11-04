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

    // search value title
    resultHeadingEle.innerHTML = `<h2>Search results for '${searchValue}':</h2>`;

    // show search result
    if (data.meals === null) {
      resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
    } else {
      mealsEle.innerHTML = data.meals
        .map(
          (meal) =>
            `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal__img"/>
              <div class="meal__info" data-mealId="${meal.idMeal}">
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

// fetch meal by Id
async function getMealById(mealId) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await res.json();
  const meal = data.meals[0];

  addMealToDOM(meal);
}

// add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let index = 1; index < 30; index++) {
    if (!meal[`strIngredient${index}`]) break;
    ingredients.push(`${meal[`strIngredient${index}`]} - ${meal[`strMeasure${index}`]}`);
  }

  singleMealEle.innerHTML = `
    <div class="single__meal">
      <h1>${meal.strMeal}</h1>
      <img class="single__meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single__meal-info">
        ${meal.strCategory ? `<p class="single__meal-content">${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p class="single__meal-content">${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul class="ingredient">
          ${ingredients.map((ingredient) => `<li class="ingredient-item">${ingredient}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

// show detail meal
mealsEle.addEventListener("click", (e) => {
  //   console.log(" => ", e.path);
  const mealInfo = e.path.find((item) => {
    if (!item.classList) return false;
    return item.classList.contains("meal__info");
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
});

// random meals
async function getRandomMeal(e) {
  // clear meal amd heading
  mealsEle.innerHTML = "";
  resultHeadingEle.innerHTML = "";

  // check search value for empty
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const data = await res.json();
  const meal = data.meals[0];

  addMealToDOM(meal);
}

random.addEventListener("click", getRandomMeal);
