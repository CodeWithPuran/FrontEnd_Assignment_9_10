document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('main');
  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = getColor();
    ctx.lineWidth = document.getElementById('slider').value;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);

  function getColor() {
    const colorButtons = document.querySelectorAll('.btn-action');
    const activeButton = [...colorButtons].find(button => button.classList.contains('active'));
    if (activeButton) {
      return getComputedStyle(activeButton).getPropertyValue('background-color');
    } else {
      return '#000000'; // default to black
    }
  }

  const colorButtons = document.querySelectorAll('.btn-action');
  colorButtons.forEach(button => button.addEventListener('click', function() {
    colorButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  }));

  document.getElementById('slider').addEventListener('input', function() {
    document.getElementById('brushSize').textContent = this.value;
  });

  document.getElementById('new').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.getElementById('erase').addEventListener('click', function() {
    ctx.globalCompositeOperation = 'destination-out';
  });

  document.getElementById('drawingArea').addEventListener('mouseleave', function() {
    ctx.globalCompositeOperation = 'source-over';
  });
});
