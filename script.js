const circle = document.querySelector('.circle');
const text = document.getElementById('text');
const toggleButton = document.getElementById('toggleButton');
const voiceSelect = document.getElementById('voiceSelect');

let isBreathingIn = true;
let interval;
let selectedVoice;
let voices = [];

let synth = window.speechSynthesis;

// Populate voice list
function populateVoiceList() {
  voices = synth.getVoices();
  voices.forEach((voice, i) => {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Voice selection
voiceSelect.addEventListener('change', (event) => {
  selectedVoice = voices[event.target.value];
});

// Speech function
function speak(text) {
  let utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = selectedVoice || voices[0];
  synth.speak(utterThis);
}

// Toggle breathing
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

// Breathing logic
function startBreathing() {
  interval = setInterval(() => {
    if (isBreathingIn) {
      circle.style.width = '200px';
      circle.style.height = '200px';
      text.innerText = 'Breathe Out';
      speak('Breathe Out');
    } else {
      circle.style.width = '100px';
      circle.style.height = '100px';
      text.innerText = 'Breathe In';
      speak('Breathe In');
    }
    isBreathingIn = !isBreathingIn;
  }, 2000);
}
