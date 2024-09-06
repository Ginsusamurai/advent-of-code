
//import weight of modules as array "masses"
var fs = require('fs');
var masses = fs.readFileSync('day01Input.txt').toString().split("\n");
for(y = 0; y< masses.length; y++) {
    masses[y] = masses[y].replace("\r", "");
    //console.log(masses[y]);
}

//take in a 'mass' and compute the return fuel amount to launch it
function computeFuelCost(input){
  return Math.floor(input/3) - 2;
}

//make and populate an array with the cost of each modules launch fuel
var eachFuelCost = [];
masses.forEach(mass => eachFuelCost.push(computeFuelCost(mass))); //IMPROVE: 1-line this declaration
// for(var x = 0; x< masses.length; x++){
//   console.log(masses[x] + " : " + eachFuelCost[x]);
// }

//sum the fuel costs for each module
// var totalFuel = 0;
// eachFuelCost.forEach(fuel => totalFuel += fuel);

var totalFuel = eachFuelCost.reduce((runningTotal, currentIndex) => runningTotal + currentIndex);

console.log("total initial Fuel Cost: " + totalFuel);

console.log("STEP 2");


//recursive function to return the weight of the initial fuel and fuel to launch that fuel
function repeatFuelConversion(inputMass){
  //start sum of all fuel values array
  var massArray = [inputMass];

  //while the last fuel value is more than 0, figure out the last fuel's fuel cost
  while(massArray[massArray.length-1] > 0){
    massArray.push(computeFuelCost(massArray[massArray.length-1]));
  }  //IMPROVE: compute value, if <= 0 break, else add to array

  //sanity check to ensure any values below 0 are equal to 0
  for(var q = 0; q < massArray.length; q++){
    if(massArray[q] <= 0){
      massArray[q] = 0;
    }
  }//IMPROVE: if aove change is made, this is redundant

  //remove the mass of the launch module
  massArray.splice(0,1);  //IMPROVE: probably not neccessary if we declare the massArray better
  
  //sum all the fuel values and return
  // var totalMass = 0;
  // massArray.forEach(mass => totalMass += mass); //IMPROVE: 1-line this?
  
  var totalMass = massArray.reduce((runningTotal, currentIndex) => runningTotal + currentIndex);

  return totalMass;
  }

//array of recursive fuel total amounts per module
var completeWeights = [];
masses.forEach(mass => completeWeights.push(repeatFuelConversion(mass))); //IMPROVE: 1-line this?

//shows the final fuel weights array
//console.log(completeWeights);

//sum and print the final fuel required
// var finalTotal = 0;
// completeWeights.forEach(fuel => finalTotal += fuel);//IMPROVE: 1-line this?

var finalTotal = completeWeights.reduce((runningTotal, currentIndex) => runningTotal + currentIndex);

console.log("Final recursive fuel adjusted total: " + finalTotal);