// Begin Search-on-Click function:

$(".searchbtn").click(function (event) {
  event.preventDefault();
  var omdbType = "";
  var year = "";
  var omdbApiKey = "&apikey=7cc4d503";
  var gbApiKey = "?api_key=1da49a76dc5aff961a13224d42119be60f600160";
  var cors = 'https://cors-anywhere.herokuapp.com/'
  var searchInput = $(".searchShows").val().trim();
  var omdbQueryURL = 'https://www.omdbapi.com/?s=' + searchInput + '&type=' + omdbType + "&y=" + year + "&plot=full" + omdbApiKey;
  var omdbPosterURL = 'https://img.omdbapi.com/?t=' + searchInput + omdbApiKey;
  var gbQueryURL = cors + "https://api-public.guidebox.com/v2/search" + gbApiKey + "&type=movie&field=title&query=" + searchInput;

  // GuideBox API AJAX call:
  /*
  $.get(gbQueryURL).done(function(gbResponse){
    $('.searchShows').val('');
    var gbResults = gbResponse.results;
    console.log(gbResults);
    if (gbResults == '') {$("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp. :(").appendTo('#renderResults')};
    for (var i = 0; i < gbResults.length; i++) {
      var displayDiv = $("<div class='col-md-4'>");  
      var moviePosters = [gbResults[i].poster_240x342, gbResults[i].poster_120x171, gbResults[i].poster_400x570];
      var movieRating = gbResults[i].rating.toUpperCase();
      console.log('This is the movie rating: '+movieRating);
      var movieRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm', text:'RATED: '+movieRating});
      var movieImage = $('<img>', {class: 'movie-image', src:moviePosters[0]});
      var fav = $('<img>', {class:'fav', src:'https://www.freeiconspng.com/uploads/heart-icon-14.png'});
      $('#renderResults').append(displayDiv.append(movieImage, movieRatingBtn, fav))
      }
  });*/

  // console.log('---------------------------------------------------------');

  // OMDB API AJAX call:
  $.get(omdbQueryURL)
    /*$.get(omdbPosterURL)*/
    .done(function (omdbResponse) {
      $('.searchShows').val('');
      console.log('-----------------------------------------------');
      console.log(omdbResponse);
      console.log('-----------------------------------------------');


      var omdbResults = omdbResponse.Search;
      if (omdbResults == '') { $("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp. :(").appendTo('#renderResults') };
      for (var i = 0; i < omdbResults.length; i++) {
        var imdbID = omdbResults[i].imdbID
        var displayDiv1 = $("<div class='package'>");

        var moviePosters = omdbResults[i].Poster;
        var movieImage = $('<img>', { class: 'movie-image', src: moviePosters, 'data-imdbid': imdbID });


        var fav = $('<img>', { class: 'fav', src: 'assets/images/heart-icon.png' }).attr('data-src', moviePosters);
        

        $(displayDiv1).append(movieImage, fav);
        $('#renderResults').append(displayDiv1);

      }
    });

  // End Search-on-Click function:
});


  /* Commenting out no longer used uTelly code/ajax calls:  
  var utellyQueryURL= "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term="+ searchInput; 
      $.ajax({
      url: utellyQueryURL,
      headers:{
        "X-RapidAPI-Key": "PaDoWG4Fd0mshh2MgIGtSmVmiiQTp1nM0Y8jsnhfVgnVQvg7Rt"
      }, 
      method:"GET"
    }).then(function(response){
      console.log(response)
      var results= response.results;
      for (var i=0; i<results.length; i++){
        var locations= results[i].locations;
        for(var x=0; x<locations.length; x++){
          var div= $("<div>");
          var img = $("<img>");
          var h2= $("<h2>");
          var p= $("<p>");
          div.css("myDiv");
          h2.text(results[i].name);
          p.append(results[i].locations[x].display_name);
          img.attr("src", results[i].picture);
          img.attr("height", "50%");
          img.attr("width", "50%");
          img.css("float-left");
          div.append(h2, p,img);
          $("body").append(div);
        }
      }
    });*/