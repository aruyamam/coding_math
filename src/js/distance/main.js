import { distanceXY } from './distance';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const centerX = width / 2;
   const centerY = height / 2;

   document.body.addEventListener('mousemove', (event) => {
      context.clearRect(0, 0, width, height);

      const dist = distanceXY(centerX, centerY, event.clientX, event.clientY);

      if (dist < 100) {
         context.fillStyle = '#ff6666';
      }
      else {
         context.fillStyle = '#ccc';
      }

      context.beginPath();
      context.arc(centerX, centerY, 100, 0, Math.PI * 360, false);
      context.fill();
   });
};
