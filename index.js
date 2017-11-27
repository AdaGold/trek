$(document).ready(() => {
  const baseUrl = "https://trektravel.herokuapp.com";

  const travelList = function travelList() {
    const listPartial = "/trips";
    if (".individual-trip-section") {
      $(".individual-trip-section").remove();
    }
    if ("#ajax-results p") {
      $("#ajax-results p").remove();
    }
    $.get(baseUrl + listPartial, response => {
      $(".list-trips").html(
        `<div class = "removable-trip-list  row small-up-2 medium-up-2 large-up-3 "></div>`
      );
      for (let trip of response) {
        $(".removable-trip-list").append(
          `<div class = "container column column-block "><h3 class="trip" > ${
            trip["name"]
          }</h3> <div class="overlay"  id ="${trip["id"]}">
    <div class="text">Learn More</div>
  </div><div>`
        );
      }
    })
      .fail(function(response) {
        console.log(response);
        $("#fail").html("<p>Request was unsuccessful</p>");
      })
      .always(function() {
        console.log("always even if we have success or failure");
      });
  }; //end travelList func

  const singleTrip = function singleTrip(number) {
    const singleTripUrlPartial = "/trips/";
    if (".removable-trip-list") {
      $(".removable-trip-list").remove();
    }
    $.get(baseUrl + singleTripUrlPartial + number, response => {
      // let wonderAddress = response.results[0].formatted_address;
      console.log(response);
      $(".individual-trip").html(
        `<section class = "individual-trip-section row small-up-1 medium-up-1 large-up-2"><div class = "column column-block"> <h2>${
          response["name"]
        }</h2> <button class = 'hollow button' id="reserve">Reserve Trip <i class="fa fa-plane"></i></button> <h4>Trip Details</h4> <ul><li class = 'trip-id' id='${
          response["id"]
        }'>Id: ${response["id"]} </li> <li>Category: ${
          response["category"]
        }</li> <li>Continent: ${
          response["continent"]
        }</li> <li>Duration(weeks): ${
          response["weeks"]
        }</li> <li>Price(USD): $${parseFloat(response["cost"]).toFixed(
          2
        )}</li> </ul></div> <form class = "column column-block" id="add-reservation-form" action="index.html" method="post"></form><div class = "description"> <h4>Description</h4> <p> ${
          response["about"]
        }</p></div></section>`
      );
      console.log(response);
    }).fail(function(response) {
      $("#fail").html("<p>Request was unsuccessful</p>");
    });
  };
  const callback = function response() {
    console.log("successful");
    console.log(response);
    let generatedHTML = "<p>Your reservation for trip has been added</p>";
    $("#add-reservation-form").remove();
    $("#ajax-results").html(generatedHTML);
  };
  $(".individual-trip").on("submit", function(event) {
    // don't refresh the page(default behavior)
    event.preventDefault();

    let formData = $("#add-reservation-form").serialize();
    console.log(formData);

    let bottomSandwich = "/trips/";
    let meatSandwich = $(".trip-id").attr("id");
    console.log(meatSandwich);
    let topSandwich = "/reservations";

    let sandwichURL = baseUrl + bottomSandwich + meatSandwich + topSandwich;
    console.log(sandwichURL);

    $.post(sandwichURL, formData, callback).fail(response => {
      console.log("fail case");
    });
  });
  //
  //   Retrieve list of all trips by continent: https://trektravel.herokuapp.com/trips/continent?query=Asia
  //
  // Retrieve list of all trips by max amount of weeks: https://trektravel.herokuapp.com/trips/weeks?query=3
  //
  // Retrieve list of all trips by max budget: https://trektravel.herokuapp.com/trips/budget?query=5000

  // EVENTS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  $(".list-trips").on("click", ".overlay", function() {
    let tripId = $(this).attr("id");
    singleTrip(tripId);
  });

  $(".individual-trip").on("click", "#reserve", function() {
    $("#reserve").remove();
    $("#add-reservation-form").html(`  <label for 'name'>Name:</label>
    <input type='text' name= 'name'></input>
  <label for ='age'>Age:</label>
    <input type='text' name= 'age'></input>
    <label for ='email'>Email:</label>
      <input type='text' name= 'email'></input>
    <input type='submit' name="submit" value="Reserve Now" class="hollow button">`);
    let tripId = $(this).attr("id");
    console.log(tripId);
  });

  $("#reserve").click(function(event) {
    travelList();
  });

  $("#travel-list").click(function(event) {
    travelList();
  });
}); //end document ready
