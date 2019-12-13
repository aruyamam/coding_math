window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const p0 = {
      x: 0,
      y: -321,
   };
   const p1 = {
      x: 278,
      y: 160,
   };
   const p2 = {
      x: -278,
      y: 160,
   };
   let a = 0;
   let b = 0;
   let r = 0;
   let tx;
   let ty;

   function drawTriangle(p0, p1, p2) {
      context.beginPath();
      context.moveTo(p0.x, p0.y);
      context.lineTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.fill();
   }

   function sierpinski(p0, p1, p2, limit) {
      if (limit > 0) {
         const pA = {
            x: (p0.x + p1.x) / 2,
            y: (p0.y + p1.y) / 2,
         };
         const pB = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
         };
         const pC = {
            x: (p2.x + p0.x) / 2,
            y: (p2.y + p0.y) / 2,
         };

         sierpinski(p0, pA, pC, limit - 1);
         sierpinski(pA, p1, pB, limit - 1);
         sierpinski(pC, pB, p2, limit - 1);
      }
      else {
         drawTriangle(p0, p1, p2);
      }
   }

   function draw() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate((r += 0.01));
      tx = 0.5 + Math.sin((a += 0.045)) * 0.25;
      ty = 0.5 + Math.sin((b += 0.045)) * 0.25;
      sierpinski(p0, p1, p2, 7);
      context.restore();
      requestAnimationFrame(draw);
   }

   draw();
};
