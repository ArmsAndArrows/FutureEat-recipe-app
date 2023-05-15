import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
      <a href="#${result.id}" class="preview__link">
        <figure class="preview__fig">
          <img class="preview__img" src="${result.image}" alt="test">
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            
          </div>
          <div class="preview__user-generated">
          <i class="fa-solid fa-cookie"></i>
          </div>

        </figure>
      </a>
    </li>
      `;
  }
}

export default new BookmarksView();
