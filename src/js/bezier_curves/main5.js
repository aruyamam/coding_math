import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const points = [];
   const numPoints = 10;

   for (let i = 0; i < numPoints; i += 1) {
      const p = {
         x: this.Math.random() * width,
         y: this.Math.random() * height,
      };

      context.beginPath();
      context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
      context.fill();

      points.push(p);
   }

   context.strokeStyle = 'lightgray';
   context.beginPath();
   context.moveTo(points[0].x, points[0].y);
   for (let i = 1; i < numPoints; i += 1) {
      context.lineTo(points[i].x, points[i].y);
   }
   context.stroke();

   context.strokeStyle = 'black';

   context.beginPath();
   utils.multicurve(points, context);
   context.stroke();
};
