window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const ball = {
      x: 100,
      y: 100,
   };

   function render() {
      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
      context.fill();
   }

   function tweenX(obj, targetX, duration, easingfunc) {
      const startX = obj.x;
      const changeX = targetX - startX;
      const startTime = new Date();

      function update() {
         let time = new Date() - startTime;
         if (time < duration) {
            obj.x = easingfunc(time, startX, changeX, duration);
            requestAnimationFrame(update);
         }
         else {
            time = duration;
            obj.x = easingfunc(time, startX, changeX, duration);
         }
         render();
      }

      update();
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

   tweenX(ball, 800, 1000, easeInOutQuad);
};
