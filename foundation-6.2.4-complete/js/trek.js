$(document).ready(function() {
  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  //seed the images with a random source
  var pik = function(max = Math.floor((Math.random() * 15) + 1)){
    this.max = max;
    return this.max;
  };

  // What do we want to happen when we get our response?
  ///index view toggle table
  var successCallback = function (response) {

    console.log('success!');
    var body = $('.index-body');

    body.empty(); // Clear this out to start with to ensure we are populating fresh

    $.each(response, function(index, trip){
      //index page on click
      var file = ".jpeg";
      var row = $('<tr></tr>');
      var pic = $('<td><img class="img"' + ' src= "css/images/'+ pik() + file +'"' + 'style="width:304px;height:228px;">');
      var name = $('<a href="#" class="small expanded button buttons" id=' + trip.id + '>' + trip.name +'</a><br/>');
      var destination = $('<td>' + '</td>');
      row.append(name, pic, destination);
      body.append(row);

    });

    toggleTableView(true);
  };

  $('#loadTrips').click(function() {
    $.get(url, successCallback)
    .fail(failCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('#details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
  };

  var showSuccess = function(trip) {
    if (trip.id === undefined){
      trip.id = "";}
      if (trip.name === undefined){
        trip.name = "";}
        if (trip.destination === undefined){
          trip.destination = "";}
          if(trip.continent === undefined){
            trip.continent = "";}
            if(trip.cost === undefined){
              trip.cost = "";}
              if(trip.about === undefined){
                trip.about = "";}
                if(trip.weeks === undefined){
                  trip.weeks = "";}
                  // trip.destination === undefined || trip.destination === undefined = "";


                  var section = $('#details');
                  var row = $('<div class="row">');
                  var id = $('<p id="index">Reservation Id:  ' + trip.id + '</p>');
                  var name = $('<p id="index">' + trip.name +'</p>');
                  var cost = $('<p id="index">$' + trip.cost + ' USD</p>');
                  var locale = $('<p id="index">  ' + trip.destination + '</p>');
                  var land = $('<p id="index">  '  + trip.continent + ' </p></li>');
                  var week = $('<p id="index">  ' + trip.weeks + '  Weeks </p>');
                  var title = $('<p id="index"> More about this trip:');
                  var about = $('<p id = "bold">'+ trip.about + ' </p>');


                  section.empty(); // Reset the HTML in case there is data from before
                  row.append(id, name, cost, locale, week, title, about);
                  section.append(row);
                  toggleTableView(false);
                };


                var showFailure = function(xhr) {
                  var section = $('.details');
                  section.html('<strong>Error has occurred</strong>');

                  toggleTableView(true);
                };

                $('.index-body').on('click', 'a', function(e) {
                  e.preventDefault();

                  var id = $(this).attr('id');
                  var showUrl = url + '/' + id;
                  $.get(showUrl, showSuccess)
                  .fail(showFailure);
                });

                $('form').submit(function(e) {
                  // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
                  e.preventDefault();

                  var urlN = $(this).attr("action"); // Retrieve the action from the form
                  var newData = $(this).serialize();

                  $.post(urlN, newData, function(response){
                    $('#newTrip').html('<p> Success! </p>');
                    console.log(response);
                  })

                  .fail(function(){
                    $('#newTrip').html('<p>Failure</p>');
                  });


                  $('form').submit(function(e) {
                    // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
                    e.preventDefault();

                    var urlR = $(this).attr("action"); // Retrieve the action from the form
                    var reserveData = $(this).serialize();

                    $.post(urlR, reserveData, function(response){
                      $('#reserve').html('<p> Success! </p>');
                      console.log(response);
                    })
                        .fail(function(){
                      $('#reserve').html('<p>Failure</p>');
                    });



                  //New Post
                    var postCallback = function() {
                      alert("Your trip has been added to the index");
                    };

                    var addPostCallback = function(event) {
                      event.preventDefault();
                      console.log("Sending Your Trip Details!");

                    var newTrip = $(this).serialize();
                      console.log(newTrip);

                      // Send the POST. Just like GET, but with data!
                      $.post(url, newTrip, postCallback);
                    };

                    $('#newTrip').submit(addPostCallback);
                  });
                    });
                      });
