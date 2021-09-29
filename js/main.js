const elMoviesList = document.querySelector('.movies__list');

const elMovieTemplate = document.querySelector('#movie-template').content

const elMovieSearchForm = document.querySelector('.js-search-form')
const elMovieSearchInput = elMovieSearchForm.querySelector('.js-search-input')
const elMovieSearchButton = elMovieSearchForm.querySelector('.js-search-button')

function getFetch (title) {
  fetch(`http://www.omdbapi.com/?s=${title}&apikey=c46b8ec4`)
  .then(response => response.json())
  .then(data => {
    if (data.Response === 'True') {
      showMovies(data.Search)
    }
  });
}

function showMovies (getFetch) {
  elMoviesList.innerHTML = ''
  let elementFragment = document.createDocumentFragment()
  for (const movie of getFetch) {
    let templateClone = elMovieTemplate.cloneNode(true)

    templateClone.querySelector('.movie__card').dataset.imdbId = movie.imdbID
    templateClone.querySelector('.movie__poster').src = movie.Poster
    templateClone.querySelector('.movie__title').textContent = movie.Title
    templateClone.querySelector('.movie__year').textContent = movie.Year
    templateClone.querySelector('.movie__year').datetime = movie.Year
    templateClone.querySelector('.movie__type').textContent = movie.Type

    elementFragment.appendChild(templateClone)
  }
  elMoviesList.appendChild(elementFragment)
  elMovieSearchInput.value = ''

}

if (elMovieSearchForm) {
  elMovieSearchForm.addEventListener('submit', function(evt) {
    evt.preventDefault()
    elMoviesList.innerHTML = '<span style="color: orangered;">movies are coming...</span>'
    let elMovieSearchInputVal = elMovieSearchInput.value
    
    getFetch(elMovieSearchInputVal)
 
  })
}
