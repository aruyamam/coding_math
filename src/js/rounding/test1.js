import utils from '../utils/utils';

window.onload = function onload() {
   console.log(utils.roundToPlaces(Math.PI, 1));
   console.log(utils.roundToPlaces(Math.PI, 3));
   console.log(utils.roundToPlaces(Math.PI, 5));
   console.log(utils.roundToPlaces(123456789, -1));
   console.log(utils.roundToPlaces(123456789, -2));
   console.log(utils.roundToPlaces(123456789, -3));
};
