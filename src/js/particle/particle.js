const particle = {
   x: 0,
   y: 0,
   vx: 0,
   vy: 0,
   mass: 1,
   radius: 0,
   bounce: -1,
   friction: 1,
   gravity: 0,
   springs: null,
   gravitations: null,

   create(x, y, speed, direction, grav) {
      const obj = Object.create(this);
      obj.x = x;
      obj.y = y;
      obj.vx = Math.cos(direction) * speed;
      obj.vy = Math.sin(direction) * speed;
      obj.gravity = grav || 0;
      obj.springs = [];
      obj.gravitations = [];

      return obj;
   },

   addGravitation(p) {
      this.removeGravitation(p);
      this.gravitations.push(p);
   },

   removeGravitation(p) {
      for (let i = 0; i < this.gravitations.length; i += 1) {
         if (p === this.gravitations[i]) {
            this.gravitations.splice(i, 1);
            return;
         }
      }
   },

   addSpring(point, k, length) {
      this.removeSpring(point);
      this.springs.push({
         point,
         k,
         length: length || 0,
      });
   },

   removeSpring(point) {
      for (let i = 0; i < this.springs.length; i += 1) {
         if (point === this.springs[i].point) {
            this.springs.splice(i, 1);
            return;
         }
      }
   },

   getSpeed() {
      return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
   },

   setSpeed(speed) {
      const heading = this.getHeading();
      this.vx = Math.cos(heading) * speed;
      this.vy = Math.sin(heading) * speed;
   },

   getHeading() {
      return Math.atan2(this.vy, this.vx);
   },

   setHeading(heading) {
      const speed = this.getSpeed();
      this.vx = Math.cos(heading) * speed;
      this.vy = Math.sin(heading) * speed;
   },

   accelerate(ax, ay) {
      this.vx += ax;
      this.vy += ay;
   },

   update() {
      this.handleSprings();
      this.handleGravitations();
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
   },

   handleGravitations() {
      for (let i = 0; i < this.gravitations.length; i += 1) {
         this.gravitateTo(this.gravitations[i]);
      }
   },

   handleSprings() {
      for (let i = 0; i < this.springs.length; i += 1) {
         const spring = this.springs[i];
         this.springTo(spring.point, spring.k, spring.length);
      }
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

   springTo(point, k, length) {
      const dx = point.x - this.x;
      const dy = point.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const springForce = (distance - length || 0) * k;
      this.vx += (dx / distance) * springForce;
      this.vy += (dy / distance) * springForce;
   },
};

export default particle;
