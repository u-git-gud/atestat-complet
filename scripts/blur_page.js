
const button = document.getElementById('toggleBlurButton');
const body = document.body;

//when page loads
window.addEventListener('load', function() {
  body.classList.add('blur-background');
});

button.addEventListener('click', function() {
  body.classList.toggle('blur-background'); // on and off
});