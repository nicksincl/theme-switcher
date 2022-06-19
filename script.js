let mainColor, secondaryColor, accentColor;

window.addEventListener('load', startup, false);

function startup() {
  mainColor = document.querySelector('#main-color');
  secondaryColor = document.querySelector('#secondary-color');
  accentColor = document.querySelector('#accent-color');

  mainColor.addEventListener('input', updateFirst, false);
  mainColor.addEventListener('change', updateAll, false);
  secondaryColor.addEventListener('input', updateFirst, false);
  secondaryColor.addEventListener('change', updateAll, false);
  accentColor.addEventListener('input', updateFirst, false);
  accentColor.addEventListener('change', updateAll, false);

  mainColor.select();
  secondaryColor.select();
  accentColor.select();
}

function updateFirst(event) {
  document.documentElement.style.setProperty(
    '--main-color',
    event.target.value
  );
}

function updateAll(event) {
  document.documentElement.style.setProperty(
    '--main-color',
    event.target.value
  );
}
