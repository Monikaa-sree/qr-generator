// script.js - simple, reliable QR generation + download using Qrious

const input = document.getElementById('text');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('qr-canvas');

// create QRious instance (controls the canvas)
const qr = new QRious({
  element: canvas,
  value: '',     // start empty
  size: 300,
  level: 'H'     // highest error correction (H = 30%)
});

// helper: create QR from text
function generateQR(text) {
  if (!text || text.trim() === '') {
    alert('Please enter some text or a url to generate the QR.');
    return;
  }
  qr.set({
    value: text,
    size: 300,
    level: 'H'
  });
}

// download handler: convert canvas to PNG and trigger download
function downloadQR() {
  // canvas -> dataURL
  const dataURL = canvas.toDataURL('image/png');
  // create link and click
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'qr-code.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// event listeners
generateBtn.addEventListener('click', () => generateQR(input.value));
downloadBtn.addEventListener('click', () => {
  // ensure there is something before download
  if (!input.value || input.value.trim() === '') {
    alert('Generate a QR first (enter text/url then click Generate).');
    return;
  }
  downloadQR();
});

// allow Enter key to generate
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') generateQR(input.value);
});

// OPTIONAL: generate a sample QR on load (you can remove if you don't want this)
window.addEventListener('load', () => {
  // small friendly placeholder
  input.value = '';
  // if you want a default example uncomment below:
  // generateQR('https://monikaa.dev');
});
