import{a as L,S as w,i as d}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const h=s=>s.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,view:r,comments:n,downloads:y})=>`<li class="image-card">
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
                                 <p class="paragraph-info">${n}</p>
                             </li>  
                              <li class="image-descr-det">
                                  <h3 class="title-info">Downloads</h3>
                                  <p class="paragraph-info">${y}</p>
                              </li>
                 
                            </ul>
                      </div>
                  </li>`).join(""),S="43820023-fa202629be5215ad836dbfc98",b="https://pixabay.com/api/",g=async(s,t)=>await L.get(b,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}}),f=new w(".gallery-list a",{captionsData:"alt",captionDelay:250}),M=document.querySelector(".search-form"),m=document.querySelector(".gallery-list"),i=document.querySelector(".loader"),c=document.querySelector(".gallery-btn");let u="",l=1,p;async function P(s){s.preventDefault(),l=1;try{if(u=s.target.elements.searchKeyword.value.trim(),m.innerHTML="",c.classList.add("is-hidden"),u==="")return s.currentTarget.reset(),d.error({message:"Input field cannot be empty",position:"topRight",timeout:2e3,color:"red"});const t=await g(u,l);console.log(t),i.classList.remove("is-hidden");const a=t.data.hits;console.log(a);const o=t.data.totalHits,e=t.config.params.per_page;if(p=Math.ceil(o/e),!a.length)return i.classList.add("is-hidden"),s.target.reset(),d.error({message:"Photo not found",timeout:2e3,position:"topRight",color:"red"});i.classList.add("is-hidden");const r=h(a);m.innerHTML=r,p>1&&c.classList.remove("is-hidden"),s.target.reset(),f.refresh()}catch{return i.classList.add("is-hidden"),c.classList.add("is-hidden"),d.error({message:"Sorry, an error occurred",timeout:2e3,position:"topRight",color:"red"})}}M.addEventListener("submit",P);async function v(){try{l++,i.classList.remove("is-hidden");const t=(await g(u,l)).data.hits,a=await h(t);i.classList.add("is-hidden"),m.innerHTML+=a;const e=document.querySelector(".image-card").getBoundingClientRect();window.scrollBy({top:e.height*2,behavior:"smooth"}),f.refresh(),l>=p&&(c.classList.add("is-hidden"),d.show({position:"center",message:"We're sorry, there are no more pictures to load",timeout:2e3,color:"yellow"}))}catch{return i.classList.add("is-hidden"),c.classList.add("is-hidden"),new Error("Sorry, an error occurred")}}c.addEventListener("click",v);
//# sourceMappingURL=commonHelpers.js.map
