import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;

   const angle = Math.PI / 4;

   context.translate(width / 2, height / 2);
   context.rotate(angle);

   context.beginPath();
   context.arc(0, 0, 20, 0, Math.PI * 2, 0);
   context.fill();

   context.lineWidth = 10;
   context.beginPath();
   context.moveTo(0, 0);
   context.lineTo(50, 0);
   context.stroke();
};
