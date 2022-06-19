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
  let colObj = {
    dark: {
      '--main-color': '#579fff',
      '--secondary-color': '#fe973e',
      '--accent-color': '#272727',
      '--black-color': '#ffffff',
      '--white-color': '#0d0d0d',
    },
    light: {
      '--main-color': '#2f80ed',
      '--secondary-color': '#f2994a',
      '--accent-color': '#f2f2f2',
      '--black-color': '#1c1c1c',
      '--white-color': '#ffffff',
    },
  };
  let themeCols = colObj[theme.value];
  mainColor.value = themeCols['--main-color'];
  secondaryColor.value = themeCols['--secondary-color'];
  accentColor.value = themeCols['--accent-color'];

  for (const colProperty in themeCols) {
    let hex = themeCols[colProperty];
    document.documentElement.style.setProperty(colProperty, hex);
  }
}

function updateFontFamily() {
  console.log(fontFamily.value);
}
