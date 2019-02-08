//////////////////////// Variables ////////////////////////////////////
var omdbApiKey = "&apikey=7cc4d503";
var gbApiKey = "?api_key=1da49a76dc5aff961a13224d42119be60f600160";

$("#search-button").click(function (event) {
  event.preventDefault();
  $("#results-display").css('display', 'block');
  $("#results-display").text("");
  var omdbType = "";
  var year = "";

  
  var searchInput = $("#search-input").val().trim();
  var omdbQueryURL = 'https://www.omdbapi.com/?s=' + searchInput + '&type=' + omdbType + "&y=" + year + "&plot=full" + omdbApiKey;
  


  // OMDB API AJAX call:
  $.get(omdbQueryURL)
    .done(function (omdbResponse) {
      $('#search-input').val('');

      var omdbResults = omdbResponse.Search;
      if (omdbResults == '') { 
        $("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp.").appendTo('#results-display');
        return 0;
      }
      for (var i = 0; i < omdbResults.length; i++) {
        var imdbID = omdbResults[i].imdbID;
        var posterSrc = omdbResults[i].Poster;

        var package = $("<div class='package animated flipInY'>").attr("data-imdbID", imdbID);
        var streamSearch = $('<div class= "streamSearch">').text("?");
        var poster = $('<img>', { class: 'movie-image', src: posterSrc });
        var fav = $('<img>', { class: 'fav', src: 'assets/images/heart-icon.png' }).attr('data-src', posterSrc);
        var details = $("<h6>").addClass("details").attr("type", "button").attr("data-toggle", "modal").attr("data-target", "#exampleModal").attr("data-imdbIDbID", imdbID).text("details");

        $(package).append(poster, fav, details, streamSearch);
        $('#results-display').append(package);
        
      }
    });
});


//click handler for pulling in more details
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
  $("#results-display").on("click", ".streamSearch", function(){
    var id = $(this).parent().attr("data-imdbid");
    console.log("working");
    var cors = 'https://cors-anywhere.herokuapp.com/'
    var gbQueryURL = cors+"https://api-public.guidebox.com/v2/movies/"+ id + "/sources" +gbApiKey;  //cors + "https://api-public.guidebox.com/v2/movies/movie_id=" + id + gbApiKey;
  
  $.ajax({
    url: gbQueryURL,
    method: 'GET'
  }).then(function(gbResponse){
    
    var gbResults = gbResponse.results;
    console.log(gbResults);
    if (gbResults == '') {$("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp. :(").appendTo('#results-display')};
    /*for (var i = 0; i < gbResults.length; i++) {
      var displayDiv = $("<div class='col-md-4'>");  
      var posterSrc = [gbResults[i].poster_240x342, gbResults[i].poster_120x171, gbResults[i].poster_400x570];
      var movieRating = gbResults[i].rating.toUpperCase();
      console.log('This is the movie rating: '+movieRating);
      var movieRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm', text:'RATED: '+movieRating});
      var poster = $('<img>', {class: 'movie-image', src:posterSrc[0]});
      var fav = $('<img>', {class:'fav', src:'https://www.freeiconspng.com/uploads/heart-icon-14.png'});
      $('#results-display').append(displayDiv.append(poster, movieRatingBtn, fav))
      }*/
  });
});