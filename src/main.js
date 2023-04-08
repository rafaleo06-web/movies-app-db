/* let lang = localStorage.language;
console.log(lang);
language_Select.value = lang !== "" ? lang : "en";//si LANG es diferente de vacio, value de LANG is assigned lan.value
//but if LANG is empty, value of lan.value is assigned "en"

language_Select.addEventListener("change", (e) => {
  lang = e.target.value;
  localStorage.setItem('language', language_Select.value);
  location.reload();//reload page actual to browser
});
 */

let lang = navigator.language;
language_Select.value = lang !== "" ? lang : "en";
console.log(lang);


language_Select.addEventListener("change", (e) => {
  lang = e.target.value;
  api.defaults.params.language = lang;//update param language AXIOS
  homePage()
});

//*-------------- AXIOS -------------------
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: lang,
  },
});
//*----------------------------------------

//TODO:----------- INTERSECTION OBSERVER ------
let loadImage = (entries, observer) => {
  //entries: array de elementos que se están observando. observer: objeto IntersectionObserver que se está utilizando para observar los elementos.
  //console.log(entries, { observer }); //[IntersectionObserverEntry] , {observer: IntersectionObserver }

  //CALLBACK verifica si el elemento está intersectando con la región utilizando la propiedad isIntersecting de la entrada (en este caso, la imagen). Si es así, se asume que el elemento es visible en la pantalla y se carga la imagen.
  entries.forEach((element) => {
    if (element.isIntersecting) {
      const image = element.target; //guarda una referencia a la imagen en la variable image => img html
      image.src = image.dataset.src; //se actualiza el atributo src de la imagen con el valor de data-src,
      //el atributo src, el navegador descarga la imagen automáticamente Y cuando se utiliza data-src, el navegador no descarga la imagen automáticamente, sino que se utiliza JavaScript para cargarla cuando sea necesario.
    }
  });
};
/* se utiliza img.dataset.src para obtener la URL de la imagen almacenada en data-src. Luego, se actualiza el atributo src de la imagen con esta URL para que el navegador pueda cargar la imagen y mostrarla en la página. */

let observer = new IntersectionObserver(loadImage); //función (callback) que se ejecutará cuando se detecte un cambio en la intersección.
//observer: objeto IntersectionObserver que se está utilizando para observar los elementos.
/* observer.observe(movieImg); */ //elemento que se desea observar
//TODO:------------------------

//------------- LOCAL STORAGE -----------------
function likedMoviesList() {
  //*stringify '{ "76600":{} }' => primera vez
  //* item a object(JSON.PARSE()) para poder agregar
  const item = JSON.parse(localStorage.getItem("liked_movies")); //*stringify '{ "76600":{} }'
  let movies;
  if (item) {
    // stringify
    //si LOCALSTORAGE tiene algo, return MOVIE
    movies = item;
  } else {
    // sino object empty
    movies = {}; //[] arr seria dificial acceder
  }
  return movies;
}

function likemovie(movie) {
  const likedMovies = likedMoviesList();
  console.log(likedMovies);

  if (likedMovies[movie.id]) {
    //si likedMovies tiene la propiedad {movie.id}, likedMovies OBJECT converted
    console.log("the movie is already LOCALSTORAGE");
    likedMovies[movie.id] = undefined;
  } else {
    console.log("the movie is not LOCALSTORAGE");
    //* likedMovies tiene que ser OBJECT para poder AGRGAR, no STRINGIFY
    likedMovies[movie.id] = movie; //movie = info completa
  }
  localStorage.setItem("liked_movies", JSON.stringify(likedMovies)); //'{ "76600":{}, "958196":{} }'
}
//--------------------------------------------

