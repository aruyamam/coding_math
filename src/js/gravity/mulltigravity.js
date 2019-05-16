import particle from '../particle/particle';
import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const sun1 = particle.create(300, 200, 0, 0);
   const sun2 = particle.create(800, 600, 0, 0);
   const emitter = {
      x: 100,
      y: 0,
   };
   const particles = [];
   const numParticles = 100;

   sun1.mass = 10000;
   sun1.radius = 10;
   sun2.mass = 20000;
   sun2.radius = 20;

   for (let i = 0; i < numParticles; i += 1) {
      const p = particle.create(
         emitter.x,
         emitter.y,
         utils.randomRange(7, 8),
         Math.PI / 2 + utils.randomRange(-0.1, 0.1),
      );
      p.addGravitation(sun1);
      p.addGravitation(sun2);
      p.radius = 3;
      particles.push(p);
   }

   function draw(p, color) {
      context.fillStyle = color;
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      context.fill();
   }

   function update() {
      context.clearRect(0, 0, width, height);

      draw(sun1, 'yellow');
      draw(sun2, 'yellow');

      for (let i = 0; i < numParticles; i += 1) {
         const p = particles[i];
         p.update();
         draw(p, 'black');
         if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
            p.x = emitter.x;
            p.y = emitter.y;
            p.setSpeed(utils.randomRange(7, 8));
            p.setHeading(Math.PI / 2 + utils.randomRange(-0.1, 0.1));
         }
      }

      requestAnimationFrame(update);
   }

   update();
};
