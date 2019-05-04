import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const gridSize = 40;

   function drawGrid() {
      context.beginPath();
      context.strokeStyle = '#ccc';
      for (let x = 0; x <= width; x += gridSize) {
         context.moveTo(x, 0);
         context.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
         context.moveTo(0, y);
         context.lineTo(width, y);
      }
      context.stroke();
   }

   document.body.addEventListener('mousemove', (event) => {
      context.clearRect(0, 0, width, height);
      drawGrid();

      const x = utils.roundNearest(event.clientX, gridSize);
      const y = utils.roundNearest(event.clientY, gridSize);

      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2, false);
      context.fill();
   });
};
