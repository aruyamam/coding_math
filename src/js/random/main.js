import { randomRange } from './random';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   for (let i = 0; i < 200; i += 1) {
      context.beginPath();
      context.fillStyle = 'red';
      context.arc(
         randomRange(0, width * 0.33),
         randomRange(0, height),
         randomRange(10, 40),
         0,
         Math.PI * 2,
         false,
      );
      context.fill();

      context.beginPath();
      context.fillStyle = 'green';
      context.arc(
         randomRange(width * 0.33, width * 0.66),
         randomRange(0, height),
         randomRange(10, 40),
         0,
         Math.PI * 2,
         false,
      );
      context.fill();

      context.beginPath();
      context.fillStyle = 'blue';
      context.arc(
         randomRange(width * 0.66, width),
         randomRange(0, height),
         randomRange(10, 40),
         0,
         Math.PI * 2,
         false,
      );
      context.fill();
   }
};
