export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];


      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  waiting() {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      `<img class="loading-img" src="assets/recipe-cook.gif" alt="wait for a while">`
    );
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div>
         <div class="error">
            <i class="fa-solid fa-bomb"></i>
            <p class="error__msg">${message}</p>
         </div>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div>
         <div class="error">
         <i class="fa-regular fa-face-smile-beam welcome__smile"></i>
         <p class="welcome__message">
           ${message}
         </p>
         </div>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
