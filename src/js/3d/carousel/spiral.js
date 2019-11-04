window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const fl = 300;
   const cards = [];
   const numPoints = 200;
   const centerZ = 2000;
   const radius = 1000;
   let baseAngle = 0;
   let rotationSpeed = 0.01;

   for (let i = 0; i < numPoints; i += 1) {
      const point = {
         angle: 0.2 * i,
         y: 2000 - (4000 / numPoints) * i,
         img: document.createElement('img'),
      };
      point.x = Math.cos(point.angle + baseAngle) * radius;
      point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
      cards.push(point);
   }

   context.translate(width / 2, height / 2);
   context.font = '200px Arial';

   this.document.body.addEventListener('mouseover', (event) => {
      rotationSpeed = (event.clientX - width / 2) * 0.00005;
      // ypos = (event.clientY - height / 2) * 2;
   });

   function update() {
      baseAngle += rotationSpeed;
      context.clearRect(-width / 2, -height / 2, width, height);
      for (let i = 0; i < numPoints; i += 1) {
         const point = cards[i];
         const perspective = fl / (fl + point.z);

         context.save();
         context.scale(perspective, perspective);
         context.translate(point.x, point.y);

         context.beginPath();
         context.arc(0, 0, 40, 0, Math.PI * 2, false);
         context.fill();

         context.restore();

         point.x = Math.cos(point.angle + baseAngle) * radius;
         point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
      }

      requestAnimationFrame(update);
   }

   update();
};
