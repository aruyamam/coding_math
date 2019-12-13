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
   let t;

   function koch(p0, p1, limit) {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const unit = dist * t;
      const angle = Math.atan2(dy, dx);
      const pA = {
         x: p0.x + dx * t,
         y: p0.y + dy * t,
      };
      const pC = {
         x: p1.x - dx * t,
         y: p1.y - dy * t,
      };
      const pB = {
         x: pA.x + Math.cos(angle - Math.PI * t) * unit,
         y: pA.y + Math.sin(angle - Math.PI * t) * unit,
      };

      if (limit > 0) {
         koch(p0, pA, limit - 1);
         koch(pA, pB, limit - 1);
         koch(pB, pC, limit - 1);
         koch(pC, p1, limit - 1);
      }
      else {
         context.beginPath();
         context.moveTo(p0.x, p0.y);
         context.lineTo(pA.x, pA.y);
         context.lineTo(pB.x, pB.y);
         context.lineTo(pC.x, pC.y);
         context.lineTo(p1.x, p1.y);
         context.stroke();
      }
   }

   function draw() {
      t = 1 / 3 + (Math.sin((a += 0.02)) * 1) / 6;
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      koch(p0, p1, 5);
      koch(p1, p2, 5);
      koch(p2, p0, 5);
      context.restore();
      requestAnimationFrame(draw);
   }

   draw();
};
