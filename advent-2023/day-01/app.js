"use strict"
import fs from "fs"

// const fs1 = require("fs")
const readData = fs.readFileSync("inputTestNums.txt", "utf8")
const finalNumData = []
// console.log(readData)

let readWordData = fs.readFileSync("input.txt", "utf8")
const finalNumWordData = []


readData.split(/\n/).forEach((line) => {
    // console.log('line: ', line)
    finalNumData.push(line)
})


function getNumbersFromText(inputTextArray){
    const outputNumArray = []
    for(const line of inputTextArray){
        const regexNums = /([0-9])/gi
        const numsFound = [...line.matchAll(regexNums)]
        console.log(numsFound)
        let num1 = numsFound[0][0]
        let num2 = numsFound[numsFound.length - 1][0]
        console.log(numsFound, num1, num2)
        console.log(parseInt(num1 + num2))
        outputNumArray.push(parseInt(num1 + num2))
    }
    return outputNumArray
}

const arrayOfNums = getNumbersFromText(finalNumData)

const sum = arrayOfNums.reduce((partialSum, a) => partialSum + a, 0);
// console.log(`Answer for part 1: ${sum}`)

// PART 2

readWordData = readWordData.replaceAll(/one/g, 'one1one')
readWordData = readWordData.replaceAll(/two/g, 'two2two')
readWordData = readWordData.replaceAll(/three/g, 'three3three')
readWordData = readWordData.replaceAll(/four/g, 'four4four')
readWordData = readWordData.replaceAll(/five/g, 'five5five')
readWordData = readWordData.replaceAll(/six/g, 'six6six')
readWordData = readWordData.replaceAll(/seven/g, 'seven7seven')
readWordData = readWordData.replaceAll(/eight/g, 'eight8eight')
readWordData = readWordData.replaceAll(/nine/g, 'nine9nine')

console.log(readWordData)
// console.log(out)


readWordData.split(/\n/).forEach((line) => {
    // console.log('line: ', line)
    finalNumWordData.push(line)
})

console.log(finalNumWordData)

let output2 = getNumbersFromText(finalNumWordData)

console.log(output2)

let finalVal2 = output2.reduce((partialSum, a) => partialSum + a, 0);

console.log(`answer for part 2: ${finalVal2}`)