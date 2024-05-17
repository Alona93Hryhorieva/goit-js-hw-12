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
        const galleryMarkup = await createGalleryItemMarkup(imageArray);
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
    const addedImgArray = loadMoreData.data.hits;
    const editedGalleryMarkup = await createGalleryMarkup(addedImgArray);
    loaderEl.classList.add('is-hidden');
    galleryElements.innerHTML += editedGalleryMarkup;
    const imageCard = document.querySelector('.image-card');
    const rect = imageCard.getBoundingClientRect();
    window.scrollBy({
      top: rect.height * 2,
      behavior: 'smooth',
    });

    galleryStyles.refresh();

    if (currentPage >= totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      return iziToast.info({
        position: 'topRight',
        message: "We're sorry, there are no more pictures to load",
      });
    }
    // loadMoreBtn.classList.add('.is-hidden');
  } catch (error) {
    loaderEl.classList.add('is-hidden');
    loadMoreBtn.classList.add('is-hidden');
    return new Error('Oops, something went wrong 😞');
  }
}

    
}






loadMoreBtn.classList.add('is-hidden');
            loadMoreBtn.removeEventListener('click', clickLoadMoreBtn);

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                backgroundColor: 'blue',
                theme: 'light',
                position: 'topRight',
                timeout: 2000,
            });
        } else {
            loadMoreBtn.classList.remove('is-hidden');
        }

        listGallery.innerHTML = createCard(data.hits);
        loadMoreBtn.addEventListener('click', clickLoadMoreBtn);

        gallery.refresh();

    } catch {
        iziToast.error({
            message: 'An error occurred. Please try again later.',
            position: 'topRight',
            timeout: 2000,
            color: 'red',
        });
    }
}




searchForm.addEventListener('submit', onSearchFormSubmit);

let gallery = new SimpleLightbox('.gallery-item__link', {
    captionsData: 'alt',
    captionDelay: 250
});

gallery.on('show.simplelightbox', function (event) {
    event.preventDefault();
});


loaderEl.classList.add('is-hidden');
    const galleryMarkup = await createGalleryMarkup(responseInfo.data.hits.length);
    galleryElements.innerHTML = galleryMarkup;

    if (totalPages > 1) {
      loadMoreBtn.classList.remove('is-hidden');
    }

    event.target.reset();
    galleryStyles.refresh();
  } catch (error) {
    loaderEl.classList.add('is-hidden');
    loadMoreBtn.classList.add('is-hidden');
    return new Error('Oops, something went wrong 😞');
  


        
        


    











    

  
        
        





    

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
