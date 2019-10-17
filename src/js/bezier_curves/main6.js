import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const p0 = {
      x: Math.random() * width,
      y: Math.random() * height,
   };
   const p1 = {
      x: Math.random() * width,
      y: Math.random() * height,
   };
   const p2 = {
      x: Math.random() * width,
      y: Math.random() * height,
   };
   const p3 = {
      x: Math.random() * width,
      y: Math.random() * height,
   };

   context.beginPath();
   context.moveTo(p0.x, p0.y);
   context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
   context.stroke();

   context.strokeStyle = 'red';
   context.beginPath();
   utils.multicurve([p0, p1, p2, p3], context);
   context.stroke();
};
