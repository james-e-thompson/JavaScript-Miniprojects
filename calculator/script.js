document.addEventListener('DOMContentLoaded', () => {
  const operationWindow = document.querySelector('#operation-window')
  const entryWindow = document.querySelector('#entry-window')
  const buttonPanel = document.querySelector('#buttons')
  let currentEntryStr = ''
  let currentOperation = null
  let result = null
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  }
  const updateResult = () => {
    const currentEntry = Number(currentEntryStr)
    if (currentOperation) {
      result = operations[currentOperation](result, currentEntry)
    } else {
      result = currentEntry
    }
  }
  const processButtonPush = label => {
    currentEntryStr = entryWindow.textContent
    if (label.match(/[0-9]/)) {
      currentEntryStr = String(Number(currentEntryStr + label))
    } else if (Object.keys(operations).includes(label)) {
      updateResult()
      currentOperation = label
      operationWindow.textContent += currentEntryStr + ` ${label} `
      currentEntryStr = ''
      console.log({currentOperation, result})
    }
    switch (label) {
      case '=':
        updateResult()
        operationWindow.textContent = ''
        currentEntryStr = result
        break
      case '.':
        if (!currentEntryStr.includes('.')) {
          currentEntryStr += '.'
        }
        break
      case 'NEG':
        if (currentEntryStr.includes('-')) {
          currentEntryStr = currentEntryStr.slice(1)
        } else {
          currentEntryStr = '-' + currentEntryStr
        }
        break
      case 'CE':
        currentEntryStr = '0'
        break
      case 'C':
        currentEntryStr = '0'
        operationWindow.textContent = ''
        result = null
        currentOperation = null
    }
    entryWindow.textContent = currentEntryStr
  }
  buttonPanel.addEventListener('click', event => {
    if (event.target.parentElement === buttonPanel) {
      processButtonPush(event.target.textContent)
    }
  })
})