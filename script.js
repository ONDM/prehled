const htmlbtn = document.getElementById('htmlbtn');
const cssbtn = document.getElementById('cssbtn');
const jsbtn = document.getElementById('jsbtn');
const prevbtn = document.getElementById('prevbtn');
const nextbtn = document.getElementById('nextbtn');
const backbtn = document.getElementById('backbtn');
const contentDiv = document.getElementById('content');
const gradientContainer = document.getElementById('gradient-container');

let imageIndex = 0;
let content = [];

// Přednačítání pro HTML, CSS, JS
function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
preloadImages(htmlContent);
preloadImages(cssContent);
preloadImages(jsContent);

// HTML
htmlbtn.addEventListener('click', () => {
  content = htmlContent;
  imageIndex = 0;
  displayImage();
  toggleButtons();
  gradientContainer.style.display = 'none';
});

// CSS
cssbtn.addEventListener('click', () => {
  content = cssContent;
  imageIndex = 0;
  displayImage();
  toggleButtons();
  gradientContainer.style.display = 'none';
});

// JS
jsbtn.addEventListener('click', () => {
  content = jsContent;
  imageIndex = 0;
  displayImage();
  toggleButtons();
  gradientContainer.style.display = 'none';
});

// Tlačítko Další
nextbtn.addEventListener('click', () => {
  imageIndex = (imageIndex + 1) % content.length;
  displayImage();
});

// Tlačítko Předchozí
prevbtn.addEventListener('click', () => {
  imageIndex = (imageIndex - 1 + content.length) % content.length;
  displayImage();
});

// Tlačítko Menu
backbtn.addEventListener('click', () => {
  contentDiv.innerHTML = '';
  toggleButtons();
  gradientContainer.style.display = 'block';
});

// Šipky pro ovládání obrázků
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    imageIndex = (imageIndex + 1) % content.length;
    displayImage();
  }
  if (event.key === 'ArrowLeft') {
    imageIndex = (imageIndex - 1 + content.length) % content.length;
    displayImage();
  }
  if (event.key === 'Escape' && contentDiv.innerHTML !== '') {
    contentDiv.innerHTML = '';
    toggleButtons();
    gradientContainer.style.display = 'block';
  }
});

function toggleButtons() {
  const buttons = document.querySelectorAll('.buttons button:not(#backbtn):not(#nextbtn):not(#prevbtn)');
  buttons.forEach(button => {
    button.style.display = button.style.display === 'none' ? '' : 'none';
  });
  backbtn.style.display = backbtn.style.display === 'none' ? '' : 'none';
  nextbtn.style.display = nextbtn.style.display === 'none' ? '' : 'none';
  prevbtn.style.display = prevbtn.style.display === 'none' ? '' : 'none';
}

function displayImage() {
  const imageSrc = content[imageIndex];
  contentDiv.innerHTML = `<img src="${imageSrc}" id="image">`;
}
