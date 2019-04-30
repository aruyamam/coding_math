import particle from '../particle/particle';
import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const particleA = particle.create(
      utils.randomRange(0, width),
      utils.randomRange(0, height),
      utils.randomRange(0, 50),
      utils.randomRange(0, Math.PI * 2),
      0.2,
   );
   const particleB = particle.create(
      utils.randomRange(0, width),
      utils.randomRange(0, height),
      utils.randomRange(0, 50),
      utils.randomRange(0, Math.PI * 2),
      0.2,
   );
   const particleC = particle.create(
      utils.randomRange(0, width),
      utils.randomRange(0, height),
      utils.randomRange(0, 50),
      utils.randomRange(0, Math.PI * 2),
      0.2,
   );
   const k = 0.01;
   const separation = 100;

   particleA.friction = 0.9;
   particleA.radius = 20;

   particleB.friction = 0.9;
   particleB.radius = 20;

   particleC.friction = 0.9;
   particleC.radius = 20;

   function checkEdges(p) {
      if (p.position.getY() + p.radius > height) {
         p.position.setY(height - p.radius);
         p.velocity.setY(p.velocity.getY() * -0.95);
      }
   }

   function spring(p0, p1, separation) {
      const distance = p0.position.subtract(p1.position);
      distance.setLength(distance.getLength() - separation);

      const springForce = distance.multiply(k);

      p1.velocity.addTo(springForce);
      p0.velocity.subtractFrom(springForce);
   }

   function update() {
      context.clearRect(0, 0, width, height);

      spring(particleA, particleB, separation);
      spring(particleB, particleC, separation);
      spring(particleA, particleC, separation);

      checkEdges(particleA);
      checkEdges(particleB);
      checkEdges(particleC);

      particleA.update();
      particleB.update();
      particleC.update();

      context.beginPath();
      context.arc(
         particleA.position.getX(),
         particleA.position.getY(),
         particleA.radius,
         0,
         Math.PI * 2,
         false,
      );
      context.fill();

      context.beginPath();
      context.arc(
         particleB.position.getX(),
         particleB.position.getY(),
         particleB.radius,
         0,
         Math.PI * 2,
         false,
      );
      context.fill();

      context.beginPath();
      context.arc(
         particleC.position.getX(),
         particleC.position.getY(),
         particleC.radius,
         0,
         Math.PI * 2,
         false,
      );
      context.fill();

      context.beginPath();
      context.moveTo(particleA.position.getX(), particleA.position.getY());
      context.lineTo(particleB.position.getX(), particleB.position.getY());
      context.lineTo(particleC.position.getX(), particleC.position.getY());
      context.lineTo(particleA.position.getX(), particleA.position.getY());
      context.stroke();

      requestAnimationFrame(update);
   }

   update();
};
