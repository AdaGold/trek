$(document).ready(function() {
  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  // What do we want to happen when we get our response?
  ///index view toggle table
  var successCallback = function (response) {
    console.log('success!');

    var body = $('.index-body');
    body.empty(); // Clear this out to start with to ensure we are populating fresh

    $.each(response, function(index, trip){
      //index page on click
      var row = $('<tr></tr>');
      var pic = $('<td><img class="img"' + ' src= "'+ trip.img + '"' + 'style="width:304px;height:228px;">');
      var name = $('<a href="#" id=' + trip.id + '>' + trip.name +'</a>');
      var destination = $('<td>' + '</td>');


      row.append(name, pic, destination);
      body.append(row);


    });

    toggleTableView(true);
  };

  $('#index').click(function() {
    $.get(url, successCallback)
      .fail(failCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('#index').toggle(!onIndicator);
    $('#details').toggle(!onIndicator);
    $('#reservation').toggle(onIndicator);
  };

  var showSuccess = function(trip) {
    var section = $('.details');
    var name = $('<div>' + trip.id + '<strong>Trip</strong>' + trip.name + '</div>');
    var locale = $('<strong>Breed</strong><div>' + trip.destination + trip.continent + '</div>');
    var cost = $('<strong>Age</strong><div>' + trip.cost + '</div>');
    var about = $('<strong>Owner</strong><div>' + trip.about + '</div>');
    var week = $('<strong>Owner</strong><div>' + trip.weeks + '</div>');


    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, locale, cost, about, week);

    toggleTableView(false);

  };

  var showFailure = function(xhr) {
    var section = $('.details');
    section.html('<strong>Error has occurred</strong>');

    toggleTableView(false);
  };

  $('.index-body').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });
});

//
//   // POST STUFF (from Wednesday w/ Dan)
//   var postCallback = function() {
//     alert("POST worked just fine!");
//   };
//
//   var addPetCallback = function(event) {
//     // The default action on submit is to refresh
//     // the page! Not what we want!
//     event.preventDefault();
//
//     console.log("Sending pet data!");
//
//     // jQuery knows how to take form data and turn
//     // it into something we can send with our POST
//     // request. This process is called serialization.
//     var petData = $(this).serialize();
//
//     console.log("Pet data is " + petData);
//
//     // Send the POST. Just like GET, but with data!
//     $.post(url, petData, postCallback);
//   };
//
//   // We'll attach ourselves to the "submit" event
//   // on our input form. It has a few differences from
//   // waiting for a click on a button:
//   //   * The event happens on the form, not the button,
//   //       so we'll have access to form data
//   //   * Submit can be triggered by clicking the button
//   //       or by pressing enter
//   $('#add-pet-form').submit(addPetCallback);
