const htmlContent =
[
  '/prehled/HTML/html1.jpg',
  '/prehled/HTML/html2.jpg',
  '/prehled/HTML/html3.jpg',
  '/prehled/HTML/html4.jpg',
  '/prehled/HTML/html5.jpg',
  '/prehled/HTML/html6.jpg',
  '/prehled/HTML/html7.jpg',
  '/prehled/HTML/html8.jpg',
  '/prehled/HTML/html9.jpg'
];

const cssContent =
[
  '/prehled/CSS/css1.jpg',
  '/prehled/CSS/css2.jpg',
  '/prehled/CSS/css3.jpg',
  '/prehled/CSS/css4.jpg',
  '/prehled/CSS/css5.jpg',
  '/prehled/CSS/css6.jpg',
  '/prehled/CSS/css7.jpg'
];

const jsContent =
[
  '/prehled/JS/js1.jpg',
  '/prehled/JS/js2.jpg',
  '/prehled/JS/js3.jpg',
  '/prehled/JS/js4.jpg',
  '/prehled/JS/js5.jpg',
  '/prehled/JS/js6.jpg',
  '/prehled/JS/js7.jpg',
  '/prehled/JS/js8.jpg',
  '/prehled/JS/js9.jpg'
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
