import { randomInt } from './random';

window.onload = function onload() {
   const nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

   for (let i = 0; i < 10; i += 1) {
      const index = randomInt(4, 8);
      console.log(nums[index]);
   }
};
