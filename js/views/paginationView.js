import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pages");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".inline-btn");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and more pages exist

    if (currentPage === 1 && numPages > 1) {
      return `<div></div> <button data-goto="${
        currentPage + 1
      }" class="inline-btn inline-btn--next"><span>Page ${
        currentPage + 1
      } </span><i class="fa-solid fa-arrow-right"></i></button>`;
    }

    //last page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currentPage - 1
      }" class="inline-btn inline-btn--prev"><i class="fa-solid fa-arrow-left"></i><span> Page ${
        currentPage - 1
      }</span></button>`;
    }

    //other page
    if (currentPage < numPages) {
      return `<button data-goto="${
        currentPage - 1
      }" class="inline-btn inline-btn--prev"><i class="fa-solid fa-arrow-left"></i><span> Page ${
        currentPage - 1
      }</span></button><button data-goto="${
        currentPage + 1
      }" class="inline-btn inline-btn--next"><span>Page ${
        currentPage + 1
      } </span><i class="fa-solid fa-arrow-right"></i></button>`;
    }

    //page1 and no pages exist
    return "";
  }
}

export default new PaginationView();
