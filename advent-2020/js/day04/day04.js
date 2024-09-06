var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');
data = data.split(/^\n/gm);

data.forEach((val,ind, arr) =>{
  let x =`${val.trim().replace(/\n/g, ' ').replace(/\s/g, ',')}`
  let y = x.split(/,/g).map((val,ind,arr) => {
    let [key, value] = val.split(':');
    return `"${key}":"${value}"`
  }).join(',')
  y = `{${y}}`
  arr[ind] = JSON.parse(y)
})

// console.log(data);

// let reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
let reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];


data.forEach((val, ind, arr) =>{
  arr[ind]['part1_valid'] = reqFields.every((code, ind, arr) => code in val )
  arr[ind]['part2_valid'] = valChecks(val);
})
// console.log(data);

let validCount1 = data.reduce((acc,val) => {
  if(val.part1_valid){
    acc += 1;
  }
  return acc;
}, 0)

let validCount2 = data.reduce((acc,val) => {
  if(val.part2_valid){
    acc += 1;
  }
  return acc;
}, 0)

// console.log(data);

console.log(validCount1);
console.log(validCount2);



function valChecks(obj){
  // console.log(obj);
  //byr matches
  if (!obj.part1_valid) return false;

  let byr = obj.byr.match(/^\d{4}$/) ? parseInt(obj.byr) : false;
  // console.log(byr);
  if(byr) byr = byr >= 1920 && byr <= 2002;

  let iyr = obj.byr.match(/^\d{4}$/) ? parseInt(obj.iyr) : false;
  // console.log(iyr);
  if(iyr) iyr = iyr >= 2010 && iyr <= 2020;

  let eyr = obj.eyr.match(/^\d{4}$/) ? parseInt(obj.eyr) : false;
  // console.log(eyr);
  if(eyr) eyr = eyr >= 2010 && eyr <= 2030;

  let hgt = obj.hgt.match(/(^\d+)(cm|in)$/) ? obj.hgt.match(/\d*/)[0] : false;
  if(hgt){
    // console.log(hgt, obj.hgt.match(/(cm|in)$/))
    if(obj.hgt.includes('cm')) hgt = hgt >= 150 && hgt <= 193;
    if(obj.hgt.includes('in')) hgt = hgt >= 59 && hgt <= 76; 
  }

  let hcl = obj.hcl.match(/^#[0-9a-f]{6}$/) ? true : false;

  let validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  let ecl = validColors.includes(obj.ecl);
  
  let pid = obj.pid.match(/^\d{9}$/)

  // console.log(byr, iyr, eyr, hgt, hcl, ecl, pid);
  
  let output = !!byr && !!iyr && !!eyr && !!hgt && !!hcl && !!ecl && !!pid;
  console.log('output', output)


  return output;
}



// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)  -> optional
