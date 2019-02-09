//////////////////////// Global Variables ////////////////////////////////////
var omdbApiKey = "&apikey=7cc4d503";
var gbApiKey = "?api_key=1da49a76dc5aff961a13224d42119be60f600160";
var searchType = $('#search-type');

// Change search type on-click to be either by movie or show; default is movie:
$('#search-type').on('click', function changeSearchType (event){
  event.preventDefault();
  if (searchType.hasClass('movies')){
    searchType.removeClass('movies');
    searchType.addClass('shows');
    $('#search-type').text('Currently Searching By Shows');    
  } else {
    searchType.removeClass('shows');
    searchType.addClass('movies');
    $('#search-type').text('Currently Searching By Movies');
  }
})

//Search-On-Click Function: 
$("#search-button").click(function (event) {
  event.preventDefault();
  $("#results-display").css('display', 'block');
  $("#results-display").text("");
  var searchInput = $("#search-input").val().trim();
  var omdbQueryURL = 'https://www.omdbapi.com/?s=' + searchInput + omdbApiKey;
  // OMDB API AJAX call:
  $.get(omdbQueryURL)
    .done(function (omdbResponse) {
      $('#search-input').val('');
      var omdbResults = omdbResponse.Search;
      if (omdbResults == '') {
        $("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp.").appendTo('#results-display');
        return 0;}
      for (var i = 0; i < omdbResults.length; i++) {
        var imdbID = omdbResults[i].imdbID;
        var posterSrc = omdbResults[i].Poster;
        var package = $("<div class='package animated flipInY'>").attr("data-imdbID", imdbID);
        var streamSearch = $('<div class= "streamSearch">').text("?");
        var poster = $('<img>', { class: 'movie-image', src: posterSrc });
        var fav = $('<img>', { class: 'fav', src: 'assets/images/heart-icon.png' }).attr('data-src', posterSrc);
        var details = $("<h6>").addClass("details").attr("type", "button").attr("data-toggle", "modal").attr("data-target", "#exampleModal").text("details");
        $(package).append(poster, fav, details, streamSearch);
        $('#results-display').append(package);}
    });
});

//On-Click handler for calling additional details:
$(document).on("click", ".details", function () {
  $("#details").text("");
  var id = $(this).parent().attr("data-imdbID");
  var omdbDetailsURL = "http://www.omdbapi.com/?i=" + id + "&plot=full" + omdbApiKey;
  $.get(omdbDetailsURL)
    .done(function (response) {
      console.log(response);
      var title = $("<p>").text(response.Title);
      var rating = $("<p>").text("Rated: " + response.Rated);
      var plot = $("<p>").text(response.Plot);
      $("#details").append(title, rating, plot);
    });
});

// GuideBox API AJAX call:
$("#results-display").on("click", ".streamSearch", function () {
  var id = $(this).parent().attr("data-imdbID");
  console.log("working");
  var guideboxId;
  var type; if (searchType.hasClass('movie')) {var type='movies'} else {var type='shows'};
  //TESTING EXAMPLE: Show title: Arrow , IMDB id = tt2193021   GB id = 13015
  //var gbQueryURL = "http://api-public.guidebox.com/v2/movies/13015/sources" + gbApiKey;
  var gbQueryURLimdb = "http://api-public.guidebox.com/v2/search" + gbApiKey + "&type=movie&field=id&id_type=imdb&query=" + id;

  //TODO: if the gbResponseID is undefined, it's because the clicked poster is actually related to a show instead of a movie, need to accomodate this...
  var gbQueryURLfinal = "http://api-public.guidebox.com/v2/"+type + guideboxId + "/sources" + gbApiKey + "&type=subscription";

  //first guidebox call to get the guidebox movie/show id (needed to get sources)
  $.ajax({
    url: gbQueryURLimdb,
    method: 'GET'
  }).then(function (gbResponse) {
    console.log(gbResponse);
    guideboxId = gbResponse.id;
    console.log("heres the id " + guideboxId);
    if (gbResponse.results == '') {
      $("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp. :(").appendTo('#results-display')
    };

  //second guidebox call to get the sources using the guidebox id
  $.ajax({
    url: gbQueryURLfinal,
    method: 'GET'
  }).then(function (gbResponse) {
    console.log(gbResponse);
  });
});

// Sets default text and search type for togglable button:
$('#search-type').text('Currently Searching By Movies');

