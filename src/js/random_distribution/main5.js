import particle from '../particle/particle';
import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const particles = [];

   for (let i = 0; i < 200; i += 1) {
      const p = particle.create(width / 2, height / 2, 0, 0);
      p.setSpeed(utils.randomRange(1, 2));
      p.setHeading(utils.randomRange(0, Math.PI * 2));
      particles.push(p);
   }

   function update() {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < 200; i += 1) {
         const p = particles[i];
         p.update();
         context.beginPath();
         context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
         context.fill();
      }
      requestAnimationFrame(update);
   }

   update();
};
