import clamp from './clamp';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const rect = {
      x: width / 2 - 200,
      y: height / 2 - 150,
      width: 400,
      height: 300,
   };

   document.body.addEventListener('mousemove', (event) => {
      const x = clamp(event.clientX, rect.x, rect.x + rect.width);
      const y = clamp(event.clientY, rect.y, rect.y + rect.height);

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#ccc';
      context.fillRect(rect.x - 10, rect.y - 10, rect.width + 20, rect.height + 20);

      context.fillStyle = '#000';
      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2, false);
      context.fill();
   });
};
