import View from "./View.js"

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe-container");
  _errorMessage = "We couldn't find that recipe. Please, try another one";
  
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler){
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.detail__button');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (+updateTo>0)handler(+updateTo);
    })
  }

  addHandlerAddBookmark(handler){
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--bookmark')
      if (!btn) return;
      handler();
    })
    
  }

  _generateMarkup() {
    return `<div class="recipe">
    <!--LOGO recipe-->
    <header class="recipe__logo">
      <img
        class="recipe__img"
        src="${this._data.image}"
        alt="${this._data.title}"
      />
      <h1 class="recipe__title">${this._data.title}</h1>
    </header>
     <!--DETAILS-->
    <div class="details">
      <div class="details__block">
        <div class="detail">
          <i class="fa-regular fa-clock"></i
          ><span class="detail__number">${this._data.cookingTime}</span
          ><span class="detail__text">minutes</span>
        </div>
        <div class="detail">
          <i class="fa-solid fa-people-group"></i>
          <span class="detail__number">${this._data.servings}</span>
          <span class="detail__text">servings</span>
          <div class="detail__servings">
            <button data-update-to="${this._data.servings - 1}" class="detail__button detail__button--decrease">-</button>
            <button data-update-to="${this._data.servings + 1}" class="detail__button detail__button--increase">+</button>
          </div>
        </div>
      </div>
      <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
            <i class="fa-solid fa-cookie"></i>
      </div>
      <button class="details__bookmark ${this._data.bookmarked ? "details__bookmark--active" : ""} btn--bookmark ">
        <i class="fa-regular fa-bookmark"></i>
      </button>
    </div>
     <!--INGREDIENTS-->
     <div class="ingredients">
      <h2 class="ingredients__title">Recipe ingredients</h2>
      <ul class="ingredients__table">
        ${this._data.ingredients
          .map(
            (el) =>
              `<li class="ingredient"><i class="fa-solid fa-check ingredient__icon"></i><span class="ingredient__number">${el.quantity ? el.quantity : " "} ${el.unit} ${
                 el.description
              }</span>
              
              </li>`
          )
          .join("")}
        
        
        


      </ul>

     </div>
     <!--HOW TO COOK IT-->
     <div class="cooking">
      <h2 class="cooking__title">How to cook it</h2>
      <p class="cooking__paragraph">This recipe was carefully designed and tested by <b>${
        this._data.publisher
      }</b>. Please check out directions at their website. </p>
      <a href="${
        this._data.sourceUrl
      }" class="cooking__btn">Directions <i class="fa-solid fa-arrow-right"></i></a>

     </div>
  </div>`;
  }
}

export default new RecipeView();
