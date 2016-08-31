// Application Keys
// Below is a list of your current API keys:
//
// Application Name: Student Project
// Key: 0f90d76e419404ba312ccb741f3d0b1f
// Secret: f8e91df9dae6e461
// Platform: website/app
// Status: approved
// Description: Outdoor activity trail map search




$(document).ready(function() {



 var xhr = new XMLHttpRequest();



var allJSON = {};
$('#submit').on('click', function (event) {
  event.preventDefault()
  var activity = $('#activityInput').val();
  console.log(activity);

  var city = $('#cityInput').val();
  console.log(city);

  getData(activity, city)

})



var getData = function (activity, city){

xhr.open('GET',
"https://trailapi-trailapi.p.mashape.com/?&limit=50&q[activities_activity_type_name_eq]="+activity+"&q[city_cont]="+city+"&radius=25");
xhr.setRequestHeader("X-Mashape-Key", "fqW2PWOMWgmshzocEyvv0m4Cyi84p1SAibJjsn6RetmFdoZyG8");
xhr.responeType = 'json'
xhr.onload = function() {
    if (xhr.status === 200) {
        // console.log('User\'s name is ' + xhr.responseText);
        var myJSON = JSON.parse(xhr.responseText)
        console.log('myJSON', myJSON);
        for(key in myJSON){
          allJSON[key] = myJSON[key];
        }
        getActivity();
    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

}


function getActivity(){
  for (var i = 0; i < allJSON.places.length; i++) {
    console.log(allJSON.places[i].activities[0].activity_type_name);
  }
}








//
// (function() {
//   var httpRequest;
//   document.getElementById("submit").onclick = function() { makeRequest('index.html'); };
//
//   function makeRequest(url) {
//     httpRequest = new XMLHttpRequest();
//
//     if (!httpRequest) {
//       alert('Giving up :( Cannot create an XMLHTTP instance');
//       return false;
//     }
//     httpRequest.onreadystatechange = alertContents;
//     httpRequest.open('GET', url);
//     httpRequest.send();
//   }
//
//   function alertContents() {
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//       if (httpRequest.status === 200) {
//         alert(httpRequest.responseText);
//       } else {
//         alert('There was a problem with the request.');
//       }
//     }
//   }
// })();

// var city = $('#cityInput').val()
// $('#submit').click(function () {
//   console.log(city)
// })


    //
    // $.ajax({
    //         method: 'GET',
    //         url: 'http://www.omdbapi.com/?s=jaws',
    //         dataType: 'json',
    //         success: function(data) {
    //             console.log('success!', data.Search);
    //             let movies = data.Search;
    //             for (var i = 0; i < movies.length; i++) {
    //                 let movie = movies[i]
    //                 console.log('movie', movie);
    //                 let title = movie.Title;
    //
    //
    //                 $.ajax({
    //                     method: 'GET',
    //                     url: `http://www.omdbapi.com/?t=${title}`,
    //                     dataType: 'json',
    //                     success: function(newData) {
    //                         // console.log('newData!',newData);
    //                         console.log('plot:', newData.Plot);
    //                         // console.log('movie:', movie.Title);
    //
    //                     },
    //                     error: function(err) {
    //                         console.log('error', err);
    //                     }
    //                 })
    //             }
    //         },
    //         error: function (err) {
    //           console.log('jaws is coming for your family', err);
    //         }
    //     })
    })