function createMovies(movies, container, { clean = true } = {}) {
  if (clean) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("article");
    movieContainer.classList.add("movieCategory--imgName");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movieImg = document.createElement("img");
    // movieImg.classList.add('movie-img');

    movieImg.setAttribute("alt", movie.title);
    // movieImg.setAttribute(
    //   "src", //SRC navegador descarga la imagen automáticamente
    //   "https://image.tmdb.org/t/p/w300" + movie.poster_path
    // );
    movieImg.setAttribute(
      "data-src", //DATA-SRC el navegador no descarga la imagen automáticamente, sino que se utiliza JavaScript para cargarla cuando sea necesario.
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    //image not found
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute("src", "../img/nodisponible.png");
      movieImg.style.width = "160px";
      movieImg.style.height = "230px";
    });
    
    //image ZOOM on hover
    movieImg.style.transition = "transform 0.5s ease-out";
    movieImg.addEventListener("mouseover", function() {
      movieImg.style.transform = "scale(1.2)"; //10%
    });

    movieImg.addEventListener("mouseout", function() {
      movieImg.style.transform = "scale(1)";
    });

    //* movie liked
    const movieBtn = document.createElement("button");
    movieBtn.classList.add("movie-btn");
    //-------------------------------
    //TODO: likedMoviesList() return OBJECT with KEY=idMovie, likedMoviesList()[movie.id] return VALUE respect to KEY
    //* movie.id is already in LOCAL_STORAGE (true) => add class
    if (likedMoviesList()[movie.id]) {
      movieBtn.classList.add("movie-btn--liked");
    }
    movieBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      movieBtn.classList.toggle("movie-btn--liked");
      likemovie(movie); //liked LOCAL_STORAGE
      homePage();
    });

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
    container.appendChild(movieContainer);

    observer.observe(movieImg);
  });
}

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  console.log(movies);

  createMovies(movies, trendingPreview);
}

async function getCategegoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  movieDetailCategoriesList.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("button");
    // const categoryTitle = document.createElement('h3');
    categoryContainer.classList.add("category-title");
    categoryContainer.setAttribute("id", "id" + category.id);
    const categoryTitleText = document.createTextNode(category.name);

    categoryContainer.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryContainer.appendChild(categoryTitleText);
    movieDetailCategoriesList.appendChild(categoryContainer);
  });
}

async function getPopularMoviesPreview() {
  const { data } = await api("movie/popular");
  const movies = data.results;

  createMovies(movies, popularPreview);
}

async function getUpcomingMoviesPreview() {
  const { data } = await api("movie/upcoming");
  const movies = data.results;

  createMovies(movies, upcomingPreview);
}

async function getMoviePortada() {
  const { data } = await api("movie/top_rated");
  const movies = data.results;

  const i = 2;
  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;
  moviePortada.style.backgroundImage = `url(${movieImgUrl})`;

  const roundAverage = movies[i].vote_average;

  movieOveragePortada.innerHTML = roundAverage.toFixed(1);
  movieTitlePortada.innerHTML = movies[i].title;
  movieDescriptionsPortada.innerHTML = movies[i].overview;

  btnInfoDetails.addEventListener("click", () => {
    location.hash = "#movie=" + movies[i].id;
  });
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;

  // const genericSection = document.querySelector('.genericList-articles');
  createMovies(movies, genericListArticles, { clean: true });
}

function getPaginatedCategoryClosures(id) {
  return async function () {
    //scrollTop: cantidad de pixeles que se han desplazado desde el inicio de la página
    //clientHeight: altura TOTAL de la ventana del navegador
    //scrollHeight: cantidad total de pixeles que se pueden desplazar en la página
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("discover/movie", {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;

      createMovies(movies, genericListArticles, { clean: false });
    }

    // const containerButton = document.createElement("div");
    // const btnLoadMore = document.createElement("button");
    // btnLoadMore.innerText = "Load More";

    // containerButton.classList.add("section-movieCategory--name");
    // containerButton.style.width = "80px";
    // containerButton.style.display = "block";

    // containerButton.appendChild(btnLoadMore);
    // genericListArticles.appendChild(containerButton);
  };
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericListArticles, { clean: false });
}

