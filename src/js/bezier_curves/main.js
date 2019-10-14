import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const p0 = {
      x: utils.randomRange(0, width),
      y: utils.randomRange(0, height),
   };
   const p1 = {
      x: utils.randomRange(0, width),
      y: utils.randomRange(0, height),
   };
   const p2 = {
      x: utils.randomRange(0, width),
      y: utils.randomRange(0, height),
   };
   const p3 = {
      x: utils.randomRange(0, width),
      y: utils.randomRange(0, height),
   };

   context.beginPath();
   context.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
   context.fill();

   context.beginPath();
   context.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
   context.fill();

   context.beginPath();
   context.arc(p2.x, p2.y, 4, 0, Math.PI * 2, false);
   context.fill();

   context.beginPath();
   context.arc(p3.x, p3.y, 4, 0, Math.PI * 2, false);
   context.fill();

   context.beginPath();
   context.moveTo(p0.x, p0.y);
   context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
   context.stroke();

   const pFinal = {};

   for (let t = 0; t <= 1; t += 0.01) {
      utils.cubicBezeir(p0, p1, p2, p3, t, pFinal);
      context.beginPath();
      context.arc(pFinal.x, pFinal.y, 10, 0, Math.PI * 2, false);
      context.stroke();
   }
};
