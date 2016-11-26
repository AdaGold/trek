$(document).ready(function(){
  
  var tripUrl = 'https://trektravel.herokuapp.com/trips';

  $('#load').on('click', function(){
    $.get(tripUrl, function(data){
      for (i = 0; i < data.length; i ++){
        $('#trips').append('<h3>' + data[i].name + '</h3>');
      };
    });
  });
})