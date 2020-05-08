//function to display logged In links

// const loggedOutLinks = document.querySelectorAll('.loggedOut');
// const loggedInLinks = document.querySelectorAll('.loggedIn');

// const setupUI = (user) => {
//     if (user) {
//         loggedInLinks.forEach(item => {
//             item.style.display = "block";
//         });
//         loggedOutLinks.forEach(item => {
//             item.style.display = "none";
//         });
//     } else {
//         loggedInLinks.forEach(item => {
//             item.style.display = "none";
//         });
//         loggedOutLinks.forEach(item => {
//             item.style.display = "block";
//         });
//     }
// }

//listen user state

///////////////////////////////////////////////////////////////
////               Greet User with WELCOME                 ////
///////////////////////////////////////////////////////////////

auth.onAuthStateChanged((user) => {
    console.log(user);
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


//get data from database in realtime coz of onSnapshot
// db.collection('courses').onSnapshot(snapshot => {
//     const data = snapshot.docs;
//     let html = "";

//     data.forEach(element => {
//         const course = element.data();
//         console.log(course);
//         const li =
//             `<li class="list-group-item">${course.CourseId}</li>
//         <li class="list-group-item">${course.CourseName}</li>
//         <li class="list-group-item">${course.Marks}</li>
//         `;
//         html += li;
//     });
//     const items = document.querySelector('.list-group');
//     items.innerHTML = html;

//     //console.log(snapshot.docs);
// });



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
////          Get User Location with Google API            ////
///////////////////////////////////////////////////////////////

//getting current location
let c = function (pos) {
    let la = pos.coords.latitude;
    let lo = pos.coords.longitude;
    let co = la + ',' + lo;

    document.getElementById('google_map').setAttribute('src', 'https://maps.google.co.uk?q=' + co + '&z=15&output=embed');
}

document.getElementById('location').onclick = function () {
    navigator.geolocation.getCurrentPosition(c);
    return false;
}