
$(document).ready(function(){

  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips';

  // What do we want to happen when we get our response?
  var successCallback = function (response) {
    var continents = ["Africa", "Asia", "Europe", "North America", "South America", "Australia", "Antarctica"];
    var continentClasses = ["africa", "asia", "europe", "north-america", "south-america", "australia", "antarctica"];
    var continentsTrips = [[],[],[],[],[],[],[]];

    //Clean out the by-continent divs to hold the trips
    for (var i = 0; i < continentClasses.length; i++){
      $("." + continentClasses[i]).empty();
    }

    //Store each response in the array for the appropriate continent
    for (var i = 0; i < response.length; i++){
      for (var j = 0; j < continents.length; j++){
        if (response[i].continent == continents[j]){
          continentsTrips[j].push(response[i]);
          break;
        }
      }
    }

    // Assemble the list of trips for each continent and display it in the
    // appropriate div
    for (var i = 0; i < continentClasses.length; i++){
      var continentList = continentsTrips[i];
      if (continentList.length != 0){
        $("." + continentClasses[i]).append("<h3>" + continents[i] + "</h3>");
        $("." + continentClasses[i]).show();
      }
      for (var j = 0; j < continentList.length; j++){
        $("." + continentClasses[i]).append("<p><a href=" + url + "/" + continentList[j].id + ">" + continentList[j].name + "</a></p>");
      }
    }
  };

  // Display an error message if list of trips is not successfully retrieved
  var failCallback = function(){
    $('#trips').empty();
    $('#trips').append("<p>Sorry, an error occurred.<p>");
  }

  $('#load').click(function(){
    $.get(url, successCallback)
      .fail(failCallback);
  });

  //Close button from: http://foundation.zurb.com/forum/posts/38045-about-the-close-button-it-not-working

  $('#trips').on('click', 'a', function(e){
    e.preventDefault();
    var result = $.get($(this).attr('href'), function(response){
      //Display information about the trip
      $('#displayed-trip').empty();
      $('#displayed-trip').append("<h3 class=title>" + response.name);
      $('#displayed-trip').append("<button class='close-button' aria-label='Dismiss alert' type='button' data-close><span>&times;</span></button>");
      $('#displayed-trip').append("<p>" + response.about);
      $('#displayed-trip').append("<ul><li>Category: " + response.category[0].toUpperCase()+ response.category.slice(1) + "</li><li>Weeks: " + response.weeks + "</li><li>Price: $" + response.cost.toString() + (response.cost.toString()[response.cost.toString().length-2] == "."? "0" : "") + "</li><li>Continent: " + response.continent + "</li><li>Trip ID: " + response.id + "</li></ul>");

      //Display a form to reserve a spot on the trip
      $('#displayed-trip').append("<h5>Make your reservation for this trip today!</h5>");
      $('#displayed-trip').append("<form id=reservation>");
      $('#reservation').append("<input type=text name=name value=Name>");
      $('#reservation').append("<input type=text name=email value=Email address>");
      $('#reservation').append("<input type=hidden name=age value=" + response.id + ">");
      $('#reservation').append("<input type=submit name=submit value=Submit class=button submit-button>");

      //Make the trip section visible
      $('#displayed-trip').show();
    }).fail(failCallback);
  });

  $('#displayed-trip').on('click', '.close-button', function(){
    $('#displayed-trip').empty();
    $('#displayed-trip').hide();
  });

  //How to collect data from a form using jQuery: http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
  //How to collect data from dynamically created forms: http://stackoverflow.com/questions/14832534/how-to-add-submit-event-to-dynamically-generated-form

  $(document).on('submit', '#reservation', function(e){
    e.preventDefault();
    var userResponse = $('#reservation').serializeArray();
    var name = userResponse[0].value;
    var email = userResponse[1].value;
    var tripId = userResponse[2].value;
    var result = $.post(url + "/" + tripId + "/reserve", { name: name, email: email},function(response){
      $('#displayed-trip').append("<p>Congratulations! Your reservation has been made.</p>");
    }).fail(function(response){
      $('#displayed-trip').append("<p>Sorry, there was an error and your reservation could not be completed.</p>");
    });
  });
});
