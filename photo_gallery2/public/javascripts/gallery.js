document.addEventListener('DOMContentLoaded', async () => {
  let currentPhotoFigure = null;
  let numberOfPhotos = null;
  let photos = null;
  let likesPartial = document.querySelector('#photo_likes').innerHTML;
  Handlebars.registerPartial('likesHolder', likesPartial);
  let favoritesPartial = document.querySelector('#photo_favorites').innerHTML;
  Handlebars.registerPartial('favoritesHolder', favoritesPartial);
  let commentPartial = document.getElementById('photo_comment').innerHTML;
  Handlebars.registerPartial('comment', commentPartial);

  function removeChildNodes(element) {
    Array.from(element.childNodes).forEach(node => {
      element.removeChild(node);
    });
  }

  function fillWithTemplate(nodeToFill, templateElement, contentObject,
    fillMethod = 'inner') {
    removeChildNodes(nodeToFill);
    let fillingContent = Handlebars.compile(templateElement.innerHTML)(contentObject);
    if (fillMethod === 'inner') {
      nodeToFill.innerHTML = fillingContent;    
    } else if (fillMethod === 'outer') {
      let tempNode = document.createElement('div');
      tempNode.innerHTML = fillingContent;
      Array.from(tempNode.firstElementChild.childNodes).forEach(child => {
        nodeToFill.appendChild(child);
      });
      tempNode.remove();
    }
  }

  function populatePhotos(photos) {
    let slides = document.getElementById('slides');
    let photosTemplate = document.getElementById('photos');
    fillWithTemplate(slides, photosTemplate, {photos});
  }

  function populatePhotoInfo() {
    let currentPhoto = photos.find(photo => {
      return photo.id === Number(photoFigureId(currentPhotoFigure))
    });
    let photoInfoHeader = document.querySelector('section header');
    let photoInfoTemplate = document.getElementById('photo_information');
    fillWithTemplate(photoInfoHeader, photoInfoTemplate, currentPhoto);
    addLikeListener();
    addFavoriteListener();
  }

  function populateComments(comments) {
    let commentsElement = document.querySelector('#comments ul');
    let commentsTemplate = document.getElementById('photo_comments');
    fillWithTemplate(commentsElement, commentsTemplate, {comments});
    addNewCommentListener();
  }

  function photoFigureId(figure) {
    return figure.dataset.id;
  }

  function nextElementSiblingWraparound(node) {
    if (node.nextElementSibling) {
      return node.nextElementSibling
    } else {
      return node.parentNode.firstElementChild;
    }
  }

  function previousElementSiblingWraparound(node) {
    if (node.previousElementSibling) {
      return node.previousElementSibling
    } else {
      return node.parentNode.lastElementChild;
    }
  }

  async function getComments(photoFigure) {
    let photoId = photoFigureId(photoFigure);
    let commentsRespose = await fetch(`/comments?photo_id=${photoId}`, {method: 'GET'});
    return await commentsRespose.json();
  }

  function setCurrentPhotoFigure(newCurrentPhotoFigure) {
    Array.from(document.querySelector('#slides').children).forEach(figure => {
      figure.classList.remove('selected');
    });
    newCurrentPhotoFigure.classList.add('selected');
    currentPhotoFigure = newCurrentPhotoFigure;
  }

  document.querySelector('.next').addEventListener('click', async event => {
    event.preventDefault();
    setCurrentPhotoFigure(nextElementSiblingWraparound(currentPhotoFigure));
    let comments = await getComments(currentPhotoFigure);
    populateComments(comments);
    populatePhotoInfo();
  });

  document.querySelector('.prev').addEventListener('click', async event => {
    event.preventDefault();
    setCurrentPhotoFigure(previousElementSiblingWraparound(currentPhotoFigure));
    let comments = await getComments(currentPhotoFigure);
    populateComments(comments);
    populatePhotoInfo();
  });

  function setLikeTotal(total) {
    let likeButton = document.querySelector('.button.like');
    let likeTemplateElement = document.querySelector('#photo_likes')
    fillWithTemplate(likeButton, likeTemplateElement, {likes: total}, 'outer');
  }

  function setFavoriteTotal(total) {
    let favoriteButton = document.querySelector('.button.favorite');
    let favoriteTemplateElement = document.querySelector('#photo_favorites')
    fillWithTemplate(favoriteButton, favoriteTemplateElement, {favorites: total}, 'outer');
  }

  function addLikeListener() {
    document.querySelector('.button.like').addEventListener('click', async event => {
      event.preventDefault();
      let likeResponse = await fetch('/photos/like', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `photo_id=${photoFigureId(currentPhotoFigure)}`,
      });
      let newTotal = (await likeResponse.json()).total;
      setLikeTotal(newTotal);
    });
  }

  function addFavoriteListener() {
    document.querySelector('.button.favorite').addEventListener('click', async event => {
      event.preventDefault();
      let favoriteResponse = await fetch('/photos/favorite', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `photo_id=${photoFigureId(currentPhotoFigure)}`,
      });
      let newTotal = (await favoriteResponse.json()).total;
      setFavoriteTotal(newTotal);
    });
  }

  function addNewCommentListener() {
    let newCommentForm = document.querySelector('#comments form');
    newCommentForm['photo_id'].value = photoFigureId(currentPhotoFigure);
    newCommentForm.addEventListener('submit', async event => {
      event.preventDefault();
      let formData = new FormData(newCommentForm);
      let urlEncodedFormData = new URLSearchParams(formData).toString();
      let response = await fetch('/comments/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: urlEncodedFormData,
      })
      displayNewComment(await response.json());
      newCommentForm.reset();
    });
  }

  function displayNewComment(commentData) {
    let commentTemplateObject = document.querySelector('#photo_comment');
    let newListItem = document.createElement('li');
    fillWithTemplate(newListItem, commentTemplateObject, commentData, 'outer');
    let commentList = document.querySelector('#comments ul');
    commentList.appendChild(newListItem);
  }

  let photosResponse = await fetch('/photos', {method: 'GET'});
  photos = await photosResponse.json();
  numberOfPhotos = photos.length;
  populatePhotos(photos);
  currentPhotoFigure = document.querySelector('#slides').firstElementChild;
  currentPhotoFigure.classList.add('selected');
  populatePhotoInfo();
  let comments = await getComments(currentPhotoFigure);
  populateComments(comments);
});