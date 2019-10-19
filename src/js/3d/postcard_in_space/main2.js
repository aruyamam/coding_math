import utils from '../../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const fl = 300;
   const shapes = [];
   const numShapes = 100;

   for (let i = 0; i < numShapes; i += 1) {
      shapes[i] = {
         x: utils.randomRange(-1000, 1000),
         y: utils.randomRange(-1000, 1000),
         z: utils.randomRange(0, 10000),
      };
   }

   context.translate(width / 2, height / 2);

   function update() {
      context.clearRect(-width / 2, -height / 2, width, height);
      for (let i = 0; i < numShapes; i += 1) {
         const shape = shapes[i];
         const perspective = fl / (fl + shape.z);

         context.save();
         context.translate(shape.x * perspective, shape.y * perspective);
         context.scale(perspective, perspective);
         context.fillRect(-100, -100, 200, 200);
         context.restore();

         shape.z += 5;
         if (shape.z > 10000) {
            shape.z = 0;
         }
      }
      requestAnimationFrame(update);
   }
   update();
};
