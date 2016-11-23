$(document).ready(function() {

  var url = "https://trektravel.herokuapp.com/trips";

  var multiCallback = function(listOfTrips) {
    // alert("hi we're in the function!");
    for (var i = 0; i < listOfTrips.length; i++) {
      $('#trip-list').append("<li>" + listOfTrips[i].name + "</li>")
    };
  };

  $.get(url, multiCallback);

}); // end of document dot ready
