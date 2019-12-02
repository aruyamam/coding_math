window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const p0 = {
      x: 100,
      y: 100,
   };
   const p1 = {
      x: 500,
      y: 500,
   };
   const p2 = {
      x: 600,
      y: 50,
   };
   const p3 = {
      x: 80,
      y: 600,
   };
   let clickPoint;

   function getClickPoint(x, y) {
      const points = [p0, p1, p2, p3];
      for (let i = 0; i < points.length; i++) {
         const p = points[i];
         const dx = p.x - x;
         const dy = p.y - y;
         const dist = Math.sqrt(dx * dx + dy * dy);
         if (dist < 10) {
            return p;
         }
      }
   }

   function drawPoint(p) {
      context.beginPath();
      context.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
      context.fill();
   }

   function lineIntersect(p0, p1, p2, p3) {
      const A1 = p1.y - p0.y;
      const B1 = p0.x - p1.x;
      const C1 = A1 * p0.x + B1 * p0.y;
      const A2 = p3.y - p2.y;
      const B2 = p2.x - p3.x;
      const C2 = A2 * p2.x + B2 * p2.y;
      const denominator = A1 * B2 - A2 * B1;

      return {
         x: (B2 * C1 - B1 * C2) / denominator,
         y: (A1 * C2 - A2 * C1) / denominator,
      };
   }

   function render() {
      context.clearRect(0, 0, width, height);

      drawPoint(p0);
      drawPoint(p1);
      drawPoint(p2);
      drawPoint(p3);

      context.beginPath();
      context.moveTo(p0.x, p0.y);
      context.lineTo(p1.x, p1.y);
      context.moveTo(p2.x, p2.y);
      context.lineTo(p3.x, p3.y);
      context.stroke();

      const intersect = lineIntersect(p0, p1, p2, p3);

      context.beginPath();
      context.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
      context.stroke();
   }

   function onMouseMove(event) {
      clickPoint.x = event.clientX;
      clickPoint.y = event.clientY;
      render();
   }

   function onMouseUp(event) {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
   }

   function onMouseDown(event) {
      clickPoint = getClickPoint(event.clientX, event.clientY);
      if (clickPoint) {
         document.body.addEventListener('mousemove', onMouseMove);
         document.body.addEventListener('mouseup', onMouseUp);
      }
   }

   document.body.addEventListener('mousedown', onMouseDown);

   render();
};
