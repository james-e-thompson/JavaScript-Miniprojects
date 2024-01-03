document.addEventListener('DOMContentLoaded', () => {
  let currentTimeoutId = null;
  document.querySelector('#gallery').addEventListener('mouseover', event => {
    console.log(event.target)
    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId)
      Array.from(document.querySelectorAll('.selected')).forEach(element => {
        element.classList.remove('selected')
      })
    }
    if (event.target instanceof HTMLImageElement) {
      currentTimeoutId = setTimeout(() => {
        event.target.parentNode.classList.add('selected')
      }, 2000)
    }
  })
})