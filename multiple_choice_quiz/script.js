let questions = [
  {
    id: '1',
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: '2',
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: '3',
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: '4',
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
]

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' }

document.addEventListener('DOMContentLoaded', () => {
  let questionTemplateHTML = document.querySelector('#question-template').innerHTML
  Handlebars.registerPartial('question', questionTemplateHTML)
  let questionsTemplateHTML = document.querySelector('#questions-template').innerHTML
  let questionsTemplate = Handlebars.compile(questionsTemplateHTML)
  let feedbackTemplateHTML = document.querySelector('#feedback-template').innerHTML
  let feedbackTemplate = Handlebars.compile(feedbackTemplateHTML)
  document.querySelector('#questions').innerHTML = questionsTemplate({questions})

  let form = document.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    let questionBoxes = Array.from(document.querySelector('#questions').children)
    questionBoxes.forEach(questionBox => {
      const questionId = questionBox.dataset.questionId
      const correctAnswer = answerKey[questionId]
      const submittedAnswer = questionBox.querySelector(':checked').value
      const answerFeedbackBox = questionBox.querySelector('.feedback')
      if (correctAnswer === submittedAnswer) {
        answerFeedbackBox.innerHTML = feedbackTemplate({})
      } else {
        answerFeedbackBox.innerHTML = feedbackTemplate({correctAnswer})
      }
    })
    form.querySelector('#submit-button').setAttribute('disabled', '')
  })

  document.querySelector('#reset-button').addEventListener('click', event => {
    Array.from(document.querySelectorAll('.feedback')).forEach(feedbackBox => {
      feedbackBox.innerHTML = ''
    })
    document.querySelector('#submit-button').removeAttribute('disabled')
    form.reset()
  })
})