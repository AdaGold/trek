$(document).ready(function() {

  var url = "https://trektravel.herokuapp.com/trips";

  var multiCallback = function(listOfTrips) {
    // alert("hi we're in the function!");
    for (var i = 0; i < listOfTrips.length; i++) {
      $('#trip-list').append("<li><a href='" + url + '/' + listOfTrips[i].id + "'>" + listOfTrips[i].name + "</a></li>")
    };
  };

  var loadTrips = function() {
    if ($('#trip-list').html() === "") {
      // alert("it's empty!");
      $('#load').text("SEE ALL TRIPS");
      $('#load').click(function() {
        $.get(url, multiCallback);
      });
    } else {
        alert("it's not empty!");
        $('#load').text("REMOVE ALL TRIPS");
    };
  };

  var clickTrip = function() {
    $('#trip-list').on('click', 'a', function(event) {
      event.preventDefault();
      $('#wrapper').show();
      var tripUrl = $(this).attr('href');

      $.get(tripUrl, tripInfo)
    })
  };

  var tripInfo = function(trip) {
    $('#current-trip').empty();
    // i'm separating these into several 'appends' for readability; otherwise the line gets out of control.
    $('#current-trip').append("<h2 id='trip-name'>" + trip.name.toUpperCase() + "</h2>");
    $('#current-trip').append("<h4 id='logistics'>" + trip.continent.toUpperCase() + " | " + trip.weeks + " " + weekHelper(trip.weeks) + "</h4>");
    $('#current-trip').append("<p id='info'>category: " + trip.category.toUpperCase() + " | cost: " + dollarHelper(trip.cost) + "</p>");
    $('#current-trip').append("<p id='about'>" + trip.about + "</p>")
    $('#current-trip').append(reserveTrip(trip.id))
  };

  var reserveTrip = function(id) {
    $('form').submit(function() {
      var tripUrl = url + "/" + id + "/reserve";
      console.log(tripUrl);
      var data = $(this).serialize();
      $.post(tripUrl, data, reserveCallback);
    });
  }

  var reserveCallback = function() {
    alert("trip reserved!")
  };


  loadTrips();
  clickTrip();

}); // end of document dot ready
