window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const target = {
      x: width,
      y: Math.random() * height,
   };

   const points = [];
   const numPoints = 50;
   const ease = 0.25;

   for (let i = 0; i < numPoints; i += 1) {
      points.push({
         x: 0,
         y: 0,
      });
   }

   document.body.addEventListener('mousemove', (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
   });

   function update() {
      context.clearRect(0, 0, width, height);

      const leader = {
         x: target.x,
         y: target.y,
      };

      context.beginPath();
      context.moveTo(leader.x, leader.y);

      for (let i = 0; i < numPoints; i++) {
         const point = points[i];
         point.x += (leader.x - point.x) * ease;
         point.y += (leader.y - point.y) * ease;

         context.lineTo(point.x, point.y);

         leader.x = point.x;
         leader.y = point.y;
      }

      context.stroke();

      requestAnimationFrame(update);
   }

   update();
};
