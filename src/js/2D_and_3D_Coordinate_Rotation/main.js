window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const fl = 300;
   const points = [];
   const centerZ = 1500;
   let needsUpdate = true;

   context.translate(width / 2, height / 2);

   points[0] = { x: -500, y: -500, z: 500 };
   points[1] = { x: 500, y: -500, z: 500 };
   points[2] = { x: 500, y: -500, z: -500 };
   points[3] = { x: -500, y: -500, z: -500 };
   points[4] = { x: -500, y: 500, z: 500 };
   points[5] = { x: 500, y: 500, z: 500 };
   points[6] = { x: 500, y: 500, z: -500 };
   points[7] = { x: -500, y: 500, z: -500 };

   function project() {
      for (let i = 0; i < points.length; i += 1) {
         const p = points[i];
         const scale = fl / (fl + p.z + centerZ);

         p.sx = p.x * scale;
         p.sy = p.y * scale;
      }
   }

   function drawLine(...args) {
      let p = points[args[0]];
      context.moveTo(p.sx, p.sy);

      for (let i = 1; i < args.length; i += 1) {
         p = points[args[i]];
         context.lineTo(p.sx, p.sy);
      }
   }

   function translateModel(x, y, z) {
      for (let i = 0; i < points.length; i += 1) {
         points[i].x += x;
         points[i].y += y;
         points[i].z += z;
      }
      needsUpdate = true;
   }

   function rotateX(angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let i = 0; i < points.length; i++) {
         const p = points[i];
         const y = p.y * cos - p.z * sin;
         const z = p.z * cos + p.y * sin;
         p.y = y;
         p.z = z;
      }
      needsUpdate = true;
   }

   function rotateY(angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let i = 0; i < points.length; i++) {
         const p = points[i];
         const x = p.x * cos - p.z * sin;
         const z = p.z * cos + p.x * sin;
         p.x = x;
         p.z = z;
      }
      needsUpdate = true;
   }

   function rotateZ(angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let i = 0; i < points.length; i++) {
         const p = points[i];
         const x = p.x * cos - p.y * sin;
         const y = p.y * cos + p.x * sin;
         p.x = x;
         p.y = y;
      }
      needsUpdate = true;
   }

   this.document.body.addEventListener('keydown', (event) => {
      switch (event.key) {
         case 'ArrowLeft':
            if (event.ctrlKey) {
               rotateY(0.05);
            }
            else {
               translateModel(-20, 0, 0);
            }
            break;

         case 'ArrowRight':
            if (event.ctrlKey) {
               rotateY(-0.05);
            }
            else {
               translateModel(20, 0, 0);
            }
            break;

         case 'ArrowUp':
            if (event.shiftKey) {
               translateModel(0, 0, 20);
            }
            else if (event.ctrlKey) {
               rotateX(0.05);
            }
            else {
               translateModel(0, -20, 0);
            }
            break;

         case 'ArrowDown':
            if (event.shiftKey) {
               translateModel(0, 0, -20);
            }
            else if (event.ctrlKey) {
               rotateX(-0.05);
            }
            else {
               translateModel(0, 20, 0);
            }

            break;

         default:
      }
   });

   function update() {
      if (needsUpdate) {
         context.clearRect(-width / 2, -height / 2, width, height);
         project();

         context.beginPath();
         drawLine(0, 1, 2, 3, 0);
         drawLine(4, 5, 6, 7, 4);
         drawLine(0, 4);
         drawLine(1, 5);
         drawLine(2, 6);
         drawLine(3, 7);
         context.stroke();
         needsUpdate = false;
      }

      requestAnimationFrame(update);
   }

   update(context, width, height);
};
