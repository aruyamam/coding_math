import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const handle = {
      x: width / 2,
      y: height / 2,
      radius: 20,
   };
   const offset = {};

   function draw() {
      context.clearRect(0, 0, width, height);

      context.fillStyle = 'gray';
      context.beginPath();
      context.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
      context.fill();
   }

   function onMouseMove(event) {
      handle.x = event.clientX - offset.x;
      handle.y = event.clientY - offset.y;
      draw();
   }

   function onMouseUp(event) {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
   }

   draw();

   document.body.addEventListener('mousedown', (event) => {
      if (utils.circlePointCollision(event.clientX, event.clientY, handle)) {
         document.body.addEventListener('mousemove', onMouseMove);
         document.body.addEventListener('mouseup', onMouseUp);
         offset.x = event.clientX - handle.x;
         offset.y = event.clientY - handle.y;
      }
   });
};
