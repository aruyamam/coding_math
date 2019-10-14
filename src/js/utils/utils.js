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
   return (
      inRange(x, rect.x, rect.x + rect.width)
    && inRange(y, rect.y, rect.y + rect.height)
   );
}

function rangeIntersect(min0, max0, min1, max1) {
   return (
      Math.max(min0, max0) >= Math.min(min1, max1)
    && Math.min(min0, max0) <= Math.max(min1, max1)
   );
}

function rectIntersect(r0, r1) {
   return (
      rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width)
    && rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
   );
}

function degreeToRads(degree) {
   return (degree / 180) * Math.PI;
}

function radsToDegree(radians) {
   return (radians * 180) / Math.PI;
}

function randomRange(min, max) {
   return min + Math.random() * (max - min);
}

function roundToPlaces(value, places) {
   const mult = Math.pow(10, places);

   return Math.round(value * mult) / mult;
}

function roundNearest(value, nearest) {
   return Math.round(value / nearest) * nearest;
}

function randomDist(min, max, iterations) {
   let total = 0;

   for (let i = 0; i < iterations; i += 1) {
      total += randomRange(min, max);
   }

   return total / iterations;
}

function quadraticBezeir(p0, p1, p2, t, pFinal) {
   pFinal = pFinal || {};
   pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
   pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
   return pFinal;
}

function cubicBezeir(p0, p1, p2, p3, t, pFinal) {
   pFinal = pFinal || {};
   pFinal.x =    Math.pow(1 - t, 3) * p0.x
    + Math.pow(1 - t, 2) * 3 * t * p1.x
    + (1 - t) * 3 * t * t * p2.x
    + t * t * t * p3.x;
   pFinal.y =    Math.pow(1 - t, 3) * p0.y
    + Math.pow(1 - t, 2) * 3 * t * p1.y
    + (1 - t) * 3 * t * t * p2.y
    + t * t * t * p3.y;
   return pFinal;
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
   degreeToRads,
   radsToDegree,
   randomRange,
   roundToPlaces,
   roundNearest,
   randomDist,
   quadraticBezeir,
   cubicBezeir,
};
