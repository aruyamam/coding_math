window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const point = {
      x: 300,
      y: 200,
   };
   const delta = 0.05;

   context.translate(width / 2, height / 2);

   function update() {
      context.clearRect(-width / 2, -height / 2, width, height);

      context.beginPath();
      context.arc(point.x, point.y, 20, 0, Math.PI * 2, false);
      context.fill();

      const cos = Math.cos(delta);
      const sin = Math.sin(delta);
      const x = point.x * cos - point.y * sin;
      const y = point.y * cos + point.x * sin;

      point.x = x;
      point.y = y;

      requestAnimationFrame(update);
   }

   update();
};
