const URL = 'https://trektravel.herokuapp.com/trips'

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p>`
  content += "<ul>";
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  reportStatus(content);
};


const loadTripDetails = (id) => {
  reportStatus("loading trip details...");

  const tripDetail = $('#trip-detail');
  tripDetail.empty();

  axios.get(URL + "/" + id)
  .then((response) => {
    reportStatus(response);
    console.log(response);
    tripDetail.append(`<p>
      Name: ${response.data.name}</p>
      <p>Continent: ${response.data.continent}</p>
      <p>Cost: $${response.data.cost}</p>
      <p>Category: ${response.data.category}</p>
      <p>Weeks: ${response.data.weeks}</p>
      <p>Trip Details: ${response.data.about}
      </p>`);

  })

};

const createReservation = (id) => {
  reportStatus("loading trip details...");

  console.log("you're in create trip!");
  reportStatus('Sending pet data...');

  // const tripReservation = $('.new-trip');
  // tripReservation.empty();

  const data = {
    name: $('input[name="name"]').val(),
    email: $('input[name="email"]').val(),
  };

  axios.post(URL, data)
  .then((response) => {
    reportStatus(`Successfully added a reservation ${response.data.id} for ${response.data.name}, email ${response.data.email}`);
  })
  .catch((error) => {
    if (error.response.data && error.response.data.errors) {
      reportError(
        `Encountered an error: ${error.message}`,
        error.response.data.errors
      );
    } else {
      reportStatus(`Encountered an error: ${error.message}`);
    }
  });

};

const loadTrips = () => {
  reportStatus("loading trips...");

  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(URL)
  .then((response) => {
    reportStatus(`Successfully loaded ${response.data.length} trips`);

    // sort

    response.data.forEach((trip) => {
      tripList.append(`<li><a href='#' class="trip_id" id=${trip.id}>${trip.name}</li>`);

    });
  })
  .catch((error) => {
    reportStatus(error);
    console.log(error);
  });
};

$(document).ready(() => {
  $('#load').click(loadTrips);
  $('body').on('click', '.trip_id', function(event){
    loadTripDetails(event.target.id);
    // tripReservation(event.target.id);
    console.log(event);
  });
  // $('#trip-form').submit(createTrip);
});
