import particle from '../particle/particle';
import vector from '../vector/vector';

window.onload = function onload() {
   const canvas = document.getElementById('canvas');
   const context = canvas.getContext('2d');
   const width = (canvas.width = window.innerWidth);
   const height = (canvas.height = window.innerHeight);
   const ship = particle.create(width / 2, height / 2, 0, 0);
   const thrust = vector.create(0, 0);
   let angle = 0;
   let turningLeft = false;
   let turningRight = false;
   let thrusting = false;

   ship.friction = 0.99;

   update();

   document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
         case 38: // up
            thrusting = true;
            break;

         case 37: // left
            turningLeft = true;
            break;

         case 39:
            turningRight = true;
            break;

         default:
            break;
      }
   });

   document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
         case 38: // up
            thrusting = false;
            break;

         case 37: // left
            turningLeft = false;
            break;

         case 39:
            turningRight = false;
            break;

         default:
            break;
      }
   });

   function update() {
      context.clearRect(0, 0, width, height);

      if (turningLeft) {
         angle -= 0.05;
      }
      if (turningRight) {
         angle += 0.05;
      }

      thrust.setAngle(angle);

      if (thrusting) {
         thrust.setLength(0.1);
      }
      else {
         thrust.setLength(0);
      }

      ship.accelerate(thrust);
      ship.update();

      context.save();
      context.translate(ship.position.getX(), ship.position.getY());
      context.rotate(angle);

      context.beginPath();
      context.moveTo(10, 0);
      context.lineTo(-10, -7);
      context.lineTo(-10, 7);
      context.lineTo(10, 0);
      if (thrusting) {
         context.moveTo(-10, 0);
         context.lineTo(-18, 0);
      }
      context.stroke();

      context.restore();

      if (ship.position.getX() > width) {
         ship.position.setX(0);
      }
      if (ship.position.getX() < 0) {
         ship.position.setX(width);
      }
      if (ship.position.getY() > height) {
         ship.position.setY(0);
      }
      if (ship.position.getY() < 0) {
         ship.position.setY(height);
      }

      requestAnimationFrame(update);
   }
};
