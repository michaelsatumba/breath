const circle = document.querySelector('.circle');
const text = document.getElementById('text');
const toggleButton = document.getElementById('toggleButton');

let isBreathingIn = true;
let interval;

// Toggle the breathing session
toggleButton.addEventListener('click', () => {
  if (interval) {
    clearInterval(interval);
    toggleButton.innerText = 'Start';
    interval = null;
  } else {
    toggleButton.innerText = 'Pause';
    startBreathing();
  }
});

function startBreathing() {
  interval = setInterval(() => {
    if (isBreathingIn) {
      circle.style.width = '200px';
      circle.style.height = '200px';
      text.innerText = 'Breathe Out';
    } else {
      circle.style.width = '100px';
      circle.style.height = '100px';
      text.innerText = 'Breathe In';
    }
    isBreathingIn = !isBreathingIn;
  }, 2000);
}
