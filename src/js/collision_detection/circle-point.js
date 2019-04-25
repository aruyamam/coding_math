import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const circle = {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 50 + Math.random() * 100,
   };

   document.body.addEventListener('mousemove', (event) => {
      if (utils.circlePointCollision(event.clientX, event.clientY, circle)) {
         context.fillStyle = '#f66';
      }
      else {
         context.fillStyle = '#999';
      }

      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
      context.fill();
   });
};
