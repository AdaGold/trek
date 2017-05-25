$(document).ready(function(){
  var tripsTemplate = _.template($('#trips-template').html());
  var tripShowTemplate = _.template($('#trip-show-template').html());
  var reserveTripTemplate = _.template($('#reserve-trip-template').html());
  var reservationsTemplate = _.template($('#reservations-template').html());

  var tripsByContinentTemplate = _.template($('#trips-by-continent-template').html());
  var tripsByBudgetTemplate = _.template($('#trips-by-budget-template').html());

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
        id: response.id,
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

  $('#trip-show').on('click', 'a', function(e){
    e.preventDefault();
    $('#messages').html(" ");
    $('#trip-show').hide();
  });

  $('#trip-show').on('click', '#see-reservation-form-button', function(e){
    e.preventDefault();
    var tripId = $(this).attr('data-trip-id')
    var reservationForm = reserveTripTemplate({
      tripId: tripId
    });

    $('#trip-show').append($(reservationForm));
  });

  $('#trip-show').on('submit', 'form', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var reserveUrl = url + '/' + $(this).attr('action') + "/reserve";
    console.log(reserveUrl);
    $.post(reserveUrl, formData, function(response){
      $('#messages').append("<h3> Reservation Made! </h3>");
      $('#reserve-trip').hide();
    }).fail(function(){
      $('#messages').append("<h3> Reservation Failed. </h3>");
    });
  });

  $('#see-reservations').on('click', function(e) {
    $('#see-reservations-by-email').show();
  });

  $('#see-reservations-form').submit(function(event) {
    event.preventDefault();
    $('#see-reservations-by-email').hide();
    $('#reservations').show();

    var email = $('#see-reservations-form').serializeArray()[0]["value"];
    var reservationUrl = "https://trektravel.herokuapp.com/reservations";

    $.post(reservationUrl, {email: email}, function(data){
      console.log(data);
        var trips = reservationsTemplate({reservations: data});
        $('#reservations').append(trips);
    }).fail(function() {
      alert("Reservations Not Found");
    });
  });

  $('#reservations').on('submit', 'a', function(e) {
    e.preventDefault();
    $('#trip').show();
    var tripId = $(this).attr('href');
    var tripUrl = url + '/' + tripId;
    var trip = $.get(tripUrl, tripShow).fail(function() {
      alert("Trip Not Found");
    });
  });

  $('#trips').on('click', 'a', function(e) {
    e.preventDefault();
    $('#trip').show();
    var tripId = $(this).attr('href');
    var tripUrl = url + '/' + tripId;
    var trip = $.get(tripUrl, tripShow).fail(function() {
      alert("Trip Not Found");
    });
  });


  var matchHeight = function(){
    $("[data-equalize]").each(function() {

      var parentRow = $(this),
          childrenCols = $(this).find("[data-equalizer-watch]"),
          childHeights = childrenCols.map(function(){ return $(this).height(); }).get(),
          tallestChild = Math.max.apply(Math, childHeights);

      childrenCols.css('height', tallestChild);

    });
  };
});
