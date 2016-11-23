$(document).ready(function(){

var tripUrl = 'https://trektravel.herokuapp.com/trips';

// Show all trips
  var successCallback = function(response){
    for (var i = 0; i < response.length; i++){
      console.log("hey, its that loop you wanted");
      $('#trips').append("<p><a href=" + tripUrl + "/" + response[i].id + ">" + response[i].name + "</a></p>");
    }
  };

  $('#load').on('click', function(){
    $.get(tripUrl, successCallback);
  })

















});