'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import css-loader from 'css-loader '; только в typescript

const form = document.querySelector('.form');
const input = document.querySelector('#input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = input.value.trim();
  gallery.innerHTML = ''; // Очищення
  input.value = '';
  loader.style.display = 'block';

  // object iterator
  const searchParams = new URLSearchParams({
    key: '41494285-2be0c6d487dc7750955372a82',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      loader.style.display = 'none';
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
          theme: 'dark',
          //   messageColor: '#FAFAFB',
          backgroundColor: '#EF4040',
          titleColor: 'white',
          position: 'topRight',
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
          <div class="description">
          <p>Likes:<span>${likes}</span></p>
          <p>Views:<span>${views}</span></p>
          <p>Comments:<span>${comments}</span></p>
          <p>Downloads:<span>${downloads}</span></p>
          </div> 
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

      modal.refresh();
    })
    .catch(error => {
      iziToast.error({
        message: error.message,
        color: 'red',
        position: 'topCenter',
      });
    });
});
