var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n');
console.log(data);

const controller = data.map((val) =>{
  console.log(val);
  let obj = {
    original: val,
    min: val.split('-')[0],
    max: val.split('-')[1].split(' ')[0],
    letter: val.split(' ')[1].replace(':', ''),
    password: val.split(' ')[2],
    part1_valid: null,
    part2_valid: [null,null]
  }
  return obj;
})

controller.forEach((val, ind, arr) => {
  let count = val.password.split(val.letter).length - 1;
  console.log(count <= val.max && count >= val.min);
  arr[ind].part1_valid = count <= val.max && count >= val.min ? true : false;

  arr[ind].part2_valid[0] = val.password.charAt(val.min - 1) == val.letter ? true : false;
  arr[ind].part2_valid[1] = val.password.charAt(val.max - 1) == val.letter ? true : false;

})

let counterA = 0;
let counterB = 0;
controller.forEach((val) => {
  counterA = val.part1_valid ? counterA +1 : counterA;
  counterB = val.part2_valid.reduce((acc,val) => acc + val) == 1 ? counterB +1 : counterB;
})

console.log(controller);
console.log('part1-> valid passwords', counterA)
console.log('part2-> other passwords', counterB)

