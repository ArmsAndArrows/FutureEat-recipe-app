import View from "./View.js";
class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = "No recipes found for your query! Please, try again ;)";

    _generateMarkup(){
        return this._data.map(this._generateMarkupPreview).join('');
       
    }
    _generateMarkupPreview(result){
      const id = window.location.hash.slice(1);
        return ` <li class="preview">
        <a href="#${result.id}" class="preview__link ${result.id === id ? 'preview__link--active' : ""
        }">
          <figure class="preview__fig">
            <img class="preview__img" src="${result.image}" alt="${result.title}">
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher  }</p>
              
            </div>
            <div class="preview__user-generated">
              <i class="fa-solid fa-cookie"></i>
            </div>

          </figure>
        </a>
      </li>
        `  
    }

}

export default new ResultsView(); 