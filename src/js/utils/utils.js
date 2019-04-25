import norm from '../nomalization/norm';
import lerp from '../linear_interpolation/lerp';
import map from '../map/map';
import clamp from '../clamp/clamp';
import { distance, distanceXY } from '../distance/distance';

function circleCollision(c0, c1) {
   return distance(c0, c1) <= c0.radius + c1.radius;
}

function circlePointCollision(x, y, circle) {
   return distanceXY(x, y, circle.x, circle.y) < circle.radius;
}

function inRange(value, min, max) {
   return value >= Math.min(min, max) && value <= Math.max(min, max);
}

function pointInRect(x, y, rect) {
   return inRange(x, rect.x, rect.x + rect.width) && inRange(y, rect.y, rect.y + rect.height);
}

function rangeIntersect(min0, max0, min1, max1) {
   return (
      Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
   );
}

function rectIntersect(r0, r1) {
   return (
      rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width)
      && rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
   );
}

export default {
   norm,
   lerp,
   map,
   clamp,
   distance,
   distanceXY,
   circleCollision,
   circlePointCollision,
   pointInRect,
   inRange,
   rangeIntersect,
   rectIntersect,
};
