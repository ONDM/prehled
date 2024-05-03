const htmlContent =
[
  'HTML/html1.jpg',
  'HTML/html2.jpg',
  'HTML/html3.jpg',
  'HTML/html4.jpg',
  'HTML/html5.jpg',
  'HTML/html6.jpg',
  'HTML/html7.jpg',
  'HTML/html8.jpg',
  'HTML/html9.jpg'
];

const cssContent =
[
  'CSS/css1.jpg',
  'CSS/css2.jpg',
  'CSS/css3.jpg',
  'CSS/css4.jpg',
  'CSS/css5.jpg',
  'CSS/css6.jpg',
  'CSS/css7.jpg'
];

const jsContent =
[
  'JS/js1.jpg',
  'JS/js2.jpg',
  'JS/js3.jpg',
  'JS/js4.jpg',
  'JS/js5.jpg',
  'JS/js6.jpg',
  'JS/js7.jpg',
  'JS/js8.jpg',
  'JS/js9.jpg'
];

const htmlbtn = document.getElementById('htmlbtn');
const cssbtn = document.getElementById('cssbtn');
const jsbtn = document.getElementById('jsbtn');
const prevbtn = document.getElementById('prevbtn');
const nextbtn = document.getElementById('nextbtn');
const backbtn = document.getElementById('backbtn');
const contentDiv = document.getElementById('content');
const nadpis = document.getElementById('nadpis');
const gradientContainer = document.getElementById('gradient-container');

let imageIndex = 0;
let content = [];

// HTML
htmlbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  content = htmlContent;
  imageIndex = 0;
  displayImage();
  nadpis.textContent = 'HTML';
  toggleButtons();
  gradientContainer.style.display = 'none';
});

// CSS
cssbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  content = cssContent;
  imageIndex = 0;
  displayImage();
  nadpis.textContent = 'CSS';
  toggleButtons();
  gradientContainer.style.display = 'none';
});

// JS
jsbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  content = jsContent;
  imageIndex = 0;
  displayImage();
  nadpis.textContent = 'JavaScript';
  toggleButtons();
  gradientContainer.style.display = 'none';
});

// TLAČÍTKO DALŠÍ
nextbtn.addEventListener('click', () =>
{
  imageIndex = (imageIndex + 1) % content.length;
  displayImage();
});

// TLAČÍTKO PŘEDCHOZÍ
prevbtn.addEventListener('click', () =>
{
  imageIndex = (imageIndex - 1 + content.length) % content.length;
  displayImage();
});

// TLAČÍTKO MENU
backbtn.addEventListener('click', () =>
{
  resetNadpisPosition1();
  contentDiv.innerHTML = '';
  nadpis.textContent = 'PŘEHLED PŘÍKAZŮ';
  toggleButtons();
  gradientContainer.style.display = 'block';
});

// ŠIPKY PRO OVLÁDÁNÍ OBRÁZKŮ
document.addEventListener('keydown', (event) =>
{
  if (event.key === 'ArrowRight')
  {
    imageIndex = (imageIndex + 1) % content.length;
    displayImage();
  }
  if (event.key === 'ArrowLeft')
  {
    imageIndex = (imageIndex - 1 + content.length) % content.length;
    displayImage();
  }
  if (event.key === 'Escape' && contentDiv.innerHTML !== '')
  {
    resetNadpisPosition1();
    contentDiv.innerHTML = '';
    nadpis.textContent = 'PŘEHLED PŘÍKAZŮ';
    toggleButtons();
    gradientContainer.style.display = 'block';
  }
});

function toggleButtons()
{
  const buttons = document.querySelectorAll('.buttons button:not(#backbtn):not(#nextbtn):not(#prevbtn)');
  buttons.forEach(button =>
  {
    button.style.display = button.style.display === 'none' ? '' : 'none';
  });
  backbtn.style.display = backbtn.style.display === 'none' ? '' : 'none';
  nextbtn.style.display = nextbtn.style.display === 'none' ? '' : 'none';
  prevbtn.style.display = prevbtn.style.display === 'none' ? '' : 'none';
}

function displayImage()
{
  const imageSrc = content[imageIndex];
  contentDiv.innerHTML = `<img src="${imageSrc}" id="image">`;
}

function resetNadpisPosition()
{
  nadpis.style.position = 'relative';
  nadpis.style.top = '-125px';
}

function resetNadpisPosition1()
{
  nadpis.style.top = '0px';
}


let startX = 0;
let isDragging = false;

contentDiv.addEventListener('touchstart', touchStart, false);
contentDiv.addEventListener('touchmove', touchMove, false);

function touchStart(event)
{
  const touch = event.touches[0];
  startX = touch.clientX;
  isDragging = true;
}

// SWIPE NA MOBILU
function touchMove(event)
{
  if (!isDragging) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - startX;

  if (deltaX > 50)
  {
    // SWIPE DOPRAVA
    imageIndex = (imageIndex - 1 + content.length) % content.length;
    displayImage();
    isDragging = false;
  }
  if (deltaX < -50)
  {
    // SWIPE DOLEVA
    imageIndex = (imageIndex + 1) % content.length;
    displayImage();
    isDragging = false;
  }
}
