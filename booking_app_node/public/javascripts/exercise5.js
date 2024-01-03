let bookingDates = [];
let datesList = null;

function getBookingDates(callback) {
  let bookingDatesRequest = new XMLHttpRequest();
  bookingDatesRequest.open('GET', '/api/bookings');
  bookingDatesRequest.responseType = 'json';
  bookingDatesRequest.addEventListener('load', () => {
    bookingDates = bookingDatesRequest.response;
   callback();
  });
  bookingDatesRequest.send();
}

function populateDateList() {
  bookingDates.forEach(date => {
    let listItem = document.createElement('li');
    listItem.textContent = date;
    datesList.appendChild(listItem);
  });
}

function addBookingDetails(bookings, bookingDateElement) {
  let bookingsList = document.createElement('ul');
  bookings.forEach(booking => {
    let bookingItem = document.createElement('li');
    bookingItem.textContent = booking.join(' | ');
    bookingsList.appendChild(bookingItem);
  });
  bookingDateElement.appendChild(bookingsList);
}

function openBookings(bookingDateElement) {
  let date = bookingDateElement.textContent;
  let bookingsRequest = new XMLHttpRequest();
  bookingsRequest.open('GET', `/api/bookings/${date}`);
  bookingsRequest.responseType = 'json';
  bookingsRequest.addEventListener('load', () => {
    addBookingDetails(bookingsRequest.response, bookingDateElement)
  });
  bookingsRequest.send();
}

document.addEventListener('DOMContentLoaded', () => {
  datesList = document.querySelector('#dates-list');
  getBookingDates(populateDateList);
  datesList.addEventListener('click', event => {
    if (event.target instanceof HTMLLIElement) {
      openBookings(event.target);
    }
  });
});