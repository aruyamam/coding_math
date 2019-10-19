window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const fl = 300;
   const shapePos = {
      x: 500,
      y: 300,
      z: 300,
   };

   context.translate(width / 2, height / 2);

   const perspective = fl / (fl + shapePos.z);
   context.translate(shapePos.x * perspective, shapePos.y * perspective);
   context.scale(perspective, perspective);
   context.fillRect(-100, -100, 200, 200);
};
