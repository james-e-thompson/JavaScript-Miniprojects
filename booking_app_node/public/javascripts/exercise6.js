function cancelSchedule(scheduleId) {
  let request = new XMLHttpRequest();
  request.open('DELETE', `/api/schedules/${scheduleId}`);
  request.addEventListener('load', () => {
    console.log(request.response);
  });
  request.send();
}

function cancelBooking(bookingId) {
  let request = new XMLHttpRequest();
  request.open('PUT', `/api/bookings/${bookingId}`);
  request.addEventListener('load', () => {
    console.log(request.response);
  });
  request.send();
}