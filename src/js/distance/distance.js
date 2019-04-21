export function distance(p0, p1) {
   const dx = p1.x - p0.x;
   const dy = p1.y - p0.y;

   return Math.sqrt(dx * dx + dy * dy);
}

export function distanceXY(x0, y0, x1, y1) {
   const dx = x1 - x0;
   const dy = y1 - y0;

   return Math.sqrt(dx * dx + dy * dy);
}
