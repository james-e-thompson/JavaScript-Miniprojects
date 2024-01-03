function displayChosenImage() {
  let topImage = document.querySelector('figure img');
  let selectedImage = document.querySelector('.current')
  console.log(selectedImage.alt);
  topImage.src = selectedImage.src;
  topImage.alt = selectedImage.alt;
  topImage.title = selectedImage.title;
}

document.addEventListener('DOMContentLoaded', () => {
  let photoList = document.querySelector('ul');
  photoList.addEventListener('click', event => {
    if (event.target instanceof HTMLImageElement) {
      Array.from(document.querySelectorAll('ul img')).forEach(image => {
        image.classList.remove('current');
      });
      event.target.classList.add('current');
    }
    displayChosenImage();
  });
});