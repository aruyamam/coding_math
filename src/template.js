window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   function update() {
      context.clearRect(0, 0, width, height);

      context.beginPath();

      requestAnimationFrame(update);
   }

   update(context, width, height);
};
