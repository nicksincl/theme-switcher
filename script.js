let mainColor,
  secondaryColor,
  accentColor,
  theme,
  fontFamily,
  spacingRadios,
  borderRadius,
  dataSet,
  cardButton;

window.addEventListener('load', startup, false);

function startup() {
  // theme select input
  theme = document.querySelector('#theme');
  theme.addEventListener('change', updateTheme, false);

  //font family select input
  fontFamily = document.querySelector('#font-family');
  fontFamily.addEventListener('change', updateFontFamily, false);

  // color picker inputs
  mainColor = document.querySelector('#main-color');
  secondaryColor = document.querySelector('#secondary-color');
  accentColor = document.querySelector('#accent-color');

  mainColor.addEventListener('input', updateFirst('--main-color'), false);
  mainColor.addEventListener('change', updateAll('--main-color'), false);
  secondaryColor.addEventListener(
    'input',
    updateFirst('--secondary-color'),
    false
  );
  secondaryColor.addEventListener(
    'change',
    updateAll('--secondary-color'),
    false
  );
  accentColor.addEventListener('input', updateFirst('--accent-color'), false);
  accentColor.addEventListener('change', updateAll('--accent-color'), false);

  fontFamily = document.querySelector('#font-family');
  fontFamily.addEventListener('change', updateTheme, false);

  spacingRadios = document.querySelectorAll('input');
  for (const radio of spacingRadios) {
    radio.onclick = function (event) {
      if (event.target.value === 'small') {
        updateSpacing('density-s');
      } else if (event.target.value === 'medium') {
        updateSpacing('density-m');
      } else if (event.target.value === 'large') {
        updateSpacing('density-l');
      }
    };
  }

  borderRadius = document.querySelector('input[type=range]');
  borderRadius.addEventListener('change', updateBorderRadius, false);
  borderRadius.addEventListener('input', updateBorderRadius, false);

  // fetch json from people.json
  fetch('people.json')
    .then((response) => response.json())
    .then((data) => appendTable(data, false))
    .catch((err) => console.log(err.message));

  dataSet = document.getElementById('data-set');
  dataSet.addEventListener('change', getJSON, false);

  //fetchImage();

  cardButton = document.getElementById('card-group-button');
  cardButton.addEventListener('click', fetchImage, false);
}

// fetch dog images from images.dog.ceo api
function fetchImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => addImageToCard(data))
    .catch((err) => console.log(err.message));
}

function addImageToCard(result) {
  const cardImg = document.getElementById('card-img');
  const para = cardImg.nextElementSibling.nextElementSibling;

  cardImg.src = result.message;
  let breed = result.message.split('/')[4];
  if (breed.indexOf('-') !== -1) {
    let nameArr = [];
    for (const partOfName of breed.split('-')) {
      nameArr.push(capitaliseFirstLetter(partOfName));
    }
    para.innerHTML = nameArr.join(' ');
  } else {
    para.innerHTML = capitaliseFirstLetter(breed);
  }
}

//get json from jsonplaceholder.typicode.com api or people.json
function getJSON(e) {
  console.log(e.target.value);
  let url;
  if (e.target.value === 'people') {
    url = 'people.json';
  } else {
    url = `https://jsonplaceholder.typicode.com/${e.target.value}/?_limit=10`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => appendTable(data, true))
    .catch((err) => console.log(err.message));
}

//create table and fill with json
function appendTable(data, reset) {
  let table = document.querySelector('table');
  let thead = document.querySelector('thead');
  let tbody = document.querySelector('tbody');

  //remove and replace thead and tbody for new json data set
  if (reset) {
    thead.remove();
    tbody.remove();
    table.insertAdjacentHTML('beforeend', '<thead></thead><tbody></tbody>');
    thead = document.querySelector('thead');
    tbody = document.querySelector('tbody');
  }
  // create thead rows
  let newRow = thead.insertRow(-1);
  for (let val of Object.keys(data[0])) {
    let newCell = document.createElement('th');
    newCell.setAttribute('scope', 'col');
    let cap = val.match(/[A-Z]/g);

    if (cap) {
      let indexOfCap = val.indexOf(cap);
      let cappedFirstWord = capitaliseFirstLetter(val.slice(0, indexOfCap));
      newCell.innerHTML = cappedFirstWord + ' ' + val.slice(indexOfCap);
    } else {
      newCell.innerHTML = capitaliseFirstLetter(val);
    }
    newRow.appendChild(newCell);
  }

  // create tbody rows
  for (let col of data) {
    newRow = tbody.insertRow(-1);
    for (let [index, val] of Object.values(col).entries()) {
      let newCell = newRow.insertCell(index);
      let cellText = document.createTextNode(val);
      newCell.appendChild(cellText);
    }
  }
}

function capitaliseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateBorderRadius(event) {
  document.documentElement.style.setProperty(
    '--global-border-radius',
    event.target.value + 'px'
  );
}

function updateSpacing(density) {
  let densityChosen = document.getElementById('density');
  densityChosen.href = `${density}.css`;
}

function updateFirst(color) {
  return function (event) {
    document.documentElement.style.setProperty(color, event.target.value);
  };
}

function updateAll(color) {
  return function (event) {
    document.documentElement.style.setProperty(color, event.target.value);
  };
}

function updateTheme(event) {
  let stylesheet = document.getElementById('mode');
  if (event.target.value === 'dark') {
    stylesheet.href = 'dark.css';
  } else if (event.target.value === 'light') {
    stylesheet.href = 'light.css';
  }
}

function updateFontFamily(event) {
  document.documentElement.style.setProperty(
    '--global-font-family',
    event.target.value
  );
}
