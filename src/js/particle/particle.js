import vector from '../vector/vector';

const particle = {
   x: 0,
   y: 0,
   vx: 0,
   vy: 0,
   mass: 1,
   radius: 0,
   bounce: -1,
   friction: 1,
   gravity: null,

   create(x, y, speed, direction, grav) {
      const obj = Object.create(this);
      obj.x = x;
      obj.y = y;
      obj.vx = Math.cos(direction) * speed;
      obj.vy = Math.sin(direction) * speed;
      obj.gravity = grav || 0;

      return obj;
   },

   accelerate(ax, ay) {
      this.vx += ax;
      this.vy += ay;
   },

   update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
   },

   angleTo(p2) {
      return Math.atan2(p2.y - this.y, p2.x - this.x);
   },

   distanceTo(p2) {
      const dx = p2.x - this.x;
      const dy = p2.y - this.y;

      return Math.sqrt(dx * dx + dy * dy);
   },

   gravitateTo(p2) {
      const dx = p2.x - this.x;
      const dy = p2.y - this.y;
      const distSQ = dx * dx + dy * dy;
      const dist = Math.sqrt(distSQ);
      const force = p2.mass / distSQ;
      const ax = (dx / dist) * force;
      const ay = (dy / dist) * force;

      this.vx += ax;
      this.vy += ay;
   },
};

export default particle;
