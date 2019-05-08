import particle from '../particle/particle';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const particles = [];
   const numParticles = 100;

   for (let i = 0; i < numParticles; i += 1) {
      particles.push(
         particle.create(
            width / 2,
            height / 3,
            Math.random() * 5 + 2,
            Math.random() * Math.PI * 2,
            0.1,
         ),
      );
   }

   function update() {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < numParticles; i += 1) {
         const p = particles[i];

         p.update();

         context.beginPath();
         context.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
         context.fill();
      }

      requestAnimationFrame(update);
   }

   update();
};
