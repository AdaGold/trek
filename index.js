const baseUrl = "https://trektravel.herokuapp.com";

const travelList = function travelList() {
  let travelInfo = [];
  // $.get(listUrl, response => {
  //   console.log("success!");
  //   travelInfo.push(response);
  //   console.log(response);
  // });

  $(document).ready(() => {
    const listPartial = "/trips";
    let travelInfo = [];
    $.get(baseUrl + listPartial, response => {
      console.log("success!");

      travelInfo.push(response);
      console.log(response);
      for (let trip of response) {
        // let wonderAddress = response.results[0].formatted_address;
        $(".list-trips").append(`<h3> ${trip["name"]}</h3>`);
      }
    });
  });
}; //end travelList func

$(document).ready(() => {
  //
  // .fail(function(response) {
  //   console.log(response);
  //   $("#fail").html("<p>Request was unsuccessful</p>");
  // })
  // .always(function() {
  //   console.log("always even if we have success or failure");
  // });
}); //end document ready
