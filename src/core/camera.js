const select = document.querySelector('#camera-device');
const video = document.querySelector('#camera-preview');
const startButton = document.querySelector('#camera-start');
const stopButton = document.querySelector('#camera-stop');
const status = document.querySelector('#camera-status');
let activeStream = null;
let devices = [];

function setStatus(message) {
  if (status) status.textContent = message;
}

function stopCamera() {
  if (activeStream) activeStream.getTracks().forEach((track) => track.stop());
  activeStream = null;
  if (video) {
    video.pause();
    video.srcObject = null;
    video.style.display = 'none';
  }
  if (startButton) startButton.disabled = false;
  if (stopButton) stopButton.disabled = true;
  setStatus('Kamera dimatikan. Tidak ada rekaman yang disimpan oleh fitur pratinjau ini.');
}

async function refreshDevices() {
  if (!navigator.mediaDevices?.enumerateDevices) {
    setStatus('Browser ini tidak menyediakan API kamera. Gunakan browser modern melalui HTTPS atau localhost.');
    return;
  }
  try {
    devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput');
    const previous = select.value;
    select.replaceChildren();
    if (!devices.length) {
      select.add(new Option('Kamera belum terdeteksi', ''));
      setStatus('Kamera belum terdeteksi. Izin perangkat mungkin belum diberikan atau perangkat tidak memiliki kamera yang tersedia.');
      return;
    }
    devices.forEach((device, index) => {
      select.add(new Option(device.label || `Kamera ${index + 1}`, device.deviceId));
    });
    if (devices.some((device) => device.deviceId === previous)) select.value = previous;
    setStatus(`${devices.length} perangkat kamera terdeteksi. Pilih kamera lalu aktifkan dengan tombol izin.`);
  } catch {
    setStatus('Daftar kamera tidak dapat dibaca. Periksa izin browser dan pengaturan perangkat.');
  }
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus('Akses kamera memerlukan browser yang mendukung kamera dan koneksi HTTPS atau localhost.');
    return;
  }
  stopCamera();
  try {
    const deviceId = select.value;
    activeStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'user' }
    });
    video.srcObject = activeStream;
    video.style.display = 'block';
    await video.play();
    startButton.disabled = true;
    stopButton.disabled = false;
    setStatus('Kamera aktif atas izinmu. Gambar hanya ditampilkan sebagai pratinjau; fitur ini belum melakukan pengenalan wajah, klasifikasi ekspresi, atau pengukuran kelelahan.');
    await refreshDevices();
  } catch (error) {
    stopCamera();
    const message = error?.name === 'NotAllowedError'
      ? 'Izin kamera ditolak. Jika ingin menggunakan pratinjau, izinkan kamera melalui pengaturan situs.'
      : error?.name === 'NotFoundError'
        ? 'Tidak ada kamera yang cocok dengan pilihan ini.'
        : 'Kamera tidak dapat diaktifkan. Periksa apakah kamera sedang digunakan aplikasi lain atau dibatasi sistem.';
    setStatus(message);
  }
}

startButton?.addEventListener('click', startCamera);
stopButton?.addEventListener('click', stopCamera);
select?.addEventListener('change', () => {
  if (activeStream) startCamera();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && activeStream) stopCamera();
});
window.addEventListener('pagehide', stopCamera);
navigator.mediaDevices?.addEventListener?.('devicechange', refreshDevices);
refreshDevices();
