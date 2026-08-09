const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button.toggle') || player.querySelector('.player__button');
const volumeRange = player.querySelector('input[name="volume"]');
const playbackSpeedRange = player.querySelector('input[name="playbackRate"]');
const rewindBtn = player.querySelector('.player__button[data-skip="-10"]');
const forwardBtn = player.querySelector('.player__button[data-skip="25"]');

// Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  if (toggle) {
    toggle.textContent = icon;
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
if (toggle) {
  toggle.addEventListener('click', togglePlay);
}

// Progress bar update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

// Scrubbing / Clicking on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
window.addEventListener('mouseup', () => mousedown = false);

// Volume and Playback Speed handling
function handleRangeUpdate() {
  video[this.name] = this.value;
}

if (volumeRange) {
  volumeRange.addEventListener('change', handleRangeUpdate);
  volumeRange.addEventListener('mousemove', handleRangeUpdate);
}

if (playbackSpeedRange) {
  playbackSpeedRange.addEventListener('change', handleRangeUpdate);
  playbackSpeedRange.addEventListener('mousemove', handleRangeUpdate);
}

// Rewind and Forward buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

if (rewindBtn) rewindBtn.addEventListener('click', skip);
if (forwardBtn) forwardBtn.addEventListener('click', skip);