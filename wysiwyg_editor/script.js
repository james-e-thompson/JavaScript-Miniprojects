const changeSelectedAlignmentButton = (element) => {
  document.querySelector('.current-alignment').classList.remove('current-alignment')
  element.classList.add('current-alignment')
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('mousedown', event => {
    if (event.target.parentNode.id === 'buttons') {
      event.preventDefault()
    }
  })
  document.querySelector('#bold-button').addEventListener('click', event => {
    document.execCommand('bold')
  })
  document.querySelector('#italics-button').addEventListener('click', event => {
    document.execCommand('italic')
  })
  document.querySelector('#strikethrough-button').addEventListener('click', event => {
    document.execCommand('strikethrough')
  })
  document.querySelector('#link-button').addEventListener('click', event => {
    const url = prompt('What is the URL for the link?')
    document.execCommand('createLink', undefined, url)
  })
  document.querySelector('#ul-button').addEventListener('click', event => {
    document.execCommand('insertUnorderedList')
  })
  document.querySelector('#ol-button').addEventListener('click', event => {
    document.execCommand('insertOrderedList')
  })
  document.querySelector('#right-button').addEventListener('click', event => {
    console.log('justifying right')
    document.execCommand('justifyRight')
    setFocusedAlignButton()
  })
  document.querySelector('#left-button').addEventListener('click', event => {
    document.execCommand('justifyLeft')
    setFocusedAlignButton()
  })
  document.querySelector('#center-button').addEventListener('click', event => {
    document.execCommand('justifyCenter')
    setFocusedAlignButton()
  })
  document.querySelector('#justify-button').addEventListener('click', event => {
    document.execCommand('justifyFull')
    setFocusedAlignButton()
  })
  const setFocusedAlignButton = () => {
    let currentDiv = window.getSelection().anchorNode
    while (!(currentDiv instanceof HTMLDivElement)) {
      if (currentDiv === document.body) {
        return
      }
      currentDiv = currentDiv.parentNode
    }
    console.log(currentDiv)
    switch (currentDiv.style.textAlign) {
      case '':
      case 'left':
        changeSelectedAlignmentButton(document.querySelector('#left-button'))
        break
      case 'right':
        changeSelectedAlignmentButton(document.querySelector('#right-button'))
        break
      case 'center':
        changeSelectedAlignmentButton(document.querySelector('#center-button'))
        break
      case 'justify':
        changeSelectedAlignmentButton(document.querySelector('#justify-button'))
        break
    }
  }
  document.addEventListener('selectionchange', setFocusedAlignButton)
});