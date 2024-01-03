document.addEventListener('DOMContentLoaded', () => {
  const abbreviate = text => {
    if (text.length < 120) {
      return text
    } else {
      return text.slice(0, 120) + '...'
    }
  }
  const fullParagraphs = {}
  Array.from(document.querySelectorAll('p')).forEach(paragraph => {
    fullParagraphs[paragraph.dataset.id] = paragraph.textContent
    if (paragraph.textContent.length < 120) {
      paragraph.parentElement.querySelector('button').remove()
    }
    paragraph.textContent = abbreviate(paragraph.textContent)
  })
  document.addEventListener('click', event => {
    if (event.target instanceof HTMLButtonElement) {
      const matchingParagraph = event.target.parentElement.querySelector('p')
      if (event.target.dataset.state === 'less') {
        event.target.dataset.state = 'more'
        event.target.textContent = 'Show less'
        const fullText = fullParagraphs[matchingParagraph.dataset.id]
        matchingParagraph.textContent = fullText
      } else if (event.target.dataset.state === 'more') {
        event.target.dataset.state = 'less'
        event.target.textContent = 'Show more'
        matchingParagraph.textContent = abbreviate(matchingParagraph.textContent)
      }
    }
  })
})