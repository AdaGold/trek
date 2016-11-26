console.log($(document).ready(function(){
  var urlTrip = 'https://trektravel.herokuapp.com/trips';
  console.log(urlTrip);

  // Show all trips
  
var successCallBack = function(response){
  for (var i = 0; i < response.length; i++){
    $('#trips').append('<h4><a href=' + urlTrip + '/' + response[i].id + '>' + response[i].name + '</a></h4>');
  }
};
console.log(successCallBack);





  console.log($('#load').on('click', 'button', function(e){
    console.log(e.preventDefault());
  }))

}));