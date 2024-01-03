let todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
]

document.addEventListener('DOMContentLoaded', () => {
  const todoListTemplateHTML = document.querySelector('#todo-list-template').innerHTML
  const todoListTemplate = Handlebars.compile(todoListTemplateHTML)
  let idForDeletion = null

  displayModal = () => {
    document.querySelector('#dialog-box').classList.remove('invisible')
  }

  hideModal = () => {
    document.querySelector('#dialog-box').classList.add('invisible')
  }

  const loadTodos = () => {
    const todoList = document.querySelector('#todo-list')
    todoList.innerHTML = todoListTemplate(todoItems)
  }

  document.querySelector('ul').addEventListener('click', event => {
    if (event.target instanceof HTMLButtonElement) {
      idForDeletion = Number(event.target.parentElement.dataset.id)
      displayModal()
    }
  })
  document.querySelector('#yes-button').addEventListener('click', event => {
    todoItems = todoItems.filter(todo => todo.id !== idForDeletion)
    hideModal()
    loadTodos()
  })
  document.querySelector('#no-button').addEventListener('click', event => {
    idForDeletion = null
    hideModal()
  })

  loadTodos()
})