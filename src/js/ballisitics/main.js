import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const gun = {
      x: 100,
      y: height,
      angle: -Math.PI / 4,
   };

   function draw() {
      context.clearRect(0, 0, width, height);

      context.beginPath();
      context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false);
      context.fill();

      context.save();
      context.translate(gun.x, gun.y);
      context.rotate(gun.angle);
      context.fillRect(0, -8, 40, 16);
      context.restore();
   }

   draw();

   function aimGun(mouseX, mouseY) {
      gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3);
      draw();
   }

   function onMouseMove(event) {
      aimGun(event.clientX, event.clientY);
   }

   function onMouseUp(event) {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
      aimGun(event.clientX, event.clientY);
   }

   function onMouseDown(event) {
      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);
      aimGun(event.clientX, event.clientY);
   }

   document.body.addEventListener('mousedown', onMouseDown);
};
