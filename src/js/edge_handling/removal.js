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
      const p = particle.create(
         width / 2,
         height / 3,
         Math.random() * 5 + 2,
         Math.random() * Math.PI * 2,
      );
      p.radius = 10;
      particles.push(p);
   }

   function removeDeadParticles() {
      for (let i = particles.length - 1; i >= 0; i -= 1) {
         const p = particles[i];
         if (
            p.position.getX() - p.radius > width
            || p.position.getX() + p.radius < 0
            || p.position.getY() - p.radius > height
            || p.position.getY() + p.radius < 0
         ) {
            particles.splice(i, 1);
         }
      }
   }

   function update() {
      context.clearRect(0, 0, width, height);

      console.log(particles.length);

      for (let i = 0; i < particles.length; i += 1) {
         const p = particles[i];

         p.update();

         context.beginPath();
         context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
         context.fill();
      }

      removeDeadParticles();

      requestAnimationFrame(update);
   }

   update();
};
