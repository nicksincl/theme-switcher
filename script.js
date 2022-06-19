let mainColor, secondaryColor, accentColor;

window.addEventListener('load', startup, false);

function startup() {
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

  mainColor.select();
  secondaryColor.select();
  accentColor.select();
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
