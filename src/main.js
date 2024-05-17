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
// let totalPages;



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
        
        loader.classList.remove('is-hidden');

        const searchParamsObj = await fetchData(searchQuery, page);
        console.log(searchParamsObj);



    





    } catch (error) {
        
    }



}




    

  
        
        





    

//     fetchPhotosByQuery(searchQuery)
//         .then(imagesData => {
//             console.log('Received data:', imagesData); 

//             if (imagesData.hits.length === 0 || !imagesData.hits) {
//                 iziToast.show({
//                     message: 'Sorry, there are no images for this query',
//                     position: 'topRight',
//                     timeout: 2000,
//                     color: 'red',
//                 });

//                 listGallery.innerHTML = '';
//                 return;
//             }

//             listGallery.innerHTML = createGalleryItemMarkup(imagesData.hits);

//             if (lightbox) {
//                 lightbox.destroy();
//             }
//             lightbox = new SimpleLightbox('.js-gallery a', {
//                 captionDelay: 250,
//             });
//         })
        
//         .catch(error => {
//             console.error('Error fetching photos:', error);
//             iziToast.show({
//                 message: 'An error occurred while fetching photos',
//                 position: 'topRight',
//                 timeout: 2000,
//                 color: 'red',
//             });
//         })

//         .finally(() => {
//             event.target.reset();
//             loader.classList.add('is-hidden');
//         });
// }

searchForm.addEventListener('submit', onSearchFormSubmit);
