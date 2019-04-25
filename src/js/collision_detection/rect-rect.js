import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const rect0 = {
      x: 200,
      y: 200,
      width: -200,
      height: -100,
   };
   const rect1 = {
      x: 0,
      y: 0,
      width: -100,
      height: -200,
   };

   document.body.addEventListener('mousemove', (event) => {
      rect1.x = event.clientX - 50;
      rect1.y = event.clientY - 100;

      context.clearRect(0, 0, width, height);
      if (utils.rectIntersect(rect0, rect1)) {
         context.fillStyle = '#ff6666';
      }
      else {
         context.fillStyle = '#999999';
      }
      context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
      context.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
   });
};
