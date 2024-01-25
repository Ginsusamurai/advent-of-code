"use strict"
import { match } from "assert"
import fs from "fs"


function readInput(){
    const inputText = fs.readFileSync("input.txt", "utf8")
    const inputArray = []
    
    
    inputText.split(/\n/).forEach((line) => {
        inputArray.push(line)
    })
    return inputArray
}




function pyramidCount1(input){

//    console.log(input)

    let x = input.reduce((acc,val,ind) =>{
        // console.log(val,ind)
        let n = val.length -1
        let y = val[n].length - 1
        acc += val[n][y]
        return acc
        // console.log(val[n][y])
        }, 0   )
    
    // console.log(x)
    return x

}

function splitInputArray(inputStrings){
    const outputArrayOfArrays = []
    for(let string of inputStrings){
        let splitString = string.split(' ')
        splitString = splitString.map(Number)
        let arrayToAdd = [splitString]
        outputArrayOfArrays.push(arrayToAdd)
    }
    return outputArrayOfArrays
}

function processEachInput(inputArrayCollection){
    for(let input of inputArrayCollection){
        let output = makeDifferenceArray(input)
        // console.log('output', output)
        input = output
    }
    // console.log(inputArrayCollection)
    return inputArrayCollection
}

function extrapolate(arrayCollection,flag){
    let reverse = flag || false

    for(let instance of arrayCollection){
        // console.log(instance[0])
        instance[0].push(0)
        for(let i = 1; i < instance.length; i += 1){
           
                instance[i].push(instance[i][instance[i].length - 1] + instance[i - 1][instance[i].length -1])
            }
            
            // console.log(instance[i], instance[i][instance[i].lengt])
        }

    
    // console.log(arrayCollection)
    return arrayCollection
}

function extrapolate2(arrayCollection){
    for(let instance of arrayCollection){
        instance[0].unshift(0)
        for(let i = 1; i < instance.length; i += 1){
           
            instance[i].unshift(instance[i][0] - instance[i - 1][0])
        }
        
        // console.log(instance[i], instance[i][instance[i].lengt])
    
    }
    // console.log(arrayCollection)
    return arrayCollection
}



function makeDifferenceArray(input){
    let differenceArray = []
    // console.log('narp', input, input.length)
    
    for(let i = 0; i < input[0].length - 1; i += 1){
        differenceArray.push(input[0][i+1] - input[0][i])
    }
    input.unshift(differenceArray)
    if(!differenceArray.every(item => item === 0)){
        makeDifferenceArray(input)
    }
    // console.log(input)
}

function pyramidCount2(input){

    //    console.log(input)
    
        let x = input.reduce((acc,val,ind) =>{
            // console.log(val,ind)
            let n = val.length -1
            let y = val[n].length - 1
            acc += val[n][0]
            return acc
            // console.log(val[n][y])
            }, 0   )
        
        // console.log(x)
        return x
    
    }

function main(){
    let input = readInput()
    let cleanedInput = splitInputArray(input)
    let pyramids = processEachInput(cleanedInput)
    // let finalPyramids = extrapolate(pyramids)
    // let computeVal1 = pyramidCount1(finalPyramids)
    let leftPyramids = extrapolate2(pyramids)
    let computeVal2 = pyramidCount2(leftPyramids)
    console.log(computeVal2)
}


let start = Date.now()
main()
let timeTaken = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)


/*
N input temps
N-1 differences
Aind[0,1,2,3,4]

Bind[0,1,2,3]

loop with index while n < A length
bn = Math.abs(an,an+1)
make array, add values to array
if new array is all 0s, add 0 at end, append <array n[-1]> to <array n-1[-1]>


*/