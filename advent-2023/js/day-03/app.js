"use strict"
import fs from "fs"

const inputText1 = fs.readFileSync("inputTest1.txt", "utf8")
const inputText1Array = []


inputText1.split(/\n/).forEach((line) => {
    // console.log('line: ', line)
    inputText1Array.push(line)
})

const symbolRegex = /([^\d\.])/g
const numRegex = /([\d]+)/g

const numberList = []
const symbolList = []


inputText1Array.forEach((line, lineIndex) => {

    const numberMatches = [...line.matchAll(numRegex)]
    
    console.log(numberMatches)
    numberMatches.forEach((numMatch) => {
        const num = Number.parseInt(numMatch[0])
        const matchStart = numMatch.lineIndex
        const matchEnd = matchStart + numMatch[0].length - 1
        let isPart = false
        let gearIndex = ""

        // check left
        if(matchStart - 1 >= 0){
            const char = line[matchStart -1]
            const isSymbol = !!symbolRegex.exec(char)
            if (isSymbol){
                isPart = true
                
            }
        }

        // check right
        if (matchEnd + 1 < line.length){
            const char = line[matchEnd + 1]
            const isSymbol = !!symbolRegex.exec(char)
            if (isSymbol){
                isPart = true
            }
        }

        // check top row and diag matchStart - 1 to matchEnd +1
        if (lineIndex !=0){
            const topLine = lines[lineIndex -1]
            const topStart = Math.max(0, matchStart -1) 
            const topEnd = Math.min(topLine.length - 1, matchEnd +1)
            for (let topIndex = topStart; topIndex <= topEnd; topIndex++){
                const
            }
        }
    })
})