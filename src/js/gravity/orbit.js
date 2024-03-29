import particle from '../particle/particle';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const sun = particle.create(width / 2, height / 2, 0, 0);
   const planet = particle.create(width / 2 + 200, height / 2, 10, Math.PI / 2);

   sun.mass = 20000;

   function update() {
      context.clearRect(0, 0, width, height);

      planet.gravitateTo(sun);
      planet.update();

      context.beginPath();
      context.fillStyle = '#ffff00';
      context.arc(sun.x, sun.y, 20, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.fillStyle = '#0000ff';
      context.arc(planet.x, planet.y, 5, 0, Math.PI * 2, false);
      context.fill();

      requestAnimationFrame(update);
   }

   update();
};
