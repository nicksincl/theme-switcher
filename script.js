let mainColor,
  secondaryColor,
  backgroundColor,
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
  backgroundColor = document.querySelector('#background-color');

  mainColor.addEventListener('input', updateColor('--main-color'), false);
  mainColor.addEventListener('change', updateColor('--main-color'), false);
  secondaryColor.addEventListener(
    'input',
    updateColor('--secondary-color'),
    false
  );
  secondaryColor.addEventListener(
    'change',
    updateColor('--secondary-color'),
    false
  );
  backgroundColor.addEventListener(
    'input',
    updateColor('--background-color'),
    false
  );
  backgroundColor.addEventListener(
    'change',
    updateColor('--background-color'),
    false
  );

  //switch font family on user input
  fontFamily = document.querySelector('#font-family');
  fontFamily.addEventListener('change', updateTheme, false);

  spacingRadios = document.querySelectorAll('input');
  for (const radio of spacingRadios) {
    radio.onclick = (event) => {
      if (event.target.value === 'small') {
        updateSpacing('density-s');
      } else if (event.target.value === 'medium') {
        updateSpacing('density-m');
      } else if (event.target.value === 'large') {
        updateSpacing('density-l');
      }
    };
  }

  //alter border radius on user input
  borderRadius = document.querySelector('input[type=range]');
  borderRadius.addEventListener('change', updateBorderRadius, false);
  borderRadius.addEventListener('input', updateBorderRadius, false);

  // fetch json from people.json
  fetchFromApi('people.json', appendTable, false);

  dataSet = document.getElementById('data-set');
  dataSet.addEventListener('change', getJSON, false);

  //fetch a Dog image on document load
  fetchFromApi('https://dog.ceo/api/breeds/image/random', addImageToCard)

  //switch Dog image on user click of 'Fetch!' button
  cardButton = document.getElementById('card-group-button');
  cardButton.addEventListener('click', getImage, false);
}

function getImage() {
  fetchFromApi('https://dog.ceo/api/breeds/image/random', addImageToCard);
}

function fetchFromApi(url, callback, rebuild) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, rebuild))
    .catch((err) => console.log(err.message));
}

// add Dog image to card img
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
  let url;
  if (e.target.value === 'people') {
    url = 'people.json';
  } else {
    url = `https://jsonplaceholder.typicode.com/${e.target.value}/?_limit=10`;
  }
  fetchFromApi(url, appendTable, true);
}

//create table and fill with json
function appendTable(data, reset) {
  let table = document.querySelector('table');
  let thead = document.querySelector('thead');
  let tbody = document.querySelector('tbody');
console.log(reset)
  //remove and replace thead and tbody for new json set
  if (reset) {
    thead.remove();
    tbody.remove();
    table.insertAdjacentHTML('beforeend', '<thead></thead><tbody></tbody>');
    thead = document.querySelector('thead');
    tbody = document.querySelector('tbody');
  }

  // create thead rows
  let newRow = thead.insertRow(-1);
  for (const val of Object.keys(data[0])) {
    let newCell = document.createElement('th');
    newCell.setAttribute('scope', 'col');
    let cap = val.match(/[A-Z]/g);

    if (cap) {
      let indexOfCap = val.indexOf(cap);
      let cappedFirstWord = capitaliseFirstLetter(val.slice(0, indexOfCap));
      newCell.innerHTML = `${cappedFirstWord} ` + val.slice(indexOfCap);
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
    `${event.target.value}px`
  );
}

function updateSpacing(density) {
  const densityChosen = document.getElementById('density');
  densityChosen.href = `./variables/density/${density}.css`;
}

function updateColor(color) {
  return (event) => {
    document.documentElement.style.setProperty(color, event.target.value);
  };
}

function updateTheme(event) {
  const stylesheet = document.getElementById('mode');
  if (event.target.value === 'dark') {
    stylesheet.href = './variables/theme/dark.css';
  } else if (event.target.value === 'light') {
    stylesheet.href = './variables/theme/light.css';
  }
}

function updateFontFamily(event) {
  document.documentElement.style.setProperty(
    '--global-font-family',
    event.target.value
  );
}
