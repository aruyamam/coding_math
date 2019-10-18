import particle from '../particle/particle';
import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   const targetCanvas = document.getElementById('target');
   const targetContext = targetCanvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   targetCanvas.width = window.innerWidth;
   targetCanvas.height = window.innerHeight;
   const { width, height } = canvas;
   const p = particle.create(0, height / 2, 10, 0);

   targetContext.beginPath();
   targetContext.arc(width / 2, height / 2, 200, 0, this.Math.PI * 2, false);
   targetContext.fill();

   function resetParticle() {
      p.x = 0;
      p.y = height / 2;
      p.setHeading(utils.randomRange(-0.1, 0.1));
   }

   function update() {
      context.clearRect(0, 0, width, height);

      p.update();
      context.beginPath();
      context.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
      context.fill();

      const imageData = targetContext.getImageData(p.x, p.y, 1, 1);
      if (imageData.data[3] > 0) {
         targetContext.globalCompositeOperation = 'destination-out';
         targetContext.beginPath();
         targetContext.arc(p.x, p.y, 20, 0, Math.PI * 2, false);
         targetContext.fill();

         resetParticle();
      }
 else if (p.x > width) {
         resetParticle();
      }
      requestAnimationFrame(update);
   }

   update();
};
