import{i as l,s as g}from"./assets/vendor-87ec4f81.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const h=document.querySelector(".form"),L=document.querySelector("#input");h.addEventListener("submit",s=>{s.preventDefault();let n=`https://pixabay.com/api/?key=41494285-2be0c6d487dc7750955372a82&q=${L.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true`;const r=document.querySelector(".gallery");r.innerHTML="",fetch(n).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{if(e.hits.length===0)throw l.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topCenter"});const t=e.hits.reduce((a,{webformatURL:c,largeImageURL:u,tags:m,likes:p,views:d,comments:f,downloads:y})=>a+`<li class="gallery-item">
          <a class="gallery-link" href="${u}">
           <img class="gallery-image"
           src="${c}"
           alt="${m}"
           />
          </a>
          <p>Likes:${p}</p>
          <p>Views:${d}</p>
          <p>Comments:${f}</p>
          <p>Downloads:${y}</p>
        </li>`,"");r.innerHTML=t,new g("ul.gallery a",{captionDelay:250,captionsData:"alt"}).open()}).catch(e=>{l.error({message:e.message,color:"red",position:"topCenter"})})});
//# sourceMappingURL=commonHelpers.js.map
