liHome.addEventListener("click", () => {
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

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else if (location.hash.startsWith("#popular")) {
    popularPage();
  } else if (location.hash.startsWith("#upcoming")) {
    upcomingPage();
  } else if (location.hash.startsWith("#toprated")) {
    topRatedPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  console.log("Home!!");

  genericList_container.classList.add("inactive");
  movieDetail_container.classList.add("inactive");
  header_container.classList.remove("inactive");
  movieCategoryGeneric.classList.remove("inactive");
  moviePortada.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  onlyCategoriesName.classList.remove("inactive");
  popularPreviewSection.classList.remove("inactive");
  upcomingPreviewSection.classList.remove("inactive");

  getTrendingMoviesPreview();
  getCategegoriesPreview();
  getPopularMoviesPreview();
  getUpcomingMoviesPreview();
  getMoviePortada();
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

  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  titleGenericList.innerHTML = categoryName.replaceAll("%20", " ");

  getMoviesByCategory(categoryId);
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

  const [_, query] = location.hash.split("=");
  const newQuery = query.replaceAll("%20", " ");
  titleGenericList.innerHTML = "Results of : " + newQuery;
  getMoviesBySearch(newQuery);
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

  titleGenericList.innerHTML = "Tendencias";
  getTrendingMovies();
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

  titleGenericList.innerHTML = "Top Rated";
  getTopRatedMovies();
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

  titleGenericList.innerHTML = "Popular";
  getPopularMovies();
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

  titleGenericList.innerHTML = "Upcoming";
  getUpcomingMovies();
}
