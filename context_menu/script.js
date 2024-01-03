let todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
]

document.addEventListener('DOMContentLoaded', () => {
  const todoListTemplateHTML = document.querySelector('#todo-list-template').innerHTML
  const todoListTemplate = Handlebars.compile(todoListTemplateHTML)
  const contextMenu = document.querySelector('#context-menu')
  let selectedTodoId = null

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

  const displayContextMenu = event => {
    contextMenu.style.top = `${event.pageY}px`
    contextMenu.style.left = `${event.pageX}px`
    contextMenu.classList.remove('invisible')
  }

  const hideContextMenu = () => {
    contextMenu.classList.add('invisible')
  }

  document.querySelector('#todo-list').addEventListener('contextmenu', event => {
    if (event.target instanceof HTMLLIElement) {
      event.preventDefault()
      selectedTodoId = Number(event.target.dataset.id)
      console.log(`now selecting ${selectedTodoId}`)
      displayContextMenu(event)
    }
  })

  document.querySelector('#yes-button').addEventListener('click', event => {
    todoItems = todoItems.filter(todo => todo.id !== selectedTodoId)
    hideModal()
    loadTodos()
  })

  document.querySelector('#no-button').addEventListener('click', event => {
    selectedTodoId = null
    hideModal()
  })

  document.addEventListener('click', event => {
    if (event.target.parentElement === contextMenu.firstElementChild) {
      if (event.target.id === 'delete-button') {
        displayModal()
      }
    }
    hideContextMenu()
  })

  contextMenu.addEventListener('mouseenter', event => {
    if (event.target instanceof HTMLLIElement) {
      event.target.classList.add('selected')
    }
  }, true)

  contextMenu.addEventListener('mouseleave', event => {
    Array.from(contextMenu.querySelectorAll('li')).forEach(menuItem => {
      menuItem.classList.remove('selected')
    })
  }, true)

  loadTodos()
})