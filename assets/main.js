
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
    $('#signUpForm').css('display', 'block');
  });
  $('#login').on('click',function(e){
    e.preventDefault();
    $('#searchContainer').css('display', 'none');
    $('#passResetForm').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#signInForm').css('display', 'block');
  });
  $('#go2PasswordReset').on('click',function(e){
    e.preventDefault();
    $('#signInForm').css('display', 'none');
    $('#searchContainer').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#passResetForm').css('display', 'block');
  });
  
  $('#homeBtn').on('click',function(){
    $('#signInForm').css('display', 'none');
    $('#signUpForm').css('display', 'none');
    $('#passResetForm').css('display', 'none');
    $('#searchContainer').css('display', 'block');
  })
  
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
    $('#searchContainer').css('display','block');
    $('#signInForm').css('display', 'none');
  });

  $('#sign-up').on("click", function(e) {
    e.preventDefault();
    var email = $('#emailInput2').val();
    var password = $('#passwordInput2').val();  
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
  $('#searchContainer').css('display', 'block');
  $('#signUpForm').css('display', 'none');
});

$('#passwordReset').on('click', function(e) {
  e.preventDefault();
  var email = $('#emailInput3').val();
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
  $('#searchContainer').css('display', 'block');
  $('#passResetForm').css('display', 'none');
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
      // [END_EXCLUDE]
    } else {
      $('.alert').text("");
      // User is signed out.
      // [START_EXCLUDE]
      $('#sign-in').css('display', 'block');
      $('#sign-out').css('display', 'none');
      // [END_EXCLUDE]
    }});