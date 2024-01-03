document.addEventListener('DOMContentLoaded', () => {
  let itemList = document.querySelector('ul');
  let form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = form.name.value;
    let quantity = form.quantity.value || '1';
    let newListItem = document.createElement('li');
    newListItem.textContent = `${quantity} ${name}`
    itemList.appendChild(newListItem);
    form.reset();
  });
});