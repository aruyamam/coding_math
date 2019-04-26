import lerp from '../linear_interpolation/lerp';
import norm from '../nomalization/norm';

export default function map(value, sourceMin, sourceMax, destMin, destMax) {
   return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}
