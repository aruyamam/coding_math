import particle from '../particle/particle';
import utils from '../utils/utils';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   const { width, height } = canvas;
   const gun = {
      x: 100,
      y: height,
      angle: -Math.PI / 4,
   };
   const cannonball = particle.create(gun.x, gun.y, 15, gun.angle, 0.2);
   let isShooting = false;
   let isHitted = false;
   let forceAngle = 0;
   const forceSpeed = 0.1;
   let rawForce = 0;
   const target = {};
   const particles = [];
   const numParitcles = 50;

   cannonball.radius = 7;

   function draw() {
      context.clearRect(0, 0, width, height);

      context.fillStyle = '#ccc';
      context.fillRect(10, height - 10, 20, -100);

      context.fillStyle = '#666';
      context.fillRect(10, height - 10, 20, utils.map(rawForce, -1, 1, 0, -100));

      context.fillStyle = '#000';

      context.beginPath();
      context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false);
      context.fill();

      context.save();
      context.translate(gun.x, gun.y);
      context.rotate(gun.angle);
      context.fillRect(0, -8, 40, 16);
      context.restore();

      context.beginPath();
      context.arc(cannonball.x, cannonball.y, cannonball.radius, 0, Math.PI * 2, false);
      context.fill();

      context.fillStyle = 'red';

      if (!isHitted) {
         context.beginPath();
         context.arc(target.x, target.y, target.radius, 0, Math.PI * 2, false);
         context.fill();
      }

      if (isHitted) {
         for (let i = 0; i < particles.length; i += 1) {
            const p = particles[i];
            // console.log(p);

            p.update();

            context.beginPath();
            context.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
            context.fill();
         }
      }
   }

   function aimGun(mouseX, mouseY) {
      gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3);
   }

   function onMouseMove(event) {
      aimGun(event.clientX, event.clientY);
   }

   function onMouseUp(event) {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
      aimGun(event.clientX, event.clientY);
   }

   function onMouseDown(event) {
      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);
      aimGun(event.clientX, event.clientY);
   }

   function removeDeadParticles() {
      for (let i = particles.length - 1; i >= 0; i -= 1) {
         const p = particles[i];
         if (p.y - p.radius > height) {
            particles.splice(i, 1);
         }
      }
   }

   function setTarget() {
      target.x = utils.randomRange(200, width);
      target.y = height;
      target.radius = utils.randomRange(10, 40);
   }

   function setParticles() {
      for (let i = 0; i < numParitcles; i += 1) {
         particles.push(
            particle.create(
               target.x,
               target.y,
               Math.random() * 8 + 5,
               -Math.PI / 2 + (Math.random() * 0.2 - 0.1),
               0.1,
            ),
         );
      }
   }

   function checkTarget() {
      if (utils.circleCollision(target, cannonball)) {
         isHitted = true;
      }
   }

   function update() {
      if (!isShooting) {
         forceAngle += forceSpeed;
      }
      rawForce = Math.sin(forceAngle);
      if (isShooting) {
         cannonball.update();
         checkTarget();
      }

      draw();

      if (isHitted) {
         removeDeadParticles();
      }

      if (isHitted && particles.length === 0) {
         isHitted = false;
         setTarget();
         setParticles();
      }

      if (cannonball.y > height) {
         isShooting = false;
      }
      requestAnimationFrame(update);
   }

   function shoot() {
      const force = utils.map(rawForce, -1, 1, 2, 20);
      cannonball.x = gun.x + Math.cos(gun.angle) * 40;
      cannonball.y = gun.y + Math.sin(gun.angle) * 40;
      cannonball.setSpeed(force);
      cannonball.setHeading(gun.angle);

      isShooting = true;
   }

   setTarget();
   setParticles();
   update();

   document.body.addEventListener('mousedown', onMouseDown);

   document.body.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
         case 32: // space
            if (!isShooting) {
               shoot();
            }
            break;

         default:
            break;
      }
   });
};
