const e=document.querySelector(".breed-select"),n=document.querySelector(".cat-info");function t({url:e,breeds:t}){const i=`<img src="${e}" alt="${t.name}" />\n  // <h2>${t.name}</h2>\n  // <h3>${t.description}</h3>\n  // <h3>${t.temperament}</h3>\n   `;n.innerHTML=i}e.addEventListener("change",(function(e){const n=e.currentTarget.value;return console.log(n),fetch(`https://api.thecatapi.com/v1/images/${n}?api-key=live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z`).then((e=>e.json())).then(t)})),fetch("https://api.thecatapi.com/v1/breeds?api-key=live_nOr0ffgglv54os8QMllnWrZxGl7QAeBmahHlri8B5TzOK0ViN2gR9fQPv45iz86z").then((e=>e.json())).then((function(n){n.map((({reference_image_id:n,name:t})=>{const i=`<option value = ${n} > ${t} </option> `;e.insertAdjacentHTML("afterbegin",i)}))}));
//# sourceMappingURL=index.0630097c.js.map
