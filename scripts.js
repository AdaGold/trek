$(document).ready(function(){
  // URL of the API
  var url = 'https://trektravel.herokuapp.com/trips';


  var successCallback = function(response) {
    for (var i = 0; i < response.length; i++) {
      if(response[i].continent !== null){
        $("#trips ul").append(
          "<li><h3><a href=" + url +  "/" + response[i].id + ">"
          + response[i].name + "</a></h3></li>"); //end append
        }
    } // end for
  }; // end successCallback

  $('#see-trips').click(function() {
    $.get(url, successCallback);
  });


  $('#see-trips').on('click', 'a', function(e) { //e is short for 'event'
    e.preventDefault();

    $('#trip').show();

    var showTripUrl = $(this).attr('href');  // attr() = attributes
    var tripID = $.get(showTripUrl, tripInfomation).fail(function() {
      alert("Page Not Found");
    });
  });




  $('#see-reservations').click(function() {
    $.get(url + '/3/reservations', successCallback);
  });



});
