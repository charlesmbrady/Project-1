
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdgaw55sm3H8fFFhWQde3hBthNVCtfFTs",
    authDomain: "streamingproject1.firebaseapp.com",
    databaseURL: "https://streamingproject1.firebaseio.com",
    projectId: "streamingproject1",
    storageBucket: "streamingproject1.appspot.com",
    messagingSenderId: "507353543186"

  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  $('#signUp').on('click',function(){
    $('.container').css('display', 'none');
    $('#signUpForm').css('display', 'block');
  });
  $('#login').on('click',function(){
    $('.container').css('display', 'none');
    $('#signInForm').css('display', 'block');
  });
  $('#go2PasswordReset').on('click',function(){
    $('#signInForm').css('display', 'none');
    $('#passResetForm').css('display', 'block');
  });
  

  
  //You can then get the user's basic profile information from the User object. 
  
  $('#sign-in').on('click',function() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = $('#email').val();
      var password = $('#password').val();
      if (email.length < 4) {
        $('.alert').text('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        $('.alert').text('Please enter a password.');
        return;
      }
  
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          $('.alert').text('Wrong password.');
        } else {
          $('.alert').text(errorMessage);
        }
        console.log(error);
      });
    }
    $('.container').css('display','block');
    $('#signInForm').css('display', 'none');
  });

  $('#sign-up').on("click", function(e) {
    e.preventDefault();
    var email = $('#emailInput1').val();
    var password = $('#passwordInput1').val();  
    console.log("clicked")
    if (email.length < 4) {
      $('.alert').text('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      $('.alert').text('Password must be at least 6 characters.');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      $('.alert').text('The password is too weak.');
    } else {
      $('.alert').text(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
  $('.container').css('display', 'block');
  $('#signUpForm').css('display', 'none');
});

$('#passwordReset').on('click', function() {
  var email = $('#emailInput').val();
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    $('.alert').text('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      $('.alert').text(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      $('.alert').text(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
});







//function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    if (user) {
 
      user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        console.log(displayName);
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
    
      $('#sign-out').css('display', 'block');
      $('#sign-in').css('display', 'none');
      
      // [END_EXCLUDE]
    } else {
      $('#signOutBtn').click(function(){
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      });
      // User is signed out.
      // [START_EXCLUDE]
      $('#sign-in').css('display', 'block');
      $('#sign-out').css('display', 'none');
      // [END_EXCLUDE]
    }

    
  });


  //Utelly for Netflix, google play and amazon prime
  //omdb variables

  var omdbType= "";
  var year= "";
  var omdbApiKey = "7cc4d503";
  var gbApiKey= "?api_key=1da49a76dc5aff961a13224d42119be60f600160";
  var cors = 'https://cors-anywhere.herokuapp.com/'
 
$(".search").click(function(e){
    e.preventDefault();
    var searchInput=$("#searchShows").val().trim();
    var omdbQueryURL = "https://www.omdbapi.com/?s=" + searchInput + "&type=" + omdbType + "&y=" + year + "&plot=short&apikey=" + omdbApiKey;
    var gbQueryURL= cors+"https://api-public.guidebox.com/v2/search"+gbApiKey+"&type=movie&field=title&query="+searchInput;
    // GuideBox ajax call:
    $.ajax({
      url: gbQueryURL,
      method:"GET"
    }).done(function(response){
      $('#searchShows').val('');
      console.log(response);
      var results = response.results;
      if (results == '') {$("<div class='col-md-12'>").text("There isn't a movie for this search. Womp womp. :(").appendTo('.container')};
      for (var i = 0; i < results.length; i++) {
        var displayDiv = $("<div class='col-md-4'>");  
        var moviePosters = [results[i].poster_240x342, results[i].poster_120x171, results[i].poster_400x570];
        var movieRating = results[i].rating.toUpperCase();
        console.log('This is the movie rating: '+movieRating);
        var movieRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm', text:'RATED: '+movieRating});
        var movieImage = $('<img>', {class: 'movie-image', src:moviePosters[0]});
        $('.container').append(displayDiv.append(movieImage, movieRatingBtn))
      }});
    
    // OMDB ajax call:
    $.ajax({
        url: omdbQueryURL,
        method: "GET"
      }).done(function(response) {
        var results = response.results;
        // console.log('This is the OMDB response: '+results);
      })
    }); // End Search-On-Click Function


  /* No longer used uTelly code/ajax calls:
  
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

