export function randomRange(min, max) {
   return min + Math.random() * (max - min);
}

export function randomInt(min, max) {
   return Math.floor(min + Math.random() * (max - min + 1));
}
