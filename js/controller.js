import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import ResultsView from "./views/resultsView.js";
import PaginationView from "./views/paginationView.js";
import BookmarksView from "./views/bookmarksView.js";
import AddRecipeView from "./views/addRecipeView.js";

const controlRecipes = async function () {
  //1. LOADING
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.waiting();

    ResultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);

    //2. RENDERING
    RecipeView.render(model.state.recipe);
    BookmarksView.update(model.state.bookmarks);
    document
      .querySelector(".search-results")
      .classList.remove("search-results--mobile");
  } catch (err) {
    console.log(err);
    RecipeView.renderError(
      `We could not find that recipe. Please Try another one!`
    );
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;
    ResultsView.waiting();
    document
      .querySelector(".search-results")
      .classList.add("search-results--mobile");
    await model.loadSearchResults(query);

    ResultsView.render(model.getSearchResultsPage(1));

    BookmarksView.update(model.state.bookmarks);

    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    RecipeView.renderError(`${err}`);
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update recipe servings in state
  model.updateServings(newServings);

  //update the recipe view
  RecipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  RecipeView.update(model.state.recipe);

  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    AddRecipeView.waiting();

    await model.uploadRecipe(newRecipe);
    RecipeView.render(model.state.recipe);
    AddRecipeView.renderMessage();

    BookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    console.log(err);
    AddRecipeView.renderError(err.message);
    setTimeout(function () {
      location.reload();
    }, 5000);
  }
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
