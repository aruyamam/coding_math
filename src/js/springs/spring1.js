import vector from '../vector/vector';
import particle from '../particle/particle';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const springPoint = {
      x: width / 2,
      y: height / 2,
   };
   const weight = particle.create(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2,
      0.5,
   );
   const k = 0.1 + Math.random() * 0.5;
   const springLength = 100;

   weight.radius = 20;
   weight.friction = 0.5 + Math.random() * 0.5;

   document.body.addEventListener('mousemove', (event) => {
      springPoint.x = event.clientX;
      springPoint.y = event.clientY;
   });

   function update() {
      context.clearRect(0, 0, width, height);

      const dx = springPoint.x - weight.x;
      const dy = springPoint.y - weight.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const springForce = (distance - springLength) * k;
      const ax = (dx / distance) * springForce;
      const ay = (dy / distance) * springForce;

      weight.vx += ax;
      weight.vy += ay;

      weight.update();

      context.beginPath();
      context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.moveTo(weight.x, weight.y);
      context.lineTo(springPoint.x, springPoint.y);
      context.stroke();

      requestAnimationFrame(update);
   }

   update(context, width, height);
};