function getPaginatedSearchClosures(query) {
  return async function () {
    //scrollTop: cantidad de pixeles que se han desplazado desde el inicio de la página
    //clientHeight: altura TOTAL de la ventana del navegador
    //scrollHeight: cantidad total de pixeles que se pueden desplazar en la página
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("search/movie", {
        params: {
          query,
          page,
        },
      });
      const movies = data.results;

      createMovies(movies, genericListArticles, { clean: false });
    }

    // const containerButton = document.createElement("div");
    // const btnLoadMore = document.createElement("button");
    // btnLoadMore.innerText = "Load More";

    // containerButton.classList.add("section-movieCategory--name");
    // containerButton.style.width = "80px";
    // containerButton.style.display = "block";

    // containerButton.appendChild(btnLoadMore);
    // genericListArticles.appendChild(containerButton);
  };
}

/* async function getTrendingMovies(page = 1) {
  const { data } = await api("trending/movie/day", {
    params: {
      page,
    },
  });
  const movies = data.results;

  //*page=1 (TRUE), se limpia el contenedor. page=2,3,4.. (FALSE), NO se limpia el contenedor.SE ACUMULAN
  createMovies(movies, genericListArticles, { clean: page == 1 }); //clean se establece en TRUE si page es igual a 1, SINO, se establece en false

  const containerButton = document.createElement("div");
  const btnLoadMore = document.createElement("button");
  btnLoadMore.innerText = "Load More";

  containerButton.classList.add("section-movieCategory--name");
  containerButton.style.width = "80px";
  containerButton.style.display = "block";

  containerButton.appendChild(btnLoadMore);
  genericListArticles.appendChild(containerButton);

  btnLoadMore.addEventListener("click", () => {
    containerButton.remove();
    getTrendingMovies(page + 1);
  });
} */

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  maxPage = data.total_pages; //1000

  createMovies(movies, genericListArticles, { clean: true }); //clean: innerHTML= " "

  /*   const containerButton = document.createElement("div");
  const btnLoadMore = document.createElement("button");
  btnLoadMore.innerText = "Load More";

  containerButton.classList.add("section-movieCategory--name");
  containerButton.style.width = "80px";
  containerButton.style.display = "block";

  containerButton.appendChild(btnLoadMore);
  genericListArticles.appendChild(containerButton); */
}

async function getPaginatedTrendingMovies() {
  //scrollTop: cantidad de pixeles que se han desplazado desde el inicio de la página
  //clientHeight: altura TOTAL de la ventana del navegador
  //scrollHeight: cantidad total de pixeles que se pueden desplazar en la página
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const pageIsNotMax = page < maxPage;

  if (pageIsNotMax && scrollIsBottom) {
    page++;
    const { data } = await api("trending/movie/day", {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericListArticles, { clean: false });
  }

  /*   const containerButton = document.createElement("div");
  const btnLoadMore = document.createElement("button");
  btnLoadMore.innerText = "Load More";

  containerButton.classList.add("section-movieCategory--name");
  containerButton.style.width = "80px";
  containerButton.style.display = "block";

  containerButton.appendChild(btnLoadMore);
  genericListArticles.appendChild(containerButton); */
}

async function getPopularMovies() {
  const { data } = await api("movie/popular");
  const movies = data.results;

  createMovies(movies, genericListArticles, { clean: true });
}

async function getPaginatedPopularMovies() {
  //scrollTop: cantidad de pixeles que se han desplazado desde el inicio de la página
  //clientHeight: altura TOTAL de la ventana del navegador
  //scrollHeight: cantidad total de pixeles que se pueden desplazar en la página
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api("movie/popular", {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericListArticles, { clean: false });
  }

  // const containerButton = document.createElement("div");
  // const btnLoadMore = document.createElement("button");
  // btnLoadMore.innerText = "Load More";

  // containerButton.classList.add("section-movieCategory--name");
  // containerButton.style.width = "80px";
  // containerButton.style.display = "block";

  // containerButton.appendChild(btnLoadMore);
  // genericListArticles.appendChild(containerButton);
}

async function getUpcomingMovies() {
  const { data } = await api("movie/upcoming");
  const movies = data.results;

  createMovies(movies, genericListArticles);
}

async function getPaginatedUpcomingMovies() {
  //scrollTop: cantidad de pixeles que se han desplazado desde el inicio de la página
  //clientHeight: altura TOTAL de la ventana del navegador
  //scrollHeight: cantidad total de pixeles que se pueden desplazar en la página
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api("movie/upcoming", {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericListArticles, { clean: false });
  }

  // const containerButton = document.createElement("div");
  // const btnLoadMore = document.createElement("button");
  // btnLoadMore.innerText = "Load More";

  // containerButton.classList.add("section-movieCategory--name");
  // containerButton.style.width = "80px";
  // containerButton.style.display = "block";

  // containerButton.appendChild(btnLoadMore);
  // genericListArticles.appendChild(containerButton);
}

async function getTopRatedMovies() {
  const { data } = await api("movie/top_rated");
  const movies = data.results;

  createMovies(movies, genericListArticles);
}

async function getPaginatedTopRatedMovies() {
  //scrollTop: cantidad de pixeles que se han desplazado desde el inicio de la página
  //clientHeight: altura TOTAL de la ventana del navegador
  //scrollHeight: cantidad total de pixeles que se pueden desplazar en la página
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api("movie/top_rated", {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericListArticles, { clean: false });
  }

  // const containerButton = document.createElement("div");
  // const btnLoadMore = document.createElement("button");
  // btnLoadMore.innerText = "Load More";

  // containerButton.classList.add("section-movieCategory--name");
  // containerButton.style.width = "80px";
  // containerButton.style.display = "block";

  // containerButton.appendChild(btnLoadMore);
  // genericListArticles.appendChild(containerButton);
}

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id, {
    params: {
      language: lang,
    },
  });

  const movieImgUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  console.log(movieImgUrl);
  imgMovieDetail.setAttribute("src", movieImgUrl);

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;

  const roundAverage = movie.vote_average;
  movieDetailScore.textContent = roundAverage.toFixed(1);

  buttonsNameContainer.innerHTML = "";
  const categories = movie.genres;
  console.log(categories);

  categories.forEach((category) => {
    const categoryContainer = document.createElement("button");
    // const categoryTitle = document.createElement('h3');
    categoryContainer.classList.add("category-title");
    categoryContainer.setAttribute("id", "id" + category.id);
    const categoryTitleText = document.createTextNode(category.name);

    categoryContainer.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryContainer.appendChild(categoryTitleText);
    buttonsNameContainer.appendChild(categoryContainer);
  });

  getRelatedMoviesId(id);

  //* Media Query para cambiar el border-radius de la imagen
  var x = window.matchMedia("(max-width: 480px)"); //var
  function myFunction(x) {
    if (x.matches) {
      //Verificar si la media query coincide
      imgMovieDetail.style.borderRadius = "30px";
    } else {
      imgMovieDetail.style.borderRadius = "10px";
    }
  }
  myFunction(x);
  x.addEventListener("change", myFunction); //función se ejecute cada vez que CAMBIE el estado de la MediaQuery.
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}

function getlikeMovies() {
  const likedMovies = likedMoviesList();
  const valuesLikedMovies = Object.values(likedMovies);
  if (valuesLikedMovies.length === 0) {
    //movies not liked , section INACTIVE
    section_liked_container.classList.add("inactive");
  }
  createMovies(valuesLikedMovies, liked_articles, { clean: true });
  // console.log(valuesLikedMovies);
}

// getTrendingMoviesPreview();
// getCategegoriesPreview();
// getPopularMoviesPreview();
// getUpcomingMoviesPreview();
// getMoviePortada();
