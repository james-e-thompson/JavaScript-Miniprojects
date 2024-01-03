document.addEventListener('DOMContentLoaded', () => {
  let teamList = document.querySelector('article ul');

  function hideModals() {
    Array.from(document.querySelectorAll('.modal')).forEach(modal => {
      modal.classList.add('invisible');
    })
  }

  teamList.addEventListener('click', event => {
    event.preventDefault();
    let target = event.target;
    if (target instanceof HTMLUListElement || target instanceof HTMLLIElement) {
      return;
    }
    if (!(target instanceof HTMLAnchorElement)) {
      target = target.parentNode;
    }
    let memberName = target.dataset.member;
    let modal = document.querySelector(`div[data-member=${memberName}]`);
    hideModals();
    modal.classList.remove('invisible');
  });

  Array.from(document.querySelectorAll('.modal-close')).forEach(modalCloser => {
    modalCloser.addEventListener('click', event => {
      event.preventDefault();
      event.currentTarget.parentNode.classList.add('invisible');
    });
  });
});