//*---------- SCROLL INFINITO ---------------
let page = 1;
let maxPage;
let infiniteScroll;
//*------------------------------------------


//*------------------------------------------

liHome.addEventListener("click", () => {
  location.hash = "#home";
  homePage();
});

titleLogo.addEventListener("click", () => {
  location.hash = "#home";
  homePage();
});

liTreding.addEventListener("click", () => {
  location.hash = "#trends";
  trendsPage();
});

liPopular.addEventListener("click", () => {
  location.hash = "#popular";
  popularPage();
});

liUpcoming.addEventListener("click", () => {
  location.hash = "#upcoming";
  upcomingPage();
});

liTopRated.addEventListener("click", () => {
  location.hash = "#toprated";
  topRatedPage();
});

//*----------------------------------------------------------
btnSearch.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

btnShowTrending.addEventListener("click", () => {
  location.hash = "#trends";
});

btnShowPopular.addEventListener("click", () => {
  location.hash = "#popular";
});

btnShowUpcoming.addEventListener("click", () => {
  location.hash = "#upcoming";
});

btnTopRatedCategory.addEventListener("click", () => {
  location.hash = "#toprated";
});

btnBack.addEventListener("click", () => {
  history.back();
});

window.addEventListener("DOMContentLoaded", browse, false);
window.addEventListener("hashchange", browse, false);

//scroll se activa cuando el usuario desplaza la página hacia arriba o hacia abajo,
window.addEventListener("scroll", infiniteScroll, false); //The handler is executed in the bubbling phase.
//*infinitScroll funcion dinamica, guardará la variable functionPaginet DEPENDIENDO DE LA locations DONDE ESTEMOS. Es decir: infiniteScroll=getPaginatedTRENDMovies, o infiniteScroll=getPaginatedPOPULARMovies, etc.

function browse() {
  console.log({ location });

  //TODO: Los IF's son cuando en TRENDS se ejecuta el IF infiniteScroll=function, y cuando se cambia de pagina POPULAR, se ejecuta el .1) IF infiniteScroll=function y se elimina el listener. Así en popularPage(), infiniteScroll=undefined, y no se ejecuta el .2) IF y NO se ejecuta la funcion infiniteScroll(). Y por ende NO MUESTRE MOVIES TRENDING
  //* al cargar la pagina, infinitScroll= undefined, no se ejecuta el IF
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false }); //el listener no es pasivo y que puede cancelar el evento si es necesario.
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith("#trends")) {
    //infinitScroll SOLO FUNCIONARÁ EN LA PAGINA DE TENDENCIAS
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    language_Select.classList.add("inactive");
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    language_Select.classList.add("inactive");
    categoriesPage();
  } else if (location.hash.startsWith("#popular")) {
    language_Select.classList.add("inactive");
    popularPage();
  } else if (location.hash.startsWith("#upcoming")) {
    language_Select.classList.add("inactive");
    upcomingPage();
  } else if (location.hash.startsWith("#toprated")) {
    language_Select.classList.add("inactive");
    topRatedPage();
  } else {
    homePage();
    language_Select.classList.remove("inactive");
  }

  //*infinitScroll TIENE VALOR = FUNCTION, SE EJECUTA EL if
  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  console.log("Home!!");

  switch (language_Select.value) {
    case "en":
      titleTrending.innerHTML = "Trends";
      moreTrending.innerHTML = "See All";
      titlePopular.innerHTML = "Popular";
      morePopular.innerHTML = "See All";
      titleUpcoming.innerHTML = "Upcoming";
      moreUpcoming.innerHTML = "See All";
      btnCategories.innerHTML = "Categories";
      likedTitle.innerHTML = "Favorite movies";
      liHome.innerHTML = "Home";
      liTreding.innerHTML = "Trends";
      liTopRated.innerHTML = "Top Rated";
      liPopular.innerHTML = "Popular";
      liUpcoming.innerHTML = "Upcoming";
      btnBack.innerHTML = "Go Back";
      btnTopRatedCategory.innerHTML='Top Rated'
      break;

    case "es-ES":
      titleTrending.innerHTML = "Tendencias";
      moreTrending.innerHTML = "Más";
      titlePopular.innerHTML = "Popular";
      morePopular.innerHTML = "Más";
      titleUpcoming.innerHTML = "Próximos";
      moreUpcoming.innerHTML = "Más";
      btnCategories.innerHTML = "Categorias";
      likedTitle.innerHTML = "Peliculas Favoritas";
      liHome.innerHTML = "Inicio";
      liTreding.innerHTML = "Tendencias";
      liTopRated.innerHTML = "Más Valorados";
      liPopular.innerHTML = "Popular";
      liUpcoming.innerHTML = "Próximos";
      btnBack.innerHTML = "Retroceder";
      btnTopRatedCategory.innerHTML='Más Valorados'
      break;

    case "fr":
      titleTrending.innerHTML = "Les tendances";
      moreTrending.innerHTML = "Voir plus";
      titlePopular.innerHTML = "Populaire";
      morePopular.innerHTML = "Voir plus";
      titleUpcoming.innerHTML = "Prochaines";
      moreUpcoming.innerHTML = "Voir plus";
      btnCategories.innerHTML = "Catégories";
      likedTitle.innerHTML = "Films préférés";
      liHome.innerHTML = "Début";
      liTreding.innerHTML = "Les tendances";
      liTopRated.innerHTML = "Les plus notés";
      liPopular.innerHTML = "Populaire";
      liUpcoming.innerHTML = "Prochaines";
      btnBack.innerHTML = "Dos";
      btnTopRatedCategory.innerHTML='Les plus notés'
      break;

    case "pt-BR":
      titleTrending.innerHTML = "Tendências";
      moreTrending.innerHTML = "Ver mais";
      titlePopular.innerHTML = "Popular";
      morePopular.innerHTML = "Ver mais";
      titleUpcoming.innerHTML = "Próximo";
      moreUpcoming.innerHTML = "Ver mais";
      btnCategories.innerHTML = "Categorias";
      likedTitle.innerHTML = "Filmes favoritos";
      liHome.innerHTML = "Começar";
      liTreding.innerHTML = "Tendências";
      liTopRated.innerHTML = "Mais votado";
      liPopular.innerHTML = "Popular";
      liUpcoming.innerHTML = "Próximo";
      btnBack.innerHTML = "Voltar";
      btnTopRatedCategory.innerHTML='Mais votado'
      break;

  }

  genericList_container.classList.add("inactive");
  movieDetail_container.classList.add("inactive");
  header_container.classList.remove("inactive");
  movieCategoryGeneric.classList.remove("inactive");
  moviePortada.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  onlyCategoriesName.classList.remove("inactive");
  popularPreviewSection.classList.remove("inactive");
  upcomingPreviewSection.classList.remove("inactive");
  section_liked_container.classList.remove("inactive");

  getTrendingMoviesPreview();
  getCategegoriesPreview();
  getPopularMoviesPreview();
  getUpcomingMoviesPreview();
  getMoviePortada();
  getlikeMovies();
}

function categoriesPage() {
  console.log("categories!!");

  moviePortada.classList.add("inactive");
  movieCategoryGeneric.classList.add("inactive");
  genericList_container.classList.remove("inactive");
  header_container.classList.remove("inactive");
  movieDetail_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  titleGenericList.innerHTML = categoryName.replace("%20", " ").replace('%C3%B3','ó').replace('%C3%AD','í').replace('%20',' ').replace('%C3%A9','é');

  getMoviesByCategory(categoryId);
  infiniteScroll = getPaginatedCategoryClosures(categoryId);
}

function movieDetailsPage() {
  console.log("Movie!!");

  header_container.classList.add("inactive");
  // headerSection.style.background = '';
  movieDetail_container.classList.remove("inactive");
  movieCategoryGeneric.classList.add("inactive");
  header_container.classList.remove("inactive");
  moviePortada.classList.add("inactive");
  genericList_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

function searchPage() {
  console.log("Search!!");

  moviePortada.classList.add("inactive");
  movieCategoryGeneric.classList.add("inactive");
  genericList_container.classList.remove("inactive");
  header_container.classList.remove("inactive");
  movieDetail_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  const newQuery = query.replaceAll("%20", " ");
  titleGenericList.innerHTML = "Results of : " + newQuery;
  getMoviesBySearch(newQuery);
  //*getPaginatedSearchClosures(newQuery) RETURN function async y se guarda en infiniteScroll
  infiniteScroll = getPaginatedSearchClosures(newQuery);
}

function trendsPage() {
  console.log("TRENDS!!");

  moviePortada.classList.add("inactive");
  movieCategoryGeneric.classList.add("inactive");
  genericList_container.classList.remove("inactive");
  header_container.classList.remove("inactive");
  movieDetail_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}

function topRatedPage() {
  console.log("TRENDS!!");

  moviePortada.classList.add("inactive");
  movieCategoryGeneric.classList.add("inactive");
  genericList_container.classList.remove("inactive");
  header_container.classList.remove("inactive");
  movieDetail_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  getTopRatedMovies();
  infiniteScroll = getPaginatedTopRatedMovies;
}

function popularPage() {
  console.log("POPULAR!!");

  moviePortada.classList.add("inactive");
  movieCategoryGeneric.classList.add("inactive");
  genericList_container.classList.remove("inactive");
  header_container.classList.remove("inactive");
  movieDetail_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  getPopularMovies();
  infiniteScroll = getPaginatedPopularMovies;
}

function upcomingPage() {
  console.log("UPCOMING!!");

  moviePortada.classList.add("inactive");
  movieCategoryGeneric.classList.add("inactive");
  genericList_container.classList.remove("inactive");
  header_container.classList.remove("inactive");
  movieDetail_container.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  onlyCategoriesName.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  section_liked_container.classList.add("inactive");

  getUpcomingMovies();
  infiniteScroll = getPaginatedUpcomingMovies;
}
