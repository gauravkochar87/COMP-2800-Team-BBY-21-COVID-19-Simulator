///////////////////////////////////////////////////////////////
////        Toggles between Sign up and Login form         ////
///////////////////////////////////////////////////////////////

$('.message a').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

$('#signup').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});


//function to display logged out links

// const loggedOutLinks = document.querySelectorAll('.loggedOut');
// const loggedInLinks = document.querySelectorAll('.loggedIn');

// const setupUI = (user) => {
//    if (user) {
//       loggedInLinks.forEach(item => {
//          item.style.display = "block";
//       });
//       loggedOutLinks.forEach(item => {
//          item.style.display = "none";
//       });
//    } else {
//       loggedInLinks.forEach(item => {
//          item.style.display = "none";
//       });
//       loggedOutLinks.forEach(item => {
//          item.style.display = "block";
//       });
//    }
// }

///////////////////////////////////////////////////////////////
////           Checks Users authentication state           ////
///////////////////////////////////////////////////////////////

auth.onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        console.log("user logged in");
        // setupUI(user);
        //window.location ='main.html';
    } else {
        console.log("user logged out");
        // setupUI();
        //window.location='index.html'
    }
});