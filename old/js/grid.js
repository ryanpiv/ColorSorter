var urlParams = new URLSearchParams(window.location.search);
const grid = $('.js-grid');
let colorArray = [];
let formattedColors = [];

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  urlParams.forEach((value, key) => {
    var color = new Color(value, key);
    colorArray.push(color);
  });

  colorArray.forEach((color) => { 
    formattedColors.push(constructColor(color));
  });

  formattedColors = sortColorsByHue(formattedColors);

  for (i = 0; i < formattedColors.length; i++) {
    createColorGrid(formattedColors[i].hex, formattedColors[i].name);
  }

  addClassListener('click', '.js-grid-item', (event) => {
    let bgColor = findColorFromDiv(event);
    bgColor = hexFromRGB(bgColor);
    copyColor(bgColor);
    addColorToHistory(bgColor);
  });
});

const createColorGrid = (hex, colorName) => {
  let div = document.createElement('div');
  div.setAttribute('style', 'background-color: #' + hex);
  div.classList = 'c-grid__item l-flex l-absolute-center js-grid-item';

  let span = document.createElement('span');
  span.classList.add('c-grid__item-text');
  span.innerHTML = colorName;

  div.appendChild(span);
  grid.appendChild(div);
};

const findColorFromDiv = (event) => {
  let clickedItem = event.target;
  let bgColor = '';

  if(!clickedItem.classList.contains('c-grid__item') && !clickedItem.classList.contains('nav__color')){
    clickedItem = event.target.parentElement;
  }

  bgColor = clickedItem.style.backgroundColor;
  return bgColor;
};

const copyColor = (bgColor) => {
  let msg = copyTextToClipboard(bgColor);
  if(msg) { console.log(msg); };
};

const addColorToHistory = (color) => {
  let li = document.createElement('li');
  let span = document.createElement('span');

  li.classList = 'nav__li nav__color  js-nav-color';
  span.classList.add('nav__color-text');
  li.setAttribute('style', 'background-color: ' + color);

  span.innerHTML = color;

  li.appendChild(span);
  $('.nav__ul').appendChild(li);

  li.addEventListener('click', (event) => {
    let bgColor = findColorFromDiv(event);
    bgColor = hexFromRGB(bgColor);
    copyColor(bgColor);
  }, false);
};
