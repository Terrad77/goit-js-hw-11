'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import css-loader from 'css-loader '; только в typescript

const form = document.querySelector('.form');
const input = document.querySelector('#input');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();

  let url = `https://pixabay.com/api/?key=41494285-2be0c6d487dc7750955372a82&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очищення

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json(); //{total: 24261, totalHits: 500, hits: Array(20)}
    })
    .then(data => {
      //Якщо бекенд повертає порожній масив, показуй повідомлення
      if (data.hits.length === 0) {
        throw iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topCenter',
          //   close: false,
        });
      }
      const imgs = data.hits.reduce(
        (
          html,
          {
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }
        ) =>
          html +
          `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
           <img class="gallery-image"
           src="${webformatURL}"
           alt="${tags}"
           />
          </a>
          <p>Likes:${likes}</p>
          <p>Views:${views}</p>
          <p>Comments:${comments}</p>
          <p>Downloads:${downloads}</p>
        </li>`,
        ''
      );

      // add murkup to DOM
      gallery.innerHTML = imgs;

      //init SimpleLightbox
      let modal = new simpleLightbox('ul.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
      });
      modal.open();
    })
    .catch(error => {
      iziToast.error({
        message: error.message,
        color: 'red',
        position: 'topCenter',
      });
    });
});
