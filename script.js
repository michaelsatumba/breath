// Declare audio variables but don't initialize them yet
let breatheInAudio, breatheOutAudio;

// Select DOM elements
const circle = document.querySelector('.circle');
const text = document.getElementById('text');
const toggleButton = document.getElementById('toggleButton');

// Declare state variable
let isBreathingIn = true;
let interval;



// Event listener for toggle button
toggleButton.addEventListener('click', () => {
  breatheInAudio = breatheInAudio || new Audio('BreatheIn.mp3');
  breatheOutAudio = breatheOutAudio || new Audio('BreatheOut.mp3');
  

  // Toggle breathing state
  if (interval) {
    clearInterval(interval);
    toggleButton.innerText = 'Start';
    interval = null;
  } else {
    toggleButton.innerText = 'Pause';
    startBreathing();
  }
});

// Breathing logic
function startBreathing() {
  interval = setInterval(() => {
    // Decide action based on breathing state
    const action = isBreathingIn ? 'Breathe Out' : 'Breathe In';
    
    // Update circle and text based on breathing state
    circle.style.width = isBreathingIn ? '400px' : '200px';
    circle.style.height = isBreathingIn ? '400px' : '200px';
    text.innerText = action;
    
    // Play corresponding sound
    playSound(action);

    // Toggle state
    isBreathingIn = !isBreathingIn;
  }, 4000);
}

// Play sound based on action
function playSound(action) {
  const audio = action === 'Breathe In' ? breatheInAudio : breatheOutAudio;
  audio.play();
}
