
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
  
  $('#signUp').on('click',function(e){
    e.preventDefault();
    $('#searchContainer').css('display', 'none');
    $('#signInForm').css('display', 'none');
    $('#passResetForm').css('display', 'none');
    $('#favorites').css('display', 'none');
    $('#signUpForm').css('display', 'block');
  });
  $('#login').on('click',function(e){
    e.preventDefault();
    $('#searchContainer').css('display', 'none');
    $('#passResetForm').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#favorites').css('display', 'none');
    $('#signInForm').css('display', 'block');
  });
  $('#go2PasswordReset').on('click',function(e){
    e.preventDefault();
    $('#signInForm').css('display', 'none');
    $('#searchContainer').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#favorites').css('display', 'none');
    $('#passResetForm').css('display', 'block');
  });
  
  $('#homeBtn').on('click',function(){
    $('#signInForm').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#passResetForm').css('display', 'none');
    $('#favorites').css('display', 'none');
    $('#searchContainer').css('display', 'block');
  })
  $('#favoriteBtn').on('click',function(e){
    e.preventDefault();
    $('#searchContainer').css('display', 'none');
    $('#passResetForm').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#signInForm').css('display', 'none');
    $('#favorites').css('display', 'block');
  });
  //You can then get the user's basic profile information from the User object. 
  
  $('#sign-in').on('click',function(e) {
    e.preventDefault();
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = $('#emailInput1').val();
      var password = $('#passwordInput1').val();
      if (email.length < 4) {
        $('.alert').text('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        $('.alert').text('Please enter a password.');
        return;
      }
      $('#searchContainer').css('display','block');
      $('#signInForm').css('display', 'none');
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          $('.alert').text('Wrong password.');
          $('#searchContainer').css('display','none');
          $('#signInForm').css('display', 'block');
        } else {
          $('.alert').text(errorMessage);
          $('#searchContainer').css('display','none');
          $('#signInForm').css('display', 'block');
        }
        console.log(error);
      });
    }

  });

  $('#sign-up').on("click", function(e) {
    e.preventDefault();
    var userName= $('#userNameInput').val();
    var email = $('#emailInput2').val();
    var password = $('#passwordInput2').val();  
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
  database.ref('/userName').push().set({
    userName:userName
  });
  // [END createwithemail]
  $('#searchContainer').css('display', 'block');
  $('#signUpForm').css('display', 'none');
});

$('#passwordReset').on('click', function(e) {
  e.preventDefault();
  var email = $('#emailInput3').val();
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    $('.alert').text('Password Reset Email Sent!');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      $('.alert').text(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      $('.alert').text(errorMessage);
    }
    console.log(error);
  });
  $('#searchContainer').css('display', 'block');
  $('#passResetForm').css('display', 'none');
});

$(document).on('click', '.fav', function(){
  var poster= $(this).attr('data-src');
  var plot =$(this).attr('data-plot');
  var rating = $(this).attr('data-rating');
  database.ref("/favorites").push({
    poster: poster,
    plot: plot,
    rating:rating
  });
});


  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    if (user) {
      database.ref("/favorites").on('child_added', function(snapshot){
        var snap = snapshot.val();
        console.log(snap);
        console.log('working');
        var poster= $('<img>').attr('src', snap.poster);
        var plot =$('<p>').text(snap.plot);
        var rating= snap.rating;
        $('#favorites').append(poster);
        $('#favorites').append(plot);
        $('#favorites').append(rating);
      });
      database.ref('/userName').on('child_added', function(snapshot){
        var snap = snapshot.val();
        console.log(snap);
        $('#displayName').text(snap.userName)
      })
  
    $('#login').on('click', function(){
      $('.alert').text("You're already signed in!");
    })
      $('#signOutBtn').on('click', function(e){
        e.preventDefault();
        console.log('click');
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
        $('#searchContainer').css('display', 'block');
        $('#signInForm').css('display', 'none');
        $('#passResetForm').css('display', 'none');
        $('#signUpForm').css('display', 'none');
      });
      
    } else {
      $('.alert').text("");
      $('#sign-in').css('display', 'block');
      $('#sign-out').css('display', 'none');
    }});