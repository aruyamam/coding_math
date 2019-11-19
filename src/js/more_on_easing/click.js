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
   let easing = true;

   function easeTo(position, target, ease) {
      const dx = target.x - position.x;
      const dy = target.y - position.y;
      position.x += dx * ease;
      position.y += dy * ease;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
         position.x = target.x;
         position.y = target.y;
         return false;
      }
      return true;
   }

   function update() {
      context.clearRect(0, 0, width, height);

      context.beginPath();
      context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
      context.fill();

      easing = easeTo(position, target, ease);

      if (easing) {
         requestAnimationFrame(update);
      }
   }

   document.body.addEventListener('click', (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!easing) {
         easing = true;
         update();
      }
   });

   update();
};
