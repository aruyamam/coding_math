import utils from '../../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const fl = 300;
   const cards = [];
   const numCards = 7;
   const centerZ = 1000;
   const radius = 1000;
   let baseAngle = 0;
   let rotationSpeed = 0.01;

   for (let i = 0; i < numCards; i += 1) {
      const card = {
         y: 0,
         angle: ((Math.PI * 2) / numCards) * i,
         img: this.document.createElement('img'),
      };
      card.img.src = `images/postcard${i % 7}.jpg`;
      card.x = Math.cos(card.angle + baseAngle) * radius;
      card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      cards.push(card);
   }

   context.translate(width / 2, height / 2);
   context.font = '200px Arial';

   this.document.body.addEventListener('mousemove', (event) => {
      rotationSpeed = (event.clientX - width / 2) * 0.00005;
   });

   function zsort(cardA, cardB) {
      return cardB.z - cardA.z;
   }

   function update() {
      baseAngle += rotationSpeed;
      cards.sort(zsort);
      context.clearRect(-width / 2, -height / 2, width, height);
      for (let i = 0; i < numCards; i += 1) {
         const card = cards[i];
         const perspective = fl / (fl + card.z);

         context.save();
         context.scale(perspective, perspective);
         context.translate(card.x, card.y);

         context.translate(-card.img.width / 2, -card.img.height / 2);
         context.drawImage(card.img, 0, 0);

         context.restore();

         card.x = Math.cos(card.angle + baseAngle) * radius;
         card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      }
      requestAnimationFrame(update);
   }
   update();
};
