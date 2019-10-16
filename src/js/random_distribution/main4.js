import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const centerX = width / 2;
   const centerY = height / 2;
   const maxRadius = 100;

   for (let i = 0; i < 1000; i += 1) {
      const radius = Math.sqrt(Math.random()) * maxRadius;
      const angle = utils.randomRange(0, Math.PI * 2);
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      context.beginPath();
      context.arc(x, y, 1, 0, Math.PI * 2, false);
      context.fill();
   }
};
