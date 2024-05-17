export const createGalleryItemMarkup = images => {
    return images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, view, comments, downloads }) => {
                return (
                    `<li class="image-card">
                       <a class="image-link js-image-link" href="${largeImageURL}">
                         <img src="${webformatURL}" alt="${tags}" title="${tags}">
                      </a>

                      <div class="image-details">
                         <ul class="image-descr">
                             <li class="image-descr-det">
                                  <h3 class="title-info">Likes</h3>
                                  <p class="paragraph-info">${likes}</p>
                                </li>
                                <li class="image-descr-det">
                                 <h3 class="title-info">Views</h3>
                                 <p class="paragraph-info">${view}</p>
                               </li>  
                             <li class="image-descr-det">
                                 <h3 class="title-info">Comments</h3>
                                 <p class="paragraph-info">${comments}</p>
                             </li>  
                              <li class="image-descr-det">
                                  <h3 class="title-info">Downloads</h3>
                                  <p class="paragraph-info">${downloads}</p>
                              </li>
                 
                            </ul>
                      </div>
                  </li>`
                );
            }
    
        ).join('');
}