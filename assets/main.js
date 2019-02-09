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

//First render Display blank
renderAllBlank();

//////////////////////////  Event Listeners ///////////////////////////////
            //////////////////  Menu Buttons  /////////////////////
            $('#home-menu').on('click', function () {
              showSearchForm();
            });
            $('#signin-menu').on('click', function () {
              showSigninForm();
            });
            $('#signup-menu').on('click', function () {
              showSignupForm();
            });
            $('#favorites-menu').on('click', function () {
              showFavorites();
            });
            ////////////////////////////////////////////////////////

$('#go2PasswordReset').on('click', function () {
  showPassResetForm();
});

//You can then get the user's basic profile information from the User object. 

$('#signout-menu').on('click', function (e) {
  e.preventDefault();
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = $('#emailInput1').val();
    var password = $('#passwordInput1').val();
    //input validations/////////////
    if (email.length < 4) {
      $('.alert').text('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      $('.alert').text('Please enter a password.');
      return;
    }
    //////////////////////////////
    showSearchForm();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        $('.alert').text('Wrong password.');
        $('#search-form').css('display', 'none');
        $('#signin-form').css('display', 'block');
      } else {
        $('.alert').text(errorMessage);
        $('#search-form').css('display', 'none');
        $('#signin-form').css('display', 'block');
      }
      console.log(error);
    });
  }

});
$('#signup-button').on('click', function(e){
  e.preventDefault();
  var userName = $('#userNameInput').val();
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
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    $('#search-form').css('display', 'block');
    $('#signup-form').css('display', 'none');
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      $('.alert').text('The password is too weak.');
      $('#search-form').css('display', 'none');
      $('#signup-form').css('display', 'block');
    } else {
      $('.alert').text(errorMessage);
      $('#search-form').css('display', 'none');
      $('#signup-form').css('display', 'block');
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  database.ref('/userName').push().set({
    userName: userName
  });
})
$('#signin-button').on("click", function (e) {
  e.preventDefault();
  var email = $('#emailInput1').val();
  var password = $('#passwordInput1').val();
  if (email.length < 4) {
    $('.alert').text('Please enter a valid email address.');
    return;
  }
  if (password.length < 4) {
    $('.alert').text('Password must be at least 6 characters.');
    return;
  }
  
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
  
    var errorMessage = error.message;
    $('.alert').text(errorMessage);
    // ...
  });
  
});

$('#passwordReset').on('click', function (e) {
  e.preventDefault();
  var email = $('#emailInput3').val();
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    $('.alert').text('Password Reset Email Sent!');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      $('.alert').text(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      $('.alert').text(errorMessage);
    }
    console.log(error);
  });
  $('#search-form').css('display', 'block');
  $('#reset-form').css('display', 'none');
});

$(document).on('click', '.fav', function () {
  var poster = $(this).attr('data-src');
  var id = $(this).parent().attr("data-imdbID");
  database.ref("/favorites").push({
    poster: poster,
    id: id
  });
});



firebase.auth().onAuthStateChanged(function (user) {
  var user = firebase.auth().currentUser;
  if (user) {

    database.ref("/favorites").on('child_added', function (snapshot) {
      var snap = snapshot.val();
      console.log(snap);
      var poster = $('<img>').attr('src', snap.poster);
      $('#favorites').append(poster);
    });
    database.ref('/userName').on('child_added', function (snapshot) {
      var snap = snapshot.val();
      console.log(snap);
      $('#displayName').text(snap.userName);
    });

    $('#signin-menu').on('click', function () {
      $('.alert').text("You're already signed in!");
    });

    $('#signout-menu').on('click', function () {

      firebase.auth().signOut().then(function () {
        console.log('Signed Out');
        $('.alert').empty();
        //remove user name from firebase
      }, function (error) {
        console.error('Sign Out Error', error);
      });

      showSearchForm();
    });

  } else {
    $('.alert').text("");
    showSearchForm();
  }
});









/////////////////////// Display Functions /////////////////////////

function renderAllBlank() {       //Blanks out display, use before showing the current "page"
  $('#signin-form').css('display', 'none');
  $('#signup-form').css('display', 'none');
  $('#reset-form').css('display', 'none');
  $('#search-form').css('display', 'none');
  $('#favorites').css('display', 'none');
  $('#search-results').css('display', 'none');
  $('#results-display').css('display', 'none');
}
function showSigninForm() {
  renderAllBlank();
  $('#signin-form').css('display', 'block');
}
function showSignupForm() {
  renderAllBlank();
  $('#signup-form').css('display', 'block');
}
function showFavorites() {
  renderAllBlank();
  $('#favorites').css('display', 'block');
}
function showSearchForm() {
  renderAllBlank();
  $('#search-form').css('display', 'block');
}
function showPassResetForm() {
  renderAllBlank();
  $('#reset-form').css('display', 'block');
}