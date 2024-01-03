const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

const uniqueValues = arr => {
  const seen = []
  arr.forEach(element => {
    if (!seen.includes(element)) {
      seen.push(element)
    }
  })
  return seen
}

document.addEventListener('DOMContentLoaded', () => {
  const selectTemplateHTML = document.querySelector('#select-template').innerHTML
  const selectTemplate = Handlebars.compile(selectTemplateHTML)
  Handlebars.registerPartial('select', selectTemplateHTML)
  const formTemplateHTML = document.querySelector('#form-template').innerHTML
  const formTemplate = Handlebars.compile(formTemplateHTML)
  const carInfoTemplateHTML = document.querySelector('#car-info-template').innerHTML
  const carInfoTemplate = Handlebars.compile(carInfoTemplateHTML)
  const fields = ['make', 'model', 'year', 'price']
  const form = document.querySelector('form')
  const fieldValues = []
  fields.forEach(field => {
    fieldValues.push({
      name: field,
      values: ['all', ...uniqueValues(cars.map(car => car[field]))]
    })
  })
  document.querySelector('form').innerHTML = formTemplate(fieldValues)

  const displayCars = cars => {
    console.log(cars)
    document.querySelector('#car-box').innerHTML = carInfoTemplate(cars)
  }

  displayCars(cars)

  form.addEventListener('change', event => {
    const changedField = event.target.name
    const newValue = selectedValue(event.target)
    fields.forEach(field => {
      if (field !== changedField) {
        const matchingValues = ['all']
        cars.forEach(car => {
          if ((String(car[changedField]) === newValue || newValue === 'all')
            && !matchingValues.includes(car[field])) {
            matchingValues.push(car[field])
          }
        })
        let selectElement = form.querySelector(`select[name="${field}"]`)
        const previousValue = selectedValue(selectElement)
        selectElement.outerHTML = selectTemplate({name: field, values: matchingValues})
        selectElement = form.querySelector(`select[name="${field}"]`)
        const previouslySelectedOption = selectElement.querySelector(`[value="${previousValue}"]`)
        if (previouslySelectedOption) {
          selectElement.value = previousValue
        }
      }
    })
  })

  const selectedValue = (selectElement) => {
    return selectElement.options[selectElement.selectedIndex].value
  }

  const matchingCars = () => {
    return cars.filter(car => {
      return fields.every(field => {
        const selectElement = form.querySelector(`[name="${field}"]`)
        return String(car[field]) === selectedValue(selectElement)
          || selectedValue(selectElement) === 'all'
      })
    })
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    displayCars(matchingCars())
  })
})