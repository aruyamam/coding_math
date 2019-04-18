// require norm & lerp function
function map(value, sourceMin, sourceMax, destMin, destMax) {
   return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}
