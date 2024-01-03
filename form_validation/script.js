const issuesFunctions = {
  firstName: valueMissingIssue.bind(null, 'first name'),
  lastName: valueMissingIssue.bind(null, 'last name'),
  password: passwordIssues,
  email: emailIssues,
  phoneNumber: phoneNumberIssues,
  creditCardNumber: creditCardNumberIssues,
}

function valueMissingIssue(inputName, validity) {
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  if (validity.valueMissing) {
    return [`${capitalize(inputName)} cannot be empty.`]
  } else {
    return [];
  }
}

function passwordIssues(validity) {
  let issues = valueMissingIssue('password', validity);
  if (validity.tooShort) {
    issues.push('Password must be at least 10 characters.')
  }
  return issues;
}

function emailIssues(validity) {
  let issues = valueMissingIssue('email', validity);
  if (validity.patternMismatch) {
    issues.push('Email has invalid format.')
  }
  return issues;
}

function phoneNumberIssues(validity) {
  if (validity.patternMismatch) {
    return ['Phone number has invalid format.']
  } else {
    return [];
  }
}

function creditCardNumberIssues(validity) {
  if (validity.patternMismatch) {
    return ['Credit card number has invalid format.']
  } else {
    return [];
  }
}

function issuesWithInput(inputElement) {
  let issuesFunction = issuesFunctions[inputElement.name];
  return issuesFunction(inputElement.validity);
}

function allInputsValid(form) {
  return form.checkValidity();
}

function addInvalidInputMessages(input, issues) {
  let messageBox = input.parentNode.querySelector('.inputError');
  messageBox.textContent = issues.join(' ');
  messageBox.classList.remove('invisible');
}

function removeInvalidInputMessage(input) {
  let messageBox = input.parentNode.querySelector('.inputError');
  messageBox.classList.add('invisible');
}

function addInvalidFormMessage() {
  document.querySelector('.formError').classList.remove('invisible');
}

function removeInvalidFormMessage() {
  document.querySelector('.formError').classList.add('invisible');
}

function inputGroupIssues(inputs) {
  function uniqueElements(array) {
    let seen = [];
    array.forEach(element => {
      if (!seen.includes(element)) {
        seen.push(element);
      }
    });
    return seen;
  }
  let allIssues = [];
  inputs.forEach(input => {
    let issuesFunction = issuesFunctions[input.name];
    let issuesWithInput = issuesFunction(input.validity);
    allIssues = allIssues.concat(issuesWithInput);
  });
  return uniqueElements(allIssues);
}

function updateInputGroupMessage(input) {
  let inputs = input.parentNode.querySelectorAll('input');
  let issuesWithAssociatedInputs = inputGroupIssues(inputs);
  if (issuesWithAssociatedInputs.length === []) {
      removeInvalidInputMessage(inputGroup);
  } else {
    addInvalidInputMessages(input, issuesWithAssociatedInputs);
  }
}

function restrictInput(input) {
  if ('charPattern' in input.dataset) {
    let pattern = new RegExp(input.dataset.charPattern);
    input.addEventListener('keypress', event => {
      let key = event.key;
      if (!key.match(pattern)) {
        event.preventDefault();
      }
    });
  }
}

function urlEncodedFormData(form) {
  let parameters = [];
  let inputGroups = form.querySelectorAll('.inputGroup');
  Array.from(inputGroups).forEach(inputSection => {
    let inputs = Array.from(inputSection.querySelectorAll('input'));
    let name = encodeURI(inputs[0].name);
    let value = encodeURI(inputs.map(input => input.value).join(''));
    parameters.push(`${name}=${value}`);
  });
  return parameters.join('&');
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  let inputs = Array.from(form.querySelectorAll('input'));
  inputs.forEach(input => {
    input.addEventListener('blur', event => {
      updateInputGroupMessage(input);
      if (allInputsValid(form)) {
        removeInvalidFormMessage();
      }
    });
    restrictInput(input);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!allInputsValid(form)) {
      addInvalidFormMessage();
    } else {
      formData = urlEncodedFormData(form);
      console.log(formData);
      document.querySelector('#formData').textContent = formData;
    }
  })
  
  let creditCardInputGroup = document.querySelector('#creditCardInputGroup')
  Array.from(creditCardInputGroup.querySelectorAll('input:not(.last)')).forEach(input => {
    input.addEventListener('keyup', event => {
      let nextInput = input.nextElementSibling;
      if (input.value.length >= 4) {
        nextInput.select();
      }
    });
  });
});