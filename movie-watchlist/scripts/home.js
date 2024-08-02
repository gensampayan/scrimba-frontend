import { baseURL, key } from './config.js';

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mainSection = document.getElementById("main-section");
const movies = [];
const watchlist = [];
window.addEventListener('load', () => {
    const storedWatchlist = localStorage.getItem("addedToLocalStorage");
    if (storedWatchlist) {
        watchlist.push(...JSON.parse(storedWatchlist));
        renderMovies(watchlist);
    }
});

searchForm.addEventListener("submit", handleSearch);

async function handleSearch(e) {
    e.preventDefault();
    const movie = searchInput.value.trim();
    if (movie) {
        movies.length = 0;
        await getMovies(movie);
    } else {
        displayMessage("Unable to find what you’re looking for. Please try another search.");
    }
}

async function getMovies(movieInput) {
    try {
        const timestamp = new Date().getTime(); 
        const response = await fetch(`${baseURL}?&apikey=${key}&s=${movieInput}&type=movie&_=${timestamp}`);
        const data = await response.json();

        if (data.Search) {
            movies.push(...data.Search);
            renderMovies(movies);
        } else {
            displayMessage("No movies found. Please try another search.");
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        displayMessage("An error occurred while fetching movies. Please try again later.");
    }
}

function displayMessage(message) {
    mainSection.innerHTML = `<div class="message"><p>${message}</p></div>`;
}

async function getMovieDetails(movieID) {
    try {
        const response = await fetch(`${baseURL}?&apikey=${key}&i=${movieID}`);
        const data = await response.json();
        return [data.Title, data.Poster, data.Plot, data.Runtime, data.Genre, data.Ratings[0], data.imdbID];
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

async function renderMovies(movieDisplay) {
    const movieDetails = await Promise.all(movieDisplay.map(movie => getMovieDetails(movie.imdbID)));
    const movieHtml = movieDetails.map((details) => {
        if (!details) return ''; 

        const [Title, Poster, Plot, Runtime, Genre, ratingObject, imdbID] = details;
        const imdbRating = ratingObject ? ratingObject.Value : 'N/A'; // Extract the Value property

        return `
        <div id="movie-list">
            <div id="movie-poster">
                <img id="movie-img" src="${Poster}" alt="Poster of ${Title}">
            </div>
            <div id="movie-details">
                <h3 id="movie-title">${Title}</h3>
                <img class="circle-plus" src="/images/star.png" alt="star rating">
                <p id="movie-rate">${imdbRating}</p>
                <p id="movie-watch-hours">${Runtime}</p>
                <p id="movie-genre">${Genre}</p>
                <div>
                    <span class="add-to-watchlist" data-imdb="${imdbID}"><img class="circle-plus" src="/images/add.png" alt="add to watchlist">Watchlist</span>
                </div>
                <p id="movie-description">${Plot}</p>
            </div>
        </div>
        `;
    }).join('');
    if (movieHtml.value === '') {
        mainSection.innerHTML = `
            <img class="main-icon" src="/images/cinema.png">
            <span class="empty">Let's explore some movies</span>`;
    } else {
        mainSection.innerHTML = movieHtml;
        addedMovie();
    }
}

function addedMovie() {
    const addToWatchlist = document.querySelectorAll(".add-to-watchlist");
    addToWatchlist.forEach(button => {
        button.addEventListener("click", async (e) => {  
            e.preventDefault();
            if (e.target.dataset.imdb) {
                const movieDetails = await getMovieDetails(e.target.dataset.imdb);
                if (movieDetails) {
                    watchlist.push({
                        imdbID: e.target.dataset.imdb,
                        ...movieDetails
                    });
                    localStorage.setItem("addedToLocalStorage", JSON.stringify(watchlist));
                    button.textContent = "✅ Added";
                }
            }
        });
    });
} 



