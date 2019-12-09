window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   const p0 = {
      x: 100,
      y: 100,
   };
   const p1 = {
      x: 500,
      y: 100,
   };
   const p2 = {
      x: 100,
      y: 200,
   };
   const p3 = {
      x: 500,
      y: 200,
   };

   function lineIntersect(p0, p1, p2, p3) {
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

      return {
         x: (B2 * C1 - B1 * C2) / denominator,
         y: (A1 * C2 - A2 * C1) / denominator,
      };
   }

   context.beginPath();
   context.moveTo(p0.x, p0.y);
   context.lineTo(p1.x, p1.y);
   context.moveTo(p2.x, p2.y);
   context.lineTo(p3.x, p3.y);
   context.stroke();

   const intersect = lineIntersect(p0, p1, p2, p3);
   if (intersect) {
      context.beginPath();
      context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
      context.stroke();
   }
};
