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
        // for(key in myJSON){
        //   allJSON[key] = myJSON[key];
        // }
        getActivity(myJSON);
    } else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

}



var renderTrails = function() {
    $('#trails').empty(); //gets rid of things in "trails" div

    for (var trail of trails) { //creates card in trails div
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({ //adds title in card
        'data-position': 'top',
        'data-tooltip': trail.title
      });

      $title.tooltip({ delay: 50, });

      $title.text(trail.title);

      var $thumbnail = $('<img class="thumbnail">'); //adds thumbnail in card

      $thumbnail.attr({
        src: trail.thumbnail,
        alt: `${trail.thumbnail} thumbnail`
      });

      $content.append($title, $thumbnail);
      $card.append($content);

      var $action = $('<div class="card-action center">'); //adds description in card
      var $description = $('<a class="waves-effect waves-light btn modal-trigger">'); //adds button in card

      $description.attr('href', `#${trail.id}`);
      $description.text('Trail Description');

      $action.append($description);
      $card.append($action);

      var $modal = $(`<div id="${trail.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(trail.title);
      var $movieActivity = $('<h6>').text(`Released in ${trail.activity}`);
      var $modalText = $('<p>').text(trail.description);

      $modalContent.append($modalHeader, $movieActivity, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#trails').append($col);

      $('.modal-trigger').leanModal();
    }
  };


  function getActivity(myJSON){
    for (var i = 0; i < myJSON.places.length; i++) {
      console.log(allJSON.places[i].activities[0].activity_type_name);

      var activityValue = {
        city: myJSON.places.city
        state: myJSON.places.state
        activity_type_name: myJSON.places.activity_type_name
        description: myJSON.places.description
        name: myJSON.places.name
        thumbnail: myJSON.places.thumbnail
        url: myJSON.places.url
        directions: myJSON.places.directions

      }
      console.log(activityValue.city)
    }
  }

    })
