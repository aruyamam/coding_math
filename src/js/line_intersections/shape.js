window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const star0 = {
      x: 200,
      y: 200,
      points: [
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
      ],
      offset: [
         { x: 100, y: 0 },
         { x: 40, y: 29 },
         { x: 31, y: 95 },
         { x: -15, y: 48 },
         { x: -81, y: 59 },
         { x: -50, y: 0 },
         { x: -81, y: -59 },
         { x: -15, y: -48 },
         { x: 31, y: -95 },
         { x: 40, y: -29 },
      ],
   };
   const star1 = {
      x: 600,
      y: 500,
      points: [
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
      ],
      offset: [
         { x: 100, y: 0 },
         { x: 40, y: 29 },
         { x: 31, y: 95 },
         { x: -15, y: 48 },
         { x: -81, y: 59 },
         { x: -50, y: 0 },
         { x: -81, y: -59 },
         { x: -15, y: -48 },
         { x: 31, y: -95 },
         { x: 40, y: -29 },
      ],
   };

   function updateStar(star) {
      for (let i = 0; i < star.points.length; i++) {
         star.points[i].x = star.x + star.offset[i].x;
         star.points[i].y = star.y + star.offset[i].y;
      }
   }

   function drawStar(star) {
      context.beginPath();
      context.moveTo(star.points[0].x, star.points[0].y);
      for (let i = 1; i < star.points.length; i++) {
         context.lineTo(star.points[i].x, star.points[i].y);
      }
      context.closePath();
      context.fill();
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

   function checkStarCollision(starA, starB) {
      for (let i = 0; i < starA.points.length; i++) {
         const p0 = starA.points[i];
         const p1 = starA.points[(i + 1) % starA.points.length];

         for (let j = 0; j < starB.points.length; j++) {
            const p2 = starB.points[j];
            const p3 = starB.points[(j + 1) % starB.points.length];

            if (segmentIntersect(p0, p1, p2, p3)) {
               return true;
            }
         }
      }
      return false;
   }

   this.document.addEventListener('mousemove', (event) => {
      context.clearRect(0, 0, width, height);
      star0.x = event.clientX;
      star0.y = event.clientY;
      updateStar(star0);
      updateStar(star1);
      if (checkStarCollision(star0, star1)) {
         context.fillStyle = 'red';
      }
      else {
         context.fillStyle = 'black';
      }
      drawStar(star0);
      drawStar(star1);
   });
};
