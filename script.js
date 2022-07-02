let mainColor,
  secondaryColor,
  accentColor,
  theme,
  fontFamily,
  spacingRadios,
  borderRadius;

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
}

function updateBorderRadius() {
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

function updateFontFamily() {
  console.log(fontFamily.value);
}
