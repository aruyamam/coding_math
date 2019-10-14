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
   let maxT = 0;
   const pFinal = {};

   function draw() {
      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.moveTo(p0.x, p0.y);
      for (let t = 0; t <= maxT; t += 0.01) {
         utils.cubicBezeir(p0, p1, p2, p3, t, pFinal);
         context.lineTo(pFinal.x, pFinal.y);
      }
      context.stroke();
      maxT += 0.01;
      if (maxT > 1) {
         maxT = 0;
      }

      requestAnimationFrame(draw);
   }

   draw();
};
