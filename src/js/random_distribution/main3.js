import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   for (let i = 0; i < 100000; i += 1) {
      const x = utils.randomDist(0, width, 5);
      const y = utils.randomDist(0, height, 5);

      context.fillRect(x, y, 1, 1);
   }
};
