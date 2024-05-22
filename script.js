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

// Nastavení úvodní pozice nadpisu
function setInitialNadpisPosition()
{
  nadpis.style.fontFamily = 'Arial, sans-serif';
  nadpis.style.color = '#d9d9d9';
  nadpis.style.fontSize = '30px';
  nadpis.style.position = 'relative';
  nadpis.style.top = '-30px';
  nadpis.style.left = '50%';
  nadpis.style.transform = 'translate(-50%, -130px)';
  nadpis.style.zIndex = '2';
}
// Nastavení úvodní pozici nadpisu
setInitialNadpisPosition();

// Nastavení pozice nadpisu po stisknutí tlačítka menu
function resetNadpisPosition() {
  nadpis.style.position = 'relative';
  nadpis.style.top = '-30px';
}

// HTML
htmlbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  content = htmlContent;
  imageIndex = 0;
  displayImage();
  toggleButtons();
  gradientContainer.style.display = 'none';
  nadpis.style.display = 'none';
});

// CSS
cssbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  content = cssContent;
  imageIndex = 0;
  displayImage();
  toggleButtons();
  gradientContainer.style.display = 'none';
  nadpis.style.display = 'none';
});

// JS
jsbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  content = jsContent;
  imageIndex = 0;
  displayImage();
  toggleButtons();
  gradientContainer.style.display = 'none';
  nadpis.style.display = 'none';
});

// Tlačítko Další
nextbtn.addEventListener('click', () =>
{
  imageIndex = (imageIndex + 1) % content.length;
  displayImage();
});

// Tlačítko Předchozí
prevbtn.addEventListener('click', () =>
{
  imageIndex = (imageIndex - 1 + content.length) % content.length;
  displayImage();
});

// Tlačítko Menu
backbtn.addEventListener('click', () =>
{
  resetNadpisPosition();
  contentDiv.innerHTML = '';
  nadpis.textContent = 'PŘEHLED';
  toggleButtons();
  gradientContainer.style.display = 'block';
  nadpis.style.display = 'block';
});

// Šipky pro ovládání obrázků
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
    resetNadpisPosition();
    contentDiv.innerHTML = '';
    nadpis.textContent = 'PŘEHLED';
    toggleButtons();
    gradientContainer.style.display = 'block';
    nadpis.style.display = 'block';
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

// Swipe na mobilu
function touchMove(event)
{
  if (!isDragging) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - startX;

  if (deltaX > 50)
  {
    // Swipe doprava
    imageIndex = (imageIndex - 1 + content.length) % content.length;
    displayImage();
    isDragging = false;
  }
  if (deltaX < -50)
  {
    // Swipe doleva
    imageIndex = (imageIndex + 1) % content.length;
    displayImage();
    isDragging = false;
  }
}

let loadedImagesCount = 0;

// Funkce pro přednačítání obrázků
function preloadImages(images)
{
  for (let i = 0; i < images.length; i++)
  {
    const img = new Image();
    img.onload = () =>
      {
      loadedImagesCount++;
      if (loadedImagesCount === images.length)
      {
        console.log('Preload dokončen');
      }
    };
    img.src = images[i];
  }
}

document.addEventListener('DOMContentLoaded', function()
{
  preloadImages(htmlContent);
  preloadImages(cssContent);
  preloadImages(jsContent);
});

// SW
if ('serviceWorker' in navigator)
{
  navigator.serviceWorker.register('/prehled/sw.js').then(() =>
  {
    console.log('Service Worker úspěšně spuštěn. Offline režim aktivován.');
  }).catch(error =>
  {
    console.log('Registrace Service Workera selhala:', error);
  });
}
