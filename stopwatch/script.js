function setAccurateInterval(callback, duration) {
  const startTime = Date.now()
  let timesCalled = 0
  return setInterval(() => {
    correctNumberOfCalls = Math.floor((Date.now() - startTime) / duration)
    while (timesCalled < correctNumberOfCalls) {
      callback()
      timesCalled += 1
    }
  }, duration)
}

const zeroPad = (num, length) => {
  numStr = String(num)
  if (numStr.length < length) {
    return '0'.repeat(length - numStr.length) + numStr
  } else {
    return numStr
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let stopwatchInterval = null
  let displayInterval = null
  let currentTime = [0, 0, 0, 0]
  const centisecondsElement = document.querySelector('#centiseconds')
  const secondsElement = document.querySelector('#seconds')
  const minutesElement = document.querySelector('#minutes')
  const hoursElement = document.querySelector('#hours')
  const timeElements = [centisecondsElement, secondsElement,
    minutesElement, hoursElement]

  const displayTime = () => {
    currentTime.forEach((timeComponent, index) => {
      timeElements[index].textContent = zeroPad(currentTime[index], 2)
    })
  }

  const incrementTime = () => {
    let conversions = [100, 60, 60, null]
    currentTime[0] += 1
    for (let index = 0; index < currentTime.length; index++) {
      if (currentTime[index] === conversions[index]) {
        currentTime[index] = 0
        currentTime[index + 1] += 1
      } else {
        break
      }
    }
  }

  document.querySelector('#start-stop-button').addEventListener('click', event => {
    if (event.target.dataset.state === 'start') {
      stopwatchInterval = setAccurateInterval(() => {
        incrementTime()
      }, 10)
      displayInterval = setInterval(() => {
        displayTime()
      }, 10)
      event.target.dataset.state = 'stop'
      event.target.textContent = 'stop'
    } else {
      clearInterval(stopwatchInterval)
      clearInterval(displayInterval)
      event.target.dataset.state = 'start'
      event.target.textContent = 'start'
    }
  })

  document.querySelector('#reset-button').addEventListener('click', event => {
    const startStopButton = document.querySelector('#start-stop-button')
    startStopButton.dataset.state = 'start'
    startStopButton.textContent = 'start'
    clearInterval(stopwatchInterval)
    clearInterval(displayInterval)
    currentTime = [0, 0, 0, 0]
    displayTime()
  })
})