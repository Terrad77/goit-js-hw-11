import{i as l,s as L}from"./assets/vendor-87ec4f81.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const w=document.querySelector(".form"),c=document.querySelector("#input"),u=document.querySelector(".gallery"),n=document.querySelector(".loader");n.style.display="none";w.addEventListener("submit",i=>{i.preventDefault();const o=c.value.trim();u.innerHTML="",c.value="",n.style.display="block";const a=new URLSearchParams({key:"41494285-2be0c6d487dc7750955372a82",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});fetch(`https://pixabay.com/api/?${a}`).then(t=>{if(n.style.display="none",!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.hits.length===0)throw l.show({message:"Sorry, there are no images matching your search query. Please try again!",theme:"dark",backgroundColor:"#EF4040",titleColor:"white",position:"topRight"});const e=t.hits.reduce((s,{webformatURL:p,largeImageURL:d,tags:m,likes:y,views:f,comments:h,downloads:g})=>s+`<li class="gallery-item">
          <a class="gallery-link" href="${d}">
           <img class="gallery-image"
           src="${p}"
           alt="${m}"
           />
          </a>          
          <div class="description">
          <p>Likes:<span>${y}</span></p>
          <p>Views:<span>${f}</span></p>
          <p>Comments:<span>${h}</span></p>
          <p>Downloads:<span>${g}</span></p>
          </div> 
        </li>`,"");u.innerHTML=e,new L("ul.gallery a",{captionDelay:250,captionsData:"alt"}).refresh()}).catch(t=>{n.style.display="none",l.error({message:t.message,color:"red",position:"topCenter"}),console.error("Error fetching data:",t)})});
//# sourceMappingURL=commonHelpers.js.map
