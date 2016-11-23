$(document).ready(function() {

  var url = "https://trektravel.herokuapp.com/trips";

  var multiCallback = function(listOfTrips) {
    // alert("hi we're in the function!");
    for (var i = 0; i < listOfTrips.length; i++) {
      $('#trip-list').append("<li><a href='" + url + '/' + listOfTrips[i].id + "'>" + listOfTrips[i].name + "</a></li>")
    };
  };

  //  $('#pets').append('<li><a href=' + url + '/' + response[i].id + '>' + response[i].name + '</a></li>');

  var loadTrips = function() {
    $('#load').click(function() {
      $.get(url, multiCallback);
      buttonText();
    });
  };

  var clickTrip = function() {

  };

  loadTrips();

}); // end of document dot ready
