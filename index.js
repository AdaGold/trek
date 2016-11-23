
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
      $('#displayed-trip').empty();
      $('#displayed-trip').append("<h3 class=title>" + response.name);
      $('#displayed-trip').append("<button class='close-button' aria-label='Dismiss alert' type='button' data-close><span>&times;</span></button>");
      $('#displayed-trip').append("<p>" + response.about);
      $('#displayed-trip').append("<ul><li>Category: " + response.category[0].toUpperCase()+ response.category.slice(1) + "</li><li>Weeks: " + response.weeks + "</li><li>Price: $" + response.cost.toString() + (response.cost.toString()[response.cost.toString().length-2] == "."? "0" : "") + "</li><li>Continent: " + response.continent + "</li><li>Trip ID: " + response.id + "</li></ul>");
      $('#displayed-trip').show();
    }).fail(failCallback);
  });

  $('#displayed-trip').on('click', '.close-button', function(){
    $('#displayed-trip').empty();
    $('#displayed-trip').hide();
  });
});
