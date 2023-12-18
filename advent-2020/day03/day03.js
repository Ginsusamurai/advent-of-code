var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');
data = data.split('\n');
// console.log(data);
// console.log(data.length)

let theStats = data.reduce((acc, val, ind, arr) =>{
  acc.x += 3;
  let daCol = acc.x % val.length;
  acc.y += 1;
  let daRow = acc.y % arr.length;
  
  // console.log(daRow, daCol)
  // console.log(arr[daRow].charAt(daCol));
  arr[daRow].charAt(daCol) === '#' ? acc.hits += 1 : acc.miss += 1; 
    
  return acc;

},{x:0, y:0, hits:0, miss:0})

console.log(theStats);

let slopeTypes = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
]

let narp = [
  [3,1]
]

let bigSlopes = (slopTypes) => {
  let collisions = slopTypes.map((slope,index,arrays) => {
    let [column, row] = slope;
    let output = data.reduce((acc,val, ind, arr) =>{
      acc.y += row;
      acc.x += column;
      if(acc.y < arr.length){
        let daRow = acc.y % arr.length;
        let daCol = acc.x % val.length;
        arr[daRow].charAt(daCol) === '#' ? acc.hits += 1 : acc.miss += 1; 
      }
      return acc;
      },{x:0, y:0, hits:0, miss:0})
    return output;
  })
  return collisions;
}

console.log(bigSlopes(slopeTypes));
let total = bigSlopes(slopeTypes).reduce((acc,val) => acc * val.hits,1)
console.log(total);

// [ '..##.......',
//   '#...#...#..',
//   '.#....#..#.',
//   '..#.#...#.#',
//   '.#...##..#.',
//   '..#.##.....',
//   '.#.#.#....#',
//   '.#........#',
//   '#.##...#...',
//   '#...##....#',
//   '.#..#...#.#' ]


//2499336000
//562350600000