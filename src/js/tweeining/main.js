window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const start = {
      x: 100,
      y: 100,
   };
   const target = {};
   const change = {};
   let startTime;
   const duration = 1000;

   function drawCircle(x, y) {
      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2, false);
      context.fill();
   }

   function linearTween(t, b, c, d) {
      return (c * t) / d + b;
   }

   function easeInQuad(t, b, c, d) {
      return c * (t /= d) * t + b;
   }

   function easeOutQuad(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
   }

   function easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
   }

   function update() {
      context.clearRect(0, 0, width, height);

      const time = new Date() - startTime;
      if (time < duration) {
         const x = easeInOutQuad(time, start.x, change.x, duration);
         const y = easeInOutQuad(time, start.y, change.y, duration);
         drawCircle(x, y);
         requestAnimationFrame(update);
      }
      else {
         drawCircle(target.x, target.y);
         start.x = target.x;
         start.y = target.y;
      }
   }

   drawCircle(start.x, start.y);

   this.document.body.addEventListener('click', (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      change.x = target.x - start.x;
      change.y = target.y - start.y;
      startTime = new Date();
      update();
   });
};
