let mainColor, secondaryColor, accentColor, theme, fontFamily;

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

function updateTheme() {
  if (theme.value == 'light') {
    mainColor.value = '#2f80ed';
    secondaryColor.value = '#f2994a';
    accentColor.value = '#f2f2f2';
    document.documentElement.style.setProperty('--main-color', '#2f80ed');
    document.documentElement.style.setProperty('--secondary-color', '#f2994a');
    document.documentElement.style.setProperty('--accent-color', '#f2f2f2');
    document.documentElement.style.setProperty('--black-color', '#000000');
    document.documentElement.style.setProperty('--white-color', '#ffffff');
  } else {
    mainColor.value = '#0f2747';
    secondaryColor.value = '#835126';
    accentColor.value = '#272727';
    document.documentElement.style.setProperty('--main-color', '#579FFF');
    document.documentElement.style.setProperty('--secondary-color', '#FE973E');
    document.documentElement.style.setProperty('--accent-color', '#272727');
    document.documentElement.style.setProperty('--black-color', '#ffffff');
    document.documentElement.style.setProperty('--white-color', '#0D0D0D');
  }
}

function updateFontFamily() {
  console.log(fontFamily.value);
}
