window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const particle = {
      x: width / 2,
      y: height / 2,
      vx: Math.random() * 10 - 5,
      vy: Math.random() * 10 - 5,
   };

   const lines = [];

   for (let i = 0; i < 10; i++) {
      lines[i] = {
         p0: {
            x: Math.random() * width,
            y: Math.random() * height,
         },
         p1: {
            x: Math.random() * width,
            y: Math.random() * height,
         },
      };
   }

   function drawLines() {
      context.beginPath();
      for (let i = 0; i < lines.length; i++) {
         context.moveTo(lines[i].p0.x, lines[i].p0.y);
         context.lineTo(lines[i].p1.x, lines[i].p1.y);
      }
      context.stroke();
   }

   function segmentIntersect(p0, p1, p2, p3) {
      const A1 = p1.y - p0.y;
      const B1 = p0.x - p1.x;
      const C1 = A1 * p0.x + B1 * p0.y;
      const A2 = p3.y - p2.y;
      const B2 = p2.x - p3.x;
      const C2 = A2 * p2.x + B2 * p2.y;
      const denominator = A1 * B2 - A2 * B1;

      if (denominator === 0) {
         return null;
      }

      const intersectX = (B2 * C1 - B1 * C2) / denominator;
      const intersectY = (A1 * C2 - A2 * C1) / denominator;
      const rx0 = (intersectX - p0.x) / (p1.x - p0.x);
      const ry0 = (intersectY - p0.y) / (p1.y - p0.y);
      const rx1 = (intersectX - p2.x) / (p3.x - p2.x);
      const ry1 = (intersectY - p2.y) / (p3.y - p2.y);

      if (
         ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1))
         && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
      ) {
         return {
            x: intersectX,
            y: intersectY,
         };
      }

      return null;
   }

   function update() {
      context.clearRect(0, 0, width, height);
      drawLines();

      const p0 = {
         x: particle.x,
         y: particle.y,
      };
      particle.x += particle.vx;
      particle.y += particle.vy;
      context.fillRect(particle.x - 2, particle.y - 2, 4, 4);

      const p1 = {
         x: particle.x,
         y: particle.y,
      };

      for (let i = 0; i < lines.length; i++) {
         const p2 = lines[i].p0;
         const p3 = lines[i].p1;

         const intersect = segmentIntersect(p0, p1, p2, p3);
         if (intersect) {
            context.beginPath();
            context.strokeStyle = 'red';
            context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
            context.stroke();
            return;
         }
      }

      requestAnimationFrame(update);
   }

   update();
};
