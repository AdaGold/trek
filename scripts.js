$(document).ready(function(){
  var tripsTemplate = _.template($('#trips-template').html());
  var tripShowTemplate = _.template($('#trip-show-template').html());
  var tripsByContinentTemplate = _.template($('#trips-by-continent-template').html());
  var tripsByBudgetTemplate = _.template($('#trips-by-budget-template').html());
  var userReservationsTemplate = _.template($('#user-reservations-template').html());

  var url = 'https://trektravel.herokuapp.com/trips';

  var maxBudget = tripsByBudgetTemplate({ data: { maxBudget: 4000 }});
  var continents = tripsByContinentTemplate({ data: { continents: ['Asia', 'Africa', 'Europe', 'South America', 'North America', 'Antartica', 'Australasia']}});
  $('#trips-by-continent').append($(continents));
  $('#trips-by-budget').append($(maxBudget));


  var showTrips = function(response) {
    $("#trips ul").empty();
    for (var i = 0; i < response.length; i++) {
      console.log(response[i]);
    }
    var trips = tripsTemplate({
        trips: response
    });

    $("#trips").append(trips);
    matchHeight();
  }; //showTrips


  var tripShow = function(response) {
    $('#trip-show').empty();
    $('#trip-show').show();

    var tripData = tripShowTemplate({
      data: {
        name: response.name,
        cost: response.cost,
        weeks: response.weeks,
        continent: response.continent,
        category: response.category,
        about: response.about
      }
    });

    $('#trip-show').append($(tripData));
  }; //tripShow



  $('#see-trips').click(function() {
    $.get(url, showTrips);
  });


  $('#trips-by-continent').on('click', 'a', function(e) {
    e.preventDefault();
    var continentUrl = url + '/continent?query=' + $(this).attr('href');
    $.get(continentUrl, showTrips);
  });

  $('#trips-by-budget').on('click', 'a', function(e) {
    e.preventDefault();
    var continentUrl = url + '/budget?query=' + $(this).attr('href');
    $.get(continentUrl, showTrips);
  });


  $('#reserve-form').submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var reserveUrl = $(this).attr('action');
    // console.log(reserveUrl);
    $.post(reserveUrl, formData, function(response){
      $('#messages').append("<h3>Reservation Made!</h3");
      $('#reserve-form').hide();
    });
  });


  $('#trip-show').on('click', 'a', function(e){
    e.preventDefault();
    $('#messages').html(" ");
    $('#trip-show').hide();
  });

  $('#see-reservations').on('click', function(e) {
    $('#see-reservations-by-email').show();
  });

  $('#see-reservations-form').submit(function(event) {
    event.preventDefault();
    $('#see-reservations-form').hide();
    $('#reservations').show();

    var email = $('#see-reservations-form').serializeArray()[0]["value"];
    var reservationUrl = "https://trektravel.herokuapp.com/reservations";

    $.post(reservationUrl, {email: email}, function(data){
        var trips = userReservationsTemplate({reservations: data});
      // for(i=0; i < data.length; i++){
      //   $('#reservations ul').append("<li><a href="+ data[i].id + ">" + data[i].name + "</li>");
      // }
    }).fail(function() {
      alert("Reservations Not Found");
    });
  });

  $('#reservations ul').on('click', 'a', function(e) {
    e.preventDefault();
    $('#trip').show();
    var tripId = $(this).attr('href');
    var tripUrl = url + '/' + tripId;
    var trip = $.get(tripUrl, tripShow).fail(function() {
      alert("Trip Not Found");
    });//get tripURL .fail
  }); // see-trips.click



  $('#trips').on('click', 'a', function(e) {
    e.preventDefault();
    $('#trip').show();
    var tripId = $(this).attr('href');
    var tripUrl = url + '/' + tripId;
    var trip = $.get(tripUrl, tripShow).fail(function() {
      alert("Trip Not Found");
    });//get tripURL .fail
  }); // see-trips.click


  var matchHeight = function(){
    $("[data-equalize]").each(function() {

      var parentRow = $(this),
          childrenCols = $(this).find("[data-equalizer-watch]"),
          childHeights = childrenCols.map(function(){ return $(this).height(); }).get(),
          tallestChild = Math.max.apply(Math, childHeights);

      childrenCols.css('height', tallestChild);

    }); //data-equalize.each
  }; // matchHeight()

}); // document.ready
