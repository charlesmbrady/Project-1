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

// http://api-public.guidebox.com/v2/search?api_key=YOUR_API_KEY&type=movie&field=title&query=Terminator
// type
// required
 
// The type of entity. Valid options include: movie, channel, person, show

// field
// optional
 
// Valid options are different, depending on type:

// Shows: title, id
// Movies: title, id
// Channels: not required
// Person: not required
// precision
// optional, default: fuzzy
 
// How exact the search query should be. Valid options include: exact, fuzzy

// id_type
// optional
 
// Valid options are different, depending on type:

// Shows: tvdb, themoviedb, imdb
// Movies: imdb, themoviedb
// Channels: not required
// Person: not required

var gbApiKey="";
var gbType ="";
//var field= ""; optional
var searchInput="";
var gbQueryURL= "http://api-public.guidebox.com/v2/search?api_key="+api_key+"&type="+gbType+"&query="+searchInput;

$.ajax({url: gbQueryURL, method: "GET"})
.then(function(response){
    console.log(response)
});

//OMDB ajax call


var omdbType= "";
var year= "";
var search ="tomb raider";
var omdbApiKey = "7cc4d503";
var omdbQueryURL = "https://www.omdbapi.com/?s=" + search + "&type=" + omdbType + "&y=" + year + "&plot=short&apikey=" + apiKey;

$.ajax({
  url: omdbqueryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});


