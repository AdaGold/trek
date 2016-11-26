$(document).ready(function(){
  
  var tripsUrl = 'https://trektravel.herokuapp.com/trips';

  var tripUrl = 'https://trektravel.herokuapp.com/trips/4';

  // show list of trips on click
  // variable extraction refactoring
  var onDataArrivedCallback = function(data){

    for (i = 0; i < data.length; i ++){
      var tripNames = '<h3><a href=' + tripsUrl + '/' + data[i].id + '>' + data[i].name + '</a></h3>'
  
      $('#trips').append(tripNames);
    };
  };

  // variable extraction refactoring
  var onLoadClicked = function(){
    $.get(tripsUrl, onDataArrivedCallback);
  };
  
  $('#load').on('click', onLoadClicked);

  console.log('Wave 2 starts here');
// show details of one trip on
  var onTripDetailsArrived = function(trip){
      $('#id').text(trip.id);
      $('#name').text(trip.name);
      $('#continent').text(trip.continent);
      $('#about').text(trip.about);
      $('#category').text(trip.category);
      $('#weeks').text(trip.weeks);
      $('#cost').text(trip.cost);
    };

  var onTripClicked = function(event){
    event.preventDefault();
    $.get(this.href, onTripDetailsArrived);
  };

  $('#trips').on('click', 'a', onTripClicked);
})