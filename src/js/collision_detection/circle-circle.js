import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const circle0 = {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 50 + Math.random() * 100,
   };
   const circle1 = {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 50 + Math.random() * 100,
   };

   document.body.addEventListener('mousemove', (event) => {
      circle1.x = event.clientX;
      circle1.y = event.clientY;

      if (utils.circleCollision(circle0, circle1)) {
         context.fillStyle = '#f66';
      }
      else {
         context.fillStyle = '#999';
      }

      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.arc(circle0.x, circle0.y, circle0.radius, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2, false);
      context.fill();
   });
};
