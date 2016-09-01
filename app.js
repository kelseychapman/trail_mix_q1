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

    //dropdown functionality
    // $('.mdb-select').material_select();
    //end dropdown

    var xhr = new XMLHttpRequest();



    var allJSON = {};
    $('#submit').on('click', function(event) {
        event.preventDefault()
        var activity = $('#activityInput option:selected').val();

        var location = $('#locationInput').val();
        // console.log(city);

        let locationParts = location.split(",")
        let city = $.trim(locationParts[0])
        let state = $.trim(locationParts[1])
            // console.log(city, state);

        $('#trails').empty();

        getData(activity, city, state)


    })



    var getData = function(activity, city, state) {
        xhr.open('GET',
            "https://trailapi-trailapi.p.mashape.com/?&limit=50&q[activities_activity_type_name_eq]=" + activity + "&q[city_cont]=" + city + "&q[state_cont]=" + state + "&radius=25");
        xhr.setRequestHeader("X-Mashape-Key", "fqW2PWOMWgmshzocEyvv0m4Cyi84p1SAibJjsn6RetmFdoZyG8");
        xhr.responeType = 'json'
        xhr.onload = function() {
            if (xhr.status === 200) {
                // console.log('User\'s name is ' + xhr.responseText);
                var myJSON = JSON.parse(xhr.responseText)
                    // console.log('myJSON', myJSON);
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




    function getActivity(myJSON) {
        var activitiesArray = []
        console.log(myJSON);
        for (var i = 0; i < myJSON.places.length; i++) {
            // console.log(myJSON.places[i]);


            var activityValue = {
                city: myJSON.places[i].city,
                state: myJSON.places[i].state,
                activity_type: myJSON.places[i].activities[0].activity_type.name,
                description: myJSON.places[i].description,
                title: myJSON.places[i].name,
                thumbnail: myJSON.places[i].activities[0].thumbnail,
                url: myJSON.places[i].activities[0].url,
                directions: myJSON.places[i].directions

            }
            activitiesArray.push(activityValue)
                // console.log(activityValue)
        }
        console.log(activitiesArray);
        renderActivities(activitiesArray)
    }

    function renderActivities(activitiesArray) {
        for (var i = 0; i < activitiesArray.length; i++) {
            var $col = $('<div class="col-md-4">');
            var $cardBlock = $('<div class="card-block">');
            var $card = $('<div class="card">');
            var $text = $('<div class="card-text center-align">');
            var $location = $('<div class="card-text">');
            var $activityType = $('<div class="teal-text">')
            var $title = $('<h4 class="card-title">');
            var $thumbnail = $('<div class="view overlay hm-white-slight">')
            var $img = document.createElement('img');
            $($img).attr('src', activitiesArray[i].thumbnail);


            $activityType.text(activitiesArray[i].activity_type);
            $title.text(activitiesArray[i].title);
            $text.text(activitiesArray[i].description);
            $location.text(activitiesArray[i].city + ' , ' + activitiesArray[i].state);
            $thumbnail.html($img);
            // console.log($($thumbnail));

              $card.append($cardBlock)
            $cardBlock.append($thumbnail)
            $cardBlock.append($title)
            $cardBlock.append($activityType)
            $cardBlock.append($location)
            $cardBlock.append($text)
            // $cardBlock.append($button)
            $col.append($card)
            $("#trails").append($col)


            var $action = $('<div class="card-action center">');
            var $button = $('<a href="#" target="blank" class="btn btn-default">')

            $button.text('View More Details');
            $button.attr('href',activitiesArray[i].url);
            $action.append($button);
            $card.append($action);
        }

    }


})
