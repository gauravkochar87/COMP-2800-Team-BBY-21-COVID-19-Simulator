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







   
   {/* // document.querySelector("label").onclick = function () { */}
     window.onload = function(){
       var Points = [];
       var chart1 = new CanvasJS.Chart("chartContainer1", {
   animationEnabled: true,
   title:{
       text: "Confirmed Cases, Recovered and Death by Health Authority",
       fontFamily: "arial black",
       fontColor: "#695A42"
   },
   axisX: {
       interval: 1,
   },
   axisY:{
       valueFormatString:"#0",
       gridColor: "#B6B1A8",
       tickColor: "#B6B1A8"
   },
   // toolTip: {
   // 	shared: true,
   // 	content: toolTipContent
   // },
   data: [{
       type: "stackedColumn",
       showInLegend: true,
       color: "grey",
       name: "Death",
       dataPoints: [
           { label: "Fraser", y: 44 },
           { label: "Vancouver Coastal",y: 80 },
           { label: "Interior",y: 2 },
           { label: "Vancouver Island",y: 5},
           { label: "Northern",y: 0 },
   
       ]
       },
       {        
           type: "stackedColumn",
           showInLegend: true,
           name: "Recovered",
           color: "#5a8c4c",
           dataPoints: [
           { label: "Fraser",y: 810 },
           { label: "Vancouver Coastal",y: 681 },
           { label: "Interior",y: 175 },
           { label: "Vancouver Island",y: 115},
           { label: "Northern",y: 51},
           ]
       },
       {        
           type: "stackedColumn",
           showInLegend: true,
           name: "Confirmed",
           color: "#d88c4c",
           dataPoints: [
           { label: "Fraser",y: 1124 },
           { label: "Vancouver Coastal",y: 874 },
           { label: "Interior",y: 180 },
           { label: "Vancouver Island",y: 125},
           { label: "Northern",y: 57 },
           ]
       },
       ]
});


chart1.render();
var chart2 = new CanvasJS.Chart("chartContainer2", {
   animationEnabled: true,
   theme: "light2", 
   title:{
       text: "Daliy New Cases",
       fontFamily: "arial black",
       fontColor: "#695A42"
   },
   axisY: {
       title: "Case"
   },
   data: [{        
       type: "column",  

       dataPoints:Points
           
       
   }]
});
$.getJSON("../PBage.json", addData);
function addData(data) {
   var total = 1;
   // console.log(data.length);
   for (var i = 1; i < data.length; i++) {
    if(data[i-1].Reported_Date == data[i].Reported_Date){
    total++;
   //  console.log("good");
   }else{
   Points.push({
           x: new Date(data[i-1].Reported_Date),
           y: total
       });
  total = 1;
 }

}
chart2.render();
}



var chart3 = new CanvasJS.Chart("chartContainer3", {
   animationEnabled: true,
   theme: "light2", // "light1", "light2", "dark1", "dark2"
   title:{
       text: "Distribution by Age"
   },
   axisY: {
   
   },
   data: [{        
       type: "column",  
       // showInLegend: true, 
       // legendMarkerColor: "grey",
       // legendText: "MMbbl = one million barrels",
       dataPoints: [      
           { y: 17, label: "<10" },
           { y: 37,  label: "10-19" },
           { y: 209,  label: "20-29" },
           { y: 383,  label: "30-39" },
           { y: 339,  label: "40-49" },
           { y: 437, label: "50-59" },
           { y: 299,  label: "60-69" },
     { y: 211,  label: "70-79" },
     { y: 182,  label: "80-89" },
     { y: 105,  label: "89+" }
     
       ]
   }]
});
chart3.render();

}
