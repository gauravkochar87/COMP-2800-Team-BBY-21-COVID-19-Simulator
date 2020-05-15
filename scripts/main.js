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



///////////////////////////////////////////////////////////////
////               CRUD DATABASE FUNCTIONS                 ////
///////////////////////////////////////////////////////////////


// reads the data from the database
function getWashCount() {
    db.collection('facts').doc('gaurav').get().then(snapshot => {
            let a = snapshot.data().handwash;
            document.getElementById('count').innerHTML = a;
        });
}


// creates a new document in the collection and adds it with add function
let washCount = document.querySelector('#addWash');

washCount.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('facts').doc('gaurav').set({
        handwash: parseInt(washCount.handwash.value)
    })
    washCount.handwash.value = '';
})


//delete the data from database

let del = document.querySelector('#del');

del.addEventListener('click', (e) => {
    e.stopPropagation();
    db.collection('facts').doc('gaurav').delete().then(() => {
        console.log("document deleted successfully")
    }).catch(() => {
        console.error("error removing document");

    })

})

//Updates the data in database
let update = document.querySelector('#update');

update.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('facts').doc('gaurav').update({
        handwash: parseInt(update.newwash.value)
    })
    update.newwash.value = '';
})
