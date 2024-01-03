let staff = null;
let students = null;
let scheduleForm = null;
let studentForm = null;
let studentInput = null

function currentOption(select) {
  return select.options[select.selectedIndex];
}

function getStaff(callback) {
  let staffRequest = new XMLHttpRequest();
  staffRequest.open('GET', '/api/staff_members');
  staffRequest.responseType = 'json';
  staffRequest.addEventListener('load', () => {
   console.log(staffRequest.response);
   staff = staffRequest.response;
   callback();
  });
  staffRequest.send();
}

function populateScheduleOptions() {
  let scheduleRequest = new XMLHttpRequest();
  scheduleRequest.open('GET', '/api/schedules');
  scheduleRequest.responseType = 'json';
  scheduleRequest.addEventListener('load', () => {
    addSchedulesToOptions(openSchedules(scheduleRequest.response));
  });
  scheduleRequest.send(); 
}

function openSchedules(schedules) {
  return schedules.filter(({student_email}) => !student_email)
}

function addSchedulesToOptions(schedules) {
  let scheduleSelect = document.querySelector('select');
  schedules.forEach(({id, staff_id, date, time}) => {
    let newOption = document.createElement('option');
    let staffName = staff.find(({id}) => id === staff_id).name;
    let optionText = `${staffName} | ${date} | ${time}`
    newOption.textContent = optionText;
    newOption.setAttribute('schedule-id', id);
    scheduleSelect.appendChild(newOption);
  });
}

function sendScheduleFormData(callback) {
  let scheduleSelect = scheduleForm.querySelector('select');
  let scheduleId = currentOption(scheduleSelect).getAttribute('schedule-id');
  formJSON = {id: scheduleId,
    student_email: scheduleForm.email.value}
  let request = new XMLHttpRequest();
  request.open('POST', 'api/bookings');
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', () => {
    console.log(request.response);
    callback(request);
  });
  console.log(`Sending: ${JSON.stringify(formJSON)}`)
  request.send(JSON.stringify(formJSON));
}

function openStudentInputDialog(bookingSequence) {
  studentForm.email.value = scheduleForm.email.value;
  studentForm['booking-sequence'].value = bookingSequence;
  studentInput.classList.remove('invisible');
  studentForm.addEventListener('submit', handleStudentFormSubmission);
}

function handleScheduleFormSubmission(event) {
  event.preventDefault();
  sendScheduleFormData((request) => {
    if (request.status === 204) {
      alert('Booked');
      reset();
    } else if (request.status === 404) {
      let bookingSequence = Number(request.responseText.split(': ')[1]);
      openStudentInputDialog(bookingSequence);
    }
  });
}

function reset() {
  studentInput.classList.add('invisible');
  studentForm.name.value = '';
  scheduleForm.email.value = '';
  let scheduleSelect = scheduleForm.querySelector('select');
  currentOption(scheduleSelect).remove();
}

function handleStudentFormSubmission(event) {
  event.preventDefault();
  formJSON = {email: scheduleForm.email.value,
    name: studentForm.name.value,
    booking_sequence: studentForm['booking-sequence'].value}
  let request = new XMLHttpRequest();
  request.open('POST', 'api/students');
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', () => {
    sendScheduleFormData(() => alert('Booked'));
    reset();
  });
  request.send(JSON.stringify(formJSON));
}

function addListeners() {
  scheduleForm.addEventListener('submit', handleScheduleFormSubmission);
}

document.addEventListener('DOMContentLoaded', () => {
  scheduleForm = document.querySelector('#schedule-form');
  studentForm = document.querySelector('#student-form');
  studentInput = document.querySelector('#student-input');
  getStaff(populateScheduleOptions);
  addListeners();
});