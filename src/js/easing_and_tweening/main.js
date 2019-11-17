window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const target = {
      x: width,
      y: Math.random() * height,
   };

   const position = {
      x: 0,
      y: Math.random() * height,
   };

   const ease = 0.1;

   document.body.addEventListener('mousemove', (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
   });

   function update() {
      context.clearRect(0, 0, width, height);

      context.beginPath();
      context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
      context.fill();

      const dx = target.x - position.x;
      const dy = target.y - position.y;
      const vx = dx * ease;
      const vy = dy * ease;

      position.x += vx;
      position.y += vy;

      requestAnimationFrame(update);
   }

   update();
};
