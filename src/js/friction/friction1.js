import particle from '../particle/particle';
import vector from '../vector/vector';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const friction = vector.create(0.15, 0);

   const p = particle.create(width / 2, height / 2, 10, Math.random() * Math.PI * 2);
   p.radius = 10;

   function update() {
      context.clearRect(0, 0, width, height);

      friction.setAngle(p.velocity.getAngle());
      p.velocity.subtractFrom(friction);

      if (p.velocity.getLength() > friction.getLength()) {
         p.velocity.subtractFrom(friction);
      }
      else {
         p.velocity.setLength(0);
      }

      p.update();

      context.beginPath();
      context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
      context.fill();

      requestAnimationFrame(update);
   }

   update();
};
