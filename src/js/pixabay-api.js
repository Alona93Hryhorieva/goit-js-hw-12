import axios from "axios"

const API_KEY = '43820023-fa202629be5215ad836dbfc98';
const API_URL = 'https://pixabay.com/api/?key=$"{API_KEY}"&amp; q=$"{encodeURIComponent(currentQuery)}"&amp;page=$"{currentPage}"&amp;per_page=$"{perPage}"';

export const fetchData = async (queryString, page) => {
  const searchParams = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: queryString,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return searchParams;

  // try {
  //   const response = await fetch(API_URL);
  //   const data = await response.json();

  //   if (data.hits.length > 0) {
  //     createGalleryItemMarkup(data.hits);
  //     loadMoreBtn.classList.remove('is-hidden');
  //     } else {
  //      loadMoreBtn.classList.add('is-hidden');
  //   }
    
  // } catch (error) {
  //   console.error('Error fetching images:', error);
    
  // } finally {
  //   loader.classList.add('is-hidden');
  // }
};


 





  