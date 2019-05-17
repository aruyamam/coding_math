import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const results = [];

   for (let i = 0; i < 100; i += 1) {
      results[i] = 0;
   }

   function addResult() {
      const r0 = utils.randomRange(0, 100);
      const r1 = utils.randomRange(0, 100);
      const result = Math.floor((r0 + r1) / 2);

      results[result] += 1;
   }

   function draw() {
      const w = width / 100;
      for (let i = 0; i < 100; i += 1) {
         const h = results[i] * -10;
         context.fillRect(w * i, height, w, h);
      }
   }

   function update() {
      addResult();
      draw();
      requestAnimationFrame(update);
   }

   update(context, width, height);
};
