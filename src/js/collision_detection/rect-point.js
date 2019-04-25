import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const rect = {
      x: 300,
      y: 200,
      width: -200,
      height: -100,
   };

   document.body.addEventListener('mousemove', (event) => {
      context.clearRect(0, 0, width, height);
      if (utils.pointInRect(event.clientX, event.clientY, rect)) {
         context.fillStyle = '#ff6666';
      }
      else {
         context.fillStyle = '#999';
      }
      context.fillRect(rect.x, rect.y, rect.width, rect.height);
   });
};
