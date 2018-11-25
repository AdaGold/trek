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
    tripDetail.append(`<p>
      Name: ${response.data.name}</p>
      <p>Continent: ${response.data.continent}</p>
      <p>Cost: $${response.data.cost}</p>
      <p>Category: ${response.data.category}</p>
      <p>Weeks: ${response.data.weeks}</p>
      <p>Trip Details: ${response.data.about}
      </p>

      <section class="new-trip">
      <h1>Add a Reservation</h1>
      <form  action="" id="trip-form">
          <label for="name">Your name</label>
          <input type="text" name="name" />
          <label for="email">Email</label>
          <input type="text" name="email"/>
          <input type="submit" value="Add Reservation" />
      </form>
      </section>`);

      $('#trip-form').submit((event) => {
        event.preventDefault();
        createReservation(id);
      })
  })
};

const createReservation = (id) => {

  const postURL = `${URL}/${id}/reservations`

  reportStatus("loading trip details...");
  reportStatus('Sending trip data...');

  const payload = {
    name: $('input[name="name"]').val(),
    email: $('input[name="email"]').val(),
  };

  axios.post(postURL, payload)
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
    });
};

$(document).ready(() => {
  $('#load').click(loadTrips);

  $('body').on('click', '.trip_id', function(event){
    loadTripDetails(event.target.id);
  });
});
