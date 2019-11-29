window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const ball = {
      x: 100,
      y: 100,
      alpha: 1,
   };

   function render() {
      context.clearRect(0, 0, width, height);
      context.globalAlpha = ball.alpha;
      context.beginPath();
      context.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
      context.fill();
   }

   function tween(obj, props, duration, easingfunc, onProgress, onComplete) {
      const starts = {};
      const changes = {};
      const startTime = new Date();

      for (const prop in props) {
         starts[prop] = obj[prop];
         changes[prop] = props[prop] - starts[prop];
      }

      function update() {
         let time = new Date() - startTime;
         if (time < duration) {
            for (const prop in props) {
               obj[prop] = easingfunc(time, starts[prop], changes[prop], duration);
            }
            onProgress();
            requestAnimationFrame(update);
         }
         else {
            time = duration;
            for (const prop in props) {
               obj[prop] = easingfunc(time, starts[prop], changes[prop], duration);
            }
            onComplete();
         }
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

   function tweenBack() {
      tween(ball, { x: 100, y: 100, alpha: 1 }, 1000, easeInOutQuad, render, render);
   }

   tween(ball, { x: 900, y: 700, alpha: 0 }, 1000, easeInOutQuad, render, tweenBack);
};
