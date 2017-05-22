$(document).ready(function(){
  // URL of the API
  var url = 'https://trektravel.herokuapp.com/trips';
  // change api to have australiasia be australia
  var continents = ['asia', 'africa', 'europe', 'south america', 'north america', 'antartica', 'australasia']

  var successCallback = function(response) {
    for (var i = 0; i < response.length; i++) {
      if(response[i].continent === "Asia"){
        $("#trips ul").append(
          "<li data-equalizer-watch class='column'><div><h3><a href=" + url +  "/" + response[i].id + ">"
          + response[i].name + "</a></h3></div></li>"); //end append
        }
    } //for
    matchHeight();
  }; //successCallback

  $('#see-trips').click(function() {
    $.get(url, successCallback);
  });


  $('#see-trips-by-continent').on('click', 'a', function(e) {
    var continentUrl = url + '/trips/continent?query=' + $(this).data('continent');
    $.get(continentUrl, successCallback);
  });

  $('#see-reservations').on('click', function(e) {
    // Popup with form to get email
  });

  $('#see-reservations-by-email').on('click', function(e) {
    e.prevetDefault();
    $('#reservatios-form').hide();
    $('#reservations').show();
    // Get
    var reservationsUrl = $(this).attr('');
    $.get(reservationsUrl, successCallback);
  });// see-reservations-by-email.click


  $('#see-trips').on('click', 'a', function(e) {
    e.preventDefault();
    $('#trip').show();
    var tripUrl = $(this).attr('href');
    var tripID = $.get(tripUrl, tripInfomation).fail(function() {
      alert("Page Not Found");
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
