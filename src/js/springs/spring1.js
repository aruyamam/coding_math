import particle from '../particle/particle';
import utils from '../utils/utils';

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
   const springPoint2 = {
      x: utils.randomRange(0, width),
      y: utils.randomRange(0, height),
   };
   const weight = particle.create(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2,
      0.5,
   );
   const k = 0.1;
   const springLength = 100;

   weight.radius = 20;
   weight.friction = 0.95;
   weight.addSpring(springPoint, k, springLength);
   weight.addSpring(springPoint2, k, springLength);

   document.body.addEventListener('mousemove', (event) => {
      springPoint.x = event.clientX;
      springPoint.y = event.clientY;
   });

   function update() {
      context.clearRect(0, 0, width, height);

      weight.update();

      context.beginPath();
      context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.moveTo(springPoint2.x, springPoint2.y);
      context.lineTo(weight.x, weight.y);
      context.lineTo(springPoint.x, springPoint.y);
      context.stroke();

      requestAnimationFrame(update);
   }

   update(context, width, height);
};
