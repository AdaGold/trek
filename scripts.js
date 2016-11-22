$(document).ready(function() {

  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips';

  // What do we want to happen when we get our response?
  var successCallback = function (response) {
    for (var i=0; i < response.length; i++) {
      $('#trips').append("<h2><a href=" + url + "/" + response[i].id + " > " + response[i].name + "</a></h2>");
    }
  };
  $('#load').on('click', function() {
    $.get(url,successCallback);
  })
})

// $('#trips').on('click', 'a', function(e) {
//   e.preventDefault();
//
//   $('#package').show();
//   var tripUrl = $(this).attr('href');
//
//   $.get(tripUrl, function(trip) {
//     $('#name').text(trip.name);
//     $('#continent').text(trip.continent);
//     $('#about').text(trip.about);
//   }).always(function () {
//     $('#message').text("Something happened")
//   }).fail(function(){
//     alert("Failed.");
//   })
// });
