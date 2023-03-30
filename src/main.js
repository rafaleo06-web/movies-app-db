const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});


async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results
  console.log(movies);;

  const trendingPreviewMoviesContainer = document.querySelector(".trendingPreview");
  trendingPreviewMoviesContainer.innerHTML=''

  movies.forEach(movie => {

    const movieContainer = document.createElement("article");
    movieContainer.classList.add("movieCategory--imgName");
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement("img");
    // movieImg.classList.add('movie-img');
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
}

async function getCategegoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;
  
  movieDetailCategoriesList.innerHTML=''

  categories.forEach(category => {
    const categoryContainer = document.createElement("button");
    // const categoryTitle = document.createElement('h3');
    categoryContainer.classList.add("category-title");
    categoryContainer.setAttribute("id", "id" + category.id);
    const categoryTitleText = document.createTextNode(category.name);

    categoryContainer.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryContainer.appendChild(categoryTitleText);
    movieDetailCategoriesList.appendChild(categoryContainer);
  });
}

async function getPopularMoviesPreview() {
  const { data } = await api('movie/popular');
  const movies = data.results;
  
  const trendingPreviewMoviesContainer =document.querySelector(".popularPreview");
  trendingPreviewMoviesContainer.innerHTML=''

  movies.forEach(movie => {

  const movieContainer = document.createElement("article");
  movieContainer.classList.add("movieCategory--imgName");
  movieContainer.addEventListener('click', () => {
    location.hash = '#movie=' + movie.id;
  });

  const movieImg = document.createElement("img");
  // movieImg.classList.add('movie-img');
  movieImg.setAttribute("alt", movie.title);
  movieImg.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/w300" + movie.poster_path
  );

  movieContainer.appendChild(movieImg);
  trendingPreviewMoviesContainer.appendChild(movieContainer);
});
}

async function getUpcomingMoviesPreview() {
  const { data } = await api('movie/upcoming');
  const movies = data.results;

  const trendingPreviewMoviesContainer =document.querySelector(".upcomingPreview");
  trendingPreviewMoviesContainer.innerHTML=''

  movies.forEach(movie => {

    const movieContainer = document.createElement("article");
    movieContainer.classList.add("movieCategory--imgName");
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement("img");
    // movieImg.classList.add('movie-img');
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
}

async function getMoviePortada() {
  const { data } = await api('movie/top_rated');
  const movies = data.results;
  
  const i=2
  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;
  moviePortada.style.backgroundImage = `url(${movieImgUrl})`;

  const roundAverage=movies[i].vote_average

  movieOveragePortada.textContent = roundAverage.toFixed(1);
  movieTitlePortada.textContent = movies[i].title;
  movieDescriptionsPortada.textContent = movies[i].overview;

  btnInfoDetails.addEventListener('click', () => {
    location.hash = '#movie=' + movies[i].id;
  });

}

async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  // const genericSection = document.querySelector('.genericList-articles');
  genericListArticles.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    genericListArticles.appendChild(movieContainer);
  });
}

async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;

  genericListArticles.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    genericListArticles.appendChild(movieContainer);
  });
}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  genericListArticles.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    genericListArticles.appendChild(movieContainer);
  });
}

async function getPopularMovies() {
  const { data } = await api('movie/popular');
  const movies = data.results;

  genericListArticles.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    genericListArticles.appendChild(movieContainer);
  });
}

async function getUpcomingMovies() {
  const { data } = await api('movie/upcoming');
  const movies = data.results;

  genericListArticles.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    genericListArticles.appendChild(movieContainer);
  });
}

async function getTopRatedMovies() {
  const { data } = await api('movie/top_rated');
  const movies = data.results;

  genericListArticles.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    genericListArticles.appendChild(movieContainer);
  });
}

async function getMovieById(id) {
  const { data: movie } = await api('movie/' + id);

  const movieImgUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
  console.log(movieImgUrl)
  imgMovieDetail.setAttribute('src', movieImgUrl);
  
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;

  const roundAverage=movie.vote_average
  movieDetailScore.textContent =roundAverage.toFixed(1);

  buttonsNameContainer.innerHTML=''
  const categories = movie.genres;
  console.log(categories);

  categories.forEach(category => {
    const categoryContainer = document.createElement("button");
    // const categoryTitle = document.createElement('h3');
    categoryContainer.classList.add("category-title");
    categoryContainer.setAttribute("id", "id" + category.id);
    const categoryTitleText = document.createTextNode(category.name);

    categoryContainer.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryContainer.appendChild(categoryTitleText);
    buttonsNameContainer.appendChild(categoryContainer);
  });

  getRelatedMoviesId(id);

//* Media Query para cambiar el border-radius de la imagen
  var x = window.matchMedia("(max-width: 480px)")//var
  function myFunction(x) {
    if (x.matches) { //Verificar si la media query coincide
      imgMovieDetail.style.borderRadius='30px'
    }else{
      imgMovieDetail.style.borderRadius='10px'
    }
  }
  myFunction(x) 
  x.addEventListener("change",myFunction)//función se ejecute cada vez que CAMBIE el estado de la MediaQuery.

}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  relatedMoviesContainer.innerHTML = '';

  relatedMovies.forEach(movie => {
    const movieContainer = document.createElement('article');
    movieContainer.classList.add('movieCategory--imgName');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    relatedMoviesContainer.appendChild(movieContainer);
  });
}


// getTrendingMoviesPreview();
// getCategegoriesPreview();
// getPopularMoviesPreview();
// getUpcomingMoviesPreview();
// getMoviePortada();