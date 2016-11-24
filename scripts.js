$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  var tripsCallback = function (response) {
    for (var i=0; i < response.length; i++) {
      $('#trips').append("<h2><a href=" + url + "/" + response[i].id + " > " + response[i].name + "</a></h2>");
    }
  };

  $('#load').on('click', function() {
    $.get(url, tripsCallback);
  })

  $('#trips').on('click', 'a', function(e) {
    e.preventDefault();


    $('#package').show();
    var tripUrl = $(this).attr('href');

    $.get(tripUrl, function(trip) {
      $('#name').text(trip.name + " (" + trip.continent + ")" );
      $('#category').text("Category: " + trip.category);
      $('#weeks').text("Trip Length: " + trip.weeks + " weeks");
      $('#cost').text("Trip Cost: $" + trip.cost);
      $('#id').html("TREK ID: " + "<span>" + trip.id +  "</span>");
      $('#about').text(trip.about);
    }).always(function () {
    }).fail(function(){
      alert("Failed.");
    })
  });


  // var reservationsCallback = function (response) {
  //   for (var i=0; i < response.length; i++) {
  //     $('#reservations').append("<h2><a href=" + url + "/trips/" + response[i].id + " > " + response[i].name + "</a></h2>");
  //   }
  // };

  // how is .click in comparison?

  $('form').submit(function(e) {
    e.preventDefault();

    var form_url = $(this).attr('action')
    var url =  form_url + "/" + $('#id span').text() + "/reserve";
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      console.log(response);
      $('#message').html('Your reservation is good to go!');
    })
      // $('#reservation_form').hide();


      // .fail(function(){
      // $('#message').html('<p>Adding trip failed</p>');
    });
  });

  //     $.ajax({
  //     type: "POST",
  //     data: formData,
  //     cache: false,
  //     url: url,
  //     success: function(data)
  //     {
  //       console.log(data)
  //     }
  // });
