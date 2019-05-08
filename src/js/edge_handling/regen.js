import particle from '../particle/particle';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const particles = [];

   for (let i = 0; i < 100; i += 1) {
      const p = particle.create(
         width / 2,
         height,
         Math.random() * 8 + 5,
         -Math.PI / 2 + (Math.random() * 0.2 - 0.1),
         0.1,
      );
      p.radius = Math.random() * 10 + 2;
      particles.push(p);
   }

   function update() {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < 100; i += 1) {
         const p = particles[i];

         p.update();

         context.beginPath();
         context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
         context.fill();

         if (p.y - p.radius > height) {
            p.x = width / 2;
            p.y = height;
            const speed = Math.random() * 8 + 5;
            const direction = -Math.PI / 2 + (Math.random() * 0.2 - 0.1);
            p.vx = Math.cos(direction) * speed;
            p.vy = Math.sin(direction) * speed;
         }
      }

      requestAnimationFrame(update);
   }

   update();
};
