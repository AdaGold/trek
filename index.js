$(document).ready(() => {
  const baseUrl = "https://trektravel.herokuapp.com";

  const travelList = function travelList() {
    let travelInfo = [];

    const listPartial = "/trips";
    $.get(baseUrl + listPartial, response => {
      for (let trip of response) {
        // let wonderAddress = response.results[0].formatted_address;
        $(".list-trips").append(
          `<h3 class="trip" id ="${trip["id"]}"> ${trip["name"]}</h3>`
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

    $.get(baseUrl + singleTripUrlPartial + number, response => {
      // let wonderAddress = response.results[0].formatted_address;
      console.log(response);
      $(".individual-trip").html(
        `<h2>${response["name"]}</h2> <h4>Trip Details</h4> <ul><li>Id: ${
          response["id"]
        } </li> <li>Category: ${response["category"]}</li> <li>Continent: ${
          response["continent"]
        }</li> <li>Duration(weeks): ${
          response["weeks"]
        }</li> <li>Price(USD): $${
          response["cost"]
        }</li> </ul> <h4>Description<h4><p> ${response["about"]}</p>`
      );
      console.log(response);
    })
      .fail(function(response) {
        $("#fail").html("<p>Request was unsuccessful</p>");
      })
      .always(function() {
        console.log("always even if we have success or failure");
      });
  };

  // EVENTS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  $(".list-trips").on("click", "h3", function() {
    let tripId = $(this).attr("id");
    singleTrip(tripId);
  });

  $("#travel-list").click(function(event) {
    travelList();
  });
}); //end document ready
