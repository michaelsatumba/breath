let isIOS = !!navigator.platform.match(/iPhone|iPod|iPad/);
let audioCtx;

if (isIOS) {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

let synth = window.speechSynthesis;
let voices = [];
let selectedVoice;
const circle = document.querySelector('.circle');
const text = document.getElementById('text');
const toggleButton = document.getElementById('toggleButton');
const voiceSelect = document.getElementById('voiceSelect');
let isBreathingIn = true;
let interval;

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

voiceSelect.addEventListener('change', (event) => {
  selectedVoice = voices[event.target.value];
});

function speak(text) {
  let utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = selectedVoice || voices[0];
  synth.speak(utterThis);
}

toggleButton.addEventListener('click', () => {
  if (isIOS && audioCtx) {
    let buffer = audioCtx.createBuffer(1, 1, 22050);
    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
  }

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
      circle.style.width = '400px';
      circle.style.height = '400px';
      text.innerText = 'Breathe Out';
      speak('Breathe Out');
    } else {
      circle.style.width = '200px';
      circle.style.height = '200px';
      text.innerText = 'Breathe In';
      speak('Breathe In');
    }
    isBreathingIn = !isBreathingIn;
  }, 4000);
}
