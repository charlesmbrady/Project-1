 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAd0GSEzY-bgVN43P-NOzMVEgWSKUZtSpY",
    authDomain: "wherewatch-15568.firebaseapp.com",
    databaseURL: "https://wherewatch-15568.firebaseio.com",
    projectId: "wherewatch-15568",
    storageBucket: "wherewatch-15568.appspot.com",
    messagingSenderId: "497362531097"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  //Utelly for Netflix, google play and amazon prime
  var searchInput ="";
  //omdb variables

  var omdbType= "";
  var year= "";
  var omdbApiKey = "7cc4d503";


 
$(".search").click(function(e){
    e.preventDefault();
    searchInput=$("#searchShows").val();
    
    $("form").empty();
   
    var utellyQueryURL= "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term="+ searchInput;


    var omdbQueryURL = "https://www.omdbapi.com/?s=" + searchInput + "&type=" + omdbType + "&y=" + year + "&plot=short&apikey=" + omdbApiKey;
  
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
          div.text(results[i].name);
          div.append(results[i].locations[x].display_name);
          img.attr("src", results[i].picture);
          div.append(img);
          $("body").append(div);
        }
      }
    });
    //omdb ajax call
    $.ajax({
        url: omdbQueryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
})


  //trakt ajax call
  $.ajax({ 
    url: "https://cors-anywhere.herokuapp.com/https://api.trakt.tv/calendars/all/movies/2014-09-01/7", 
    headers: {
      "Content-type": "application/json",
      "trakt-api-key": "c012ee729c5660df87999860a3b52eaaf0ecd5d6e6c535f76341feafa05eb28d",
      "trakt-api-version": "2"
    },
    method: "GET"})
  .then(function(response){
      console.log(response)
  });
