import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   let angle = 0;
   let targetAngle = 0;
   const ease = 0.05;

   const wheel = document.createElement('img');
   wheel.src = 'images/wheel.png';

   function render() {
      context.clearRect(0, 0, width, height);

      angle += (targetAngle - angle) * ease;

      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(angle);

      context.drawImage(wheel, -wheel.width / 2, -wheel.height / 2);

      context.restore();
      requestAnimationFrame(render);
   }

   wheel.addEventListener('load', () => {
      render();
   });

   this.document.body.addEventListener('mousemove', (event) => {
      targetAngle = utils.map(event.clientX, 0, width, -Math.PI, Math.PI);
   });
};
