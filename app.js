let nextBtn = document.getElementById('nextCat');
let previousBtn = document.getElementById('previousCat');
let catFactBtn = document.getElementById('catFacts');
let imgSrc = document.getElementById("catImage");
let lastImg = [];

const proxy = 'https://cors-anywhere.herokuapp.com/';
const apiKey = '24ab03a7-123d-4935-94c0-6579f4988b49';
const catUrl = `https://api.thecatapi.com/v1/images/search`;
const catFacts = `${proxy}https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1`;

getCat();
function btnStatus() {
  if (lastImg === undefined || lastImg.length == 0) {
       previousBtn.disabled = true;
    } else {
      previousBtn.disabled = false;
    }
}

function getCat() {
  btnStatus();
  getCatFact();
  fetch(catUrl, {
  mode: 'cors',
  headers: new Headers({
    'Content-Type': 'application/json',
    'x-api-key': apiKey
  }),

  }).then(response => {
    return response.json();
  })
  .then(data => {
    lastImg.push(data[0]['url'])
    imgSrc.src = data[0]['url'];
  });
}

function getCatFact() {
  fetch(catFacts)
  .then(response => {
    return response.json();
  })
  .then(data => {
    catFactBtn.textContent = data.text;
  });
}

nextBtn.addEventListener('click', nextCat);
function nextCat() {
  getCat();
}

previousBtn.addEventListener('click', lastCat);
function lastCat() {

  if (lastImg !== imgSrc.src) {
    for (let i = 0; i < lastImg.length; i++){
      imgSrc.src = lastImg[i - 1];
    }
  } else {
      console.log('they match ' + imgSrc.src)
  }

}
