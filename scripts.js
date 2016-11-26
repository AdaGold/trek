$(document).ready(function(){
  
  var tripUrl = 'https://trektravel.herokuapp.com/trips';
  // show list of trips on click
  // variable extraction refactoring
  var dataArrivedCallback = function(data){

    for (i = 0; i < data.length; i ++){
      var tripNames = '<h3><a href=' + tripUrl + '/' + data[i].id + '>' + data[i].name + '</a></h3>'
  
      $('#trips').append(tripNames);
    };
  };

  // variable extraction refactoring
  var clickCallback = function(){
    $.get(tripUrl, dataArrivedCallback);
  };

  $('#load').on('click', clickCallback);


  console.log('Wave 2 starts here');
// show details of one trip on

})