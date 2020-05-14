


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
////          Get User Location with Google API            ////
///////////////////////////////////////////////////////////////

//getting current location
let c = function (pos) {
    let la = pos.coords.latitude;
    let lo = pos.coords.longitude;
    let co = la + ',' + lo;

    document.getElementById('google_map').setAttribute('src', 'https://maps.google.co.uk?q=' + co + '&z=15&output=embed');
}

// document.getElementById('location').onclick = function () {
//     navigator.geolocation.getCurrentPosition(c);
//     return false;
// }

