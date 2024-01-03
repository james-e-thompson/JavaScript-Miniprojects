$(function() {
  $('[type=submit]').on('click', event => {
    let firstNumber = Number($('#first-number').val());
    let secondNumber = Number($('#second-number').val());
    let operation = $('#operator :selected').text();
    event.preventDefault();
    let operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b
    }
    let result = operations[operation](firstNumber, secondNumber);
    $('#result').text(result);
  });
})