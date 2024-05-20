import{a as y,S as L,i as d}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g=s=>s.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,view:r,comments:c,downloads:f})=>`<li class="image-card">
                       <a class="image-link js-image-link" href="${a}">
                         <img src="${t}" alt="${o}" title="${o}">
                      </a>
                      
                      <div class="image-details">
                         <ul class="image-descr">
                             <li class="image-descr-det">
                                  <h3 class="title-info">Likes</h3>
                                  <p class="paragraph-info">${e}</p>
                                </li>
                                <li class="image-descr-det">
                                 <h3 class="title-info">Views</h3>
                                 <p class="paragraph-info">${r}</p>
                               </li>  
                             <li class="image-descr-det">
                                 <h3 class="title-info">Comments</h3>
                                 <p class="paragraph-info">${c}</p>
                             </li>  
                              <li class="image-descr-det">
                                  <h3 class="title-info">Downloads</h3>
                                  <p class="paragraph-info">${f}</p>
                              </li>
                 
                            </ul>
                      </div>
                  </li>`).join(""),P="43820023-fa202629be5215ad836dbfc98",w='https://pixabay.com/api/?key=$"{API_KEY}"&amp; q=$"{encodeURIComponent(currentQuery)}"&amp;page=$"{currentPage}"&amp;per_page=$"{perPage}"',h=async(s,t)=>await y.get(w,{params:{key:P,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}}),b=new L(".gallery-list a",{captionsData:"alt",captionDelay:250}),S=document.querySelector(".search-form"),u=document.querySelector(".gallery-list"),i=document.querySelector(".loader"),n=document.querySelector(".gallery-btn");let p="",l=1,m;async function M(s){s.preventDefault(),l=1;try{if(p=s.target.elements.searchKeyword.value.trim(),u.innerHTML="",n.classList.add("is-hidden"),p==="")return s.currentTarget.reset(),d.error({message:"Input field cannot be empty",position:"topRight",timeout:2e3,color:"red"});const t=await h(p,l);console.log(t),i.classList.remove("is-hidden");const a=t.data.hits;console.log(a);const o=t.data.totalHits,e=t.config.params.per_page;if(m=Math.ceil(o/e),!a.length)return i.classList.add("is-hidden"),s.target.reset(),d.error({message:"Photo not found",timeout:2e3,position:"topRight",color:"red"});i.classList.add("is-hidden");const r=g(a);u.innerHTML=r,m>1&&n.classList.remove("is-hidden"),s.target.reset(),b.refresh()}catch{return i.classList.add("is-hidden"),n.classList.add("is-hidden"),d.error({message:"Sorry, an error occurred",timeout:2e3,position:"topRight",color:"red"})}}S.addEventListener("submit",M);async function $(){try{l++,i.classList.remove("is-hidden");const t=(await h(p,l)).data.hits,a=await g(t);i.classList.add("is-hidden"),u.innerHTML+=a;const e=document.querySelector(".image-card").getBoundingClientRect();window.scrollBy({top:e.height*2,behavior:"smooth"}),u.refresh(),l>=m&&(n.classList.add("is-hidden"),d.show({position:"center",message:"We're sorry, there are no more pictures to load",timeout:2e3,color:"blue"}))}catch{return i.classList.add("is-hidden"),n.classList.add("is-hidden"),new Error("Sorry, an error occurred")}}n.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
