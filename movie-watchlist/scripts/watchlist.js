const watchlistSection = document.getElementById("watchlist-section");
let watchListFromLocal = [];
getLocalValue(); 

function getLocalValue() {
  if (localStorage.getItem("addedToLocalStorage")) {
    watchListFromLocal = JSON.parse(localStorage.getItem("addedToLocalStorage"));
  } else {
    watchListFromLocal = [];
  }
}

function displayWatchList() {
    let watchListHtml = watchListFromLocal
    .map((watchList) => {
      const { 0: Title, 1: Poster, 2: Plot, 3: Runtime, 4: Genre, 5: ratingObject, 6: imdbID } = watchList;
      const imdbRating = ratingObject ? ratingObject.Value : 'N/A';

      return `
      <div class="movie-list">
            <div id="movie-list-img">
                <img id="movie-img" src="${Poster}" alt="Poster of ${Title}">
            </div>
          <div id="movie-details">
                <div id="movie-name">
                    <h3 id="movie-title">${Title}</h3>
                    <i id="star-rating" class="fa-solid fa-star"></i>
                    <p id="movie-rate">${imdbRating}</p>
                </div>
                <div id="other-details">
                    <p id="movie-watch-hours">${Runtime}</p>
                    <p id="movie-genre">${Genre}</p>
                    <div>
                    <span class="remove-to-watchlist" data-imdb="${imdbID}"><img class="remove-plus" src="/images/remove.png" alt="remove from watchlist">Remove</span>
                    </div>
                </div>
                <p id="movie-description">${Plot}</p>
            </div>
        </div>
        `;
    }).join(""); 
    if (watchListHtml.trim() === '') {
      watchlistSection.innerHTML = `
      <a class="add-watchlist" href="/home.html">
          <img class="add-btn" src="/images/add.png">
          <span class="empty">Let's add movies!</span>
      </a>`;
    } else {
      watchlistSection.innerHTML = watchListHtml;
    }
    removeAddedMovie();
}

function removeAddedMovie() {
  const removeButton = document.querySelectorAll(".remove-to-watchlist")
  removeButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeMovieFromWatchlist(e.target.dataset.imdb);
    });
  });
}

function removeMovieFromWatchlist(imdbID) {
  watchListFromLocal = watchListFromLocal.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem("addedToLocalStorage", JSON.stringify(watchListFromLocal));
  displayWatchList();
}

window.addEventListener("load", displayWatchList);