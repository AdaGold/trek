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
    var section = $('#details');
    var row = $('<tr></tr>');
    var name = $('<div>' + trip.id + '<strong>' + trip.name + '</strong></div>');
    var locale = $('<div>' + trip.destination + trip.continent + '</strong></div>');
    var cost = $('<strong>' + trip.cost + '</strong></div>');
    var about = $('<div><strong>' + trip.about + '</strong></div>');
    var week = $('<div><strong>' + trip.weeks + '</strong></div>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, locale, cost, about, week);

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
});

//POST

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
