import { renderImages } from './js/2-render-functions';
import { fetchImages } from './js/1-pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const form = document.querySelector('.search-form');
export const gallery = document.querySelector('.gallery');

export const lightbox = new SimpleLightbox('.photos-list-link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const preloader = document.querySelector('.loader');

preloader.style.display = 'none';

export const showLoader = () => {
  preloader.style.display = 'flex';
};
const hideLoader = () => {
  preloader.style.display = 'none';
};

form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  gallery.innerHTML = '';

  const input = event.target.elements.search.value.trim();
  if (input !== '') {
    fetchImages()
      .then(photos => {
        renderImages(photos);
        hideLoader();
      })
      .catch(error => {
        console.log(error);
        hideLoader();
        iziToast.error({
          message: 'Sorry, an error occurred while loading. Please try again!',
          theme: 'dark',
          progressBarColor: '#FFFFFF',
          color: '#EF4040',
          position: 'topRight',
        });
      });
    form.reset();
  } else {
    iziToast.show({
      message: 'Please complete the field!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  }
}
