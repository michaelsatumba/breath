// Declare audio variables but don't initialize them yet
let breatheInAudio, breatheOutAudio;

// Select DOM elements
const circle = document.querySelector('.circle');
const text = document.getElementById('text');
const toggleButton = document.getElementById('toggleButton');

// Declare state variable
let isBreathingIn = true;
let interval;

// Declare time variables
let startTime = null; // Start time of the current breathe cycle
let elapsed = 0; // Elapsed time of the current breathe cycle

let animationFrameId;

// Event listener for toggle button
toggleButton.addEventListener('click', () => {
  breatheInAudio = breatheInAudio || new Audio('BreatheIn.mp3');
  breatheOutAudio = breatheOutAudio || new Audio('BreatheOut.mp3');
  
  // Toggle breathing state
  if (interval) {
    clearInterval(interval);
    cancelAnimationFrame(animationFrameId);
    toggleButton.innerText = 'Start';
    interval = null;
    isBreathingIn = true; // Reset breathing state
    startTime = null; // Reset start time
    elapsed = 0; // Reset elapsed time
    text.innerText = 'Breathe In'; // Reset text
  } else {
    toggleButton.innerText = 'Pause';
    playSound('Breathe In');
    startBreathing();
  }
});

// Breathing logic
function startBreathing() {
  const breatheDuration = 4000; // Duration of one breathe cycle in milliseconds
  const minSize = 200; // Minimum size of the circle
  const maxSize = 400; // Maximum size of the circle
  const sizeDifference = maxSize - minSize; // Difference between max and min sizes

  // If startTime is not null, calculate new startTime based on saved elapsed time
  startTime = startTime ? Date.now() - elapsed : null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp; // Initialize start time

    elapsed = timestamp - startTime; // Calculate elapsed time

    // Calculate progress as a value between 0 and 1
    const progress = Math.abs((elapsed % (2 * breatheDuration)) - breatheDuration) / breatheDuration;

    // Calculate current size based on progress
    const size = minSize + (sizeDifference * progress);

    // Update circle size
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    // Continue animation
    animationFrameId = requestAnimationFrame(animate);
  }

  // Start animation
  requestAnimationFrame(animate);

  // Start interval to toggle breathing state and play sound
  interval = setInterval(() => {
    // Decide action based on breathing state
    const action = isBreathingIn ? 'Breathe Out' : 'Breathe In';

    // Update text based on breathing state
    text.innerText = action;

    // Play corresponding sound
    playSound(action);

    // Toggle state
    isBreathingIn = !isBreathingIn;
  }, breatheDuration);
}

// Play sound based on action
function playSound(action) {
  const audio = action === 'Breathe In' ? breatheInAudio : breatheOutAudio;
  audio.play();
}