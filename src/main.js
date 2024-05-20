import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryItemMarkup } from './js/render-functions.js';
import { fetchData } from './js/pixabay-api.js';

const galleryStyles = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.search-form');
const listGallery = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.gallery-btn');

let searchQuery = '';
let currentPage = 1;
let totalPages;

async function onSearchFormSubmit(event) {
    event.preventDefault();
    currentPage = 1;
    
    try {
        searchQuery = event.target.elements.searchKeyword.value.trim();
        listGallery.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');

        if (searchQuery === '') {
            event.currentTarget.reset();
            return iziToast.error({
                message: 'Input field cannot be empty',
                position: 'topRight',
                timeout: 2000,
                color: 'red',
            });
        }

        const responseInfo = await fetchData(searchQuery, currentPage);
        console.log(responseInfo);
        loader.classList.remove('is-hidden');

        const imageArray = responseInfo.data.hits;
        console.log(imageArray);
        const totalImages = responseInfo.data.totalHits;
        const perPage = responseInfo.config.params.per_page;
        totalPages = Math.ceil(totalImages / perPage);

        if (!imageArray.length) {
            loader.classList.add('is-hidden');
            event.target.reset();
            return iziToast.error({
                message:
                    'Photo not found',
                timeout: 2000,
                position: 'topRight',
                color: 'red',
            });
        }

        loader.classList.add('is-hidden');
        const galleryMarkup = createGalleryItemMarkup(imageArray);
        listGallery.innerHTML = galleryMarkup;

        if (totalPages > 1) {
            loadMoreBtn.classList.remove('is-hidden');
        }

        event.target.reset();
        galleryStyles.refresh();
    } catch (error) {
        loader.classList.add('is-hidden');
        loadMoreBtn.classList.add('is-hidden');
        return iziToast.error({
            message:
                'Sorry, an error occurred',
            timeout: 2000,
            position: 'topRight',
            color: 'red',
        });
    }
}

searchForm.addEventListener('submit', onSearchFormSubmit);


async function onClickLoadMoreBtn() {
 try {
      currentPage++;
     loader.classList.remove('is-hidden');

     const loadMoreData = await fetchData(searchQuery, currentPage);
     const imageArray = loadMoreData.data.hits;
     const newGalleryMarkup = await createGalleryItemMarkup(imageArray);
    
     loader.classList.add('is-hidden');
     listGallery.innerHTML += newGalleryMarkup;
     
     const imageCard = document.querySelector('.image-card');
     const rect = imageCard.getBoundingClientRect();
     window.scrollBy({
      top: rect.height * 2,
      behavior: 'smooth',
     });

     listGallery.refresh();

     if (currentPage >= totalPages) {
         loadMoreBtn.classList.add('is-hidden');
         return iziToast.info({
              position: 'topRight',
              message: "We're sorry, there are no more pictures to load",
             timeout: 2000,
             color: 'blue',
           });
       }
    } catch (error) {
     loader.classList.add('is-hidden');
     loadMoreBtn.classList.add('is-hidden');
     return new Error('Sorry, an error occurred');
    }
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);
