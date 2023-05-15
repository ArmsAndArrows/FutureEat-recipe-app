class SearchView {
    _parentElement = document.querySelector('.navigation__form');
    getQuery(){
        const query = this._parentElement.querySelector('.navigation__input').value;
        this._clearInput();
        return query;
    }
    _clearInput(){
        this._parentElement.querySelector('.navigation__input').value = "";
    }
    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler();

        })
    }

}



export default new SearchView();