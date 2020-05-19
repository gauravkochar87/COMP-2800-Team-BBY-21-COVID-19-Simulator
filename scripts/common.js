///////////////////////////////////////////////////////////////
////          function to display nav bar items            ////
///////////////////////////////////////////////////////////////

const loggedOutLinks = document.querySelectorAll('.loggedOut');
const loggedInLinks = document.querySelectorAll('.loggedIn');

const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => {
            item.style.display = "block";
        });
        loggedOutLinks.forEach(item => {
            item.style.display = "none";
        });
    } else {
        loggedInLinks.forEach(item => {
            item.style.display = "none";
        });
        loggedOutLinks.forEach(item => {
            item.style.display = "block";
        });
    }
}

///////////////////////////////////////////////////////////////
////           Checks Users authentication state           ////
///////////////////////////////////////////////////////////////

auth.onAuthStateChanged((user) => {
    //console.log(user);
    if (user) {
        console.log("user logged in");
        setupUI(user);
        //window.location ='main.html';
    } else {
        console.log("user logged out");
        setupUI();
        //window.location='index.html'
    }
});
///////////////////////////////////////////////////////////////
////              Log out user from the app                ////
///////////////////////////////////////////////////////////////

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    auth.signOut().then(() => {
        //console.log("user signed out");
        window.location = '../index.html';

    });
});

///////////////////////////////////////////////////////////////
////               Greet User with WELCOME                 ////
///////////////////////////////////////////////////////////////

auth.onAuthStateChanged((user) => {
    //console.log(user);
    if (user) {
        console.log("user logged in");
        document.getElementById('usergreet').innerHTML = '<span style="text-transform: capitalize">Welcome,  ' + auth.currentUser.displayName + '</span>';
        console.log(auth.currentUser.displayName)
        // setupUI(user);
        //window.location ='main.html';
    } else {
        console.log("user logged out");
        // setupUI();
        //window.location='index.html'
    }
});

