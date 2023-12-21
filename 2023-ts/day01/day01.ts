"use strict"

import fs from "fs"


function splitData(rawString:string): string[] {
    let output: string[] = []
    rawString.split(/\n/).forEach((line:string) => {
        output.push(line)
    })
    return output;
}

function part1Data(): string {
    const rawString = fs.readFileSync("input.txt", "utf8")
    // const arrayData = splitData(readData)
    return rawString;
}

function part2Data(): string {
    const rawString = fs.readFileSync("inputTestNumsWords.txt", "utf8")
    // const arrayData = splitData(readData)
    return rawString;
}

function getNumbersFromText(inputTextArray:string[]) : number[] {
    const outputNumArray: number[] = []
    for(const line of inputTextArray){
        const regexNums:RegExp = /([0-9])/gi
        const numsFound = [...line.matchAll(regexNums)]
        let num1 = numsFound[0][0]
        let num2 = numsFound[numsFound.length - 1][0]
        outputNumArray.push(parseInt(num1 + num2))
    }

    return outputNumArray
}

function swapWordsForNums(input:string): string {
    let updatedString:string
    // console.log(input)
    updatedString = input.replaceAll(/one/g, 'one1one')
                         .replaceAll(/two/g, 'two2two')
                         .replaceAll(/three/g, 'three3three')
                         .replaceAll(/four/g, 'four4four')
                         .replaceAll(/five/g, 'five5five')
                         .replaceAll(/six/g, 'six6six')
                         .replaceAll(/seven/g, 'seven7seven')
                         .replaceAll(/eight/g, 'eight8eight')
                         .replaceAll(/nine/g, 'nine9nine')
    return updatedString
}

function main(): void {
    
    //part1
    let part1String:string = part1Data()
    let part1StringArray:string[] = splitData(part1String)
    let part1ArrayOfNums:number[] = getNumbersFromText(part1StringArray)
    const sum1 = part1ArrayOfNums.reduce((partialSum, a) => partialSum + a, 0)
    console.log(`Answer for part 1: ${sum1}`)
    
    // let part2String:string = part2Data()
    let part2String:string = `${part1String}`
    let part2StringProcessed:string = swapWordsForNums(part2String)
    let part2StringArray:string[] = splitData(part2StringProcessed)
    let part2ArrayOfNums:number[] = getNumbersFromText(part2StringArray)
    const sum2 = part2ArrayOfNums.reduce((partialSum, a) => partialSum + a, 0)
    console.log(`Answer for part 1: ${sum2}`)
}




let start:number = Date.now()
main()
let timeTaken:number = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)