"use strict"
import { match } from "assert"
import fs from "fs"

const characterGlossary = {
    '|':'NS',
    '└':'NE',
    '┘':'NW',
    '┌':'ES',
    '┐':'WS',
    '⎯':'EW'
}



function findNextSegment(inputDirection, currentGridLocation, grid){
    // const directions = ['NS','EW', 'NE', 'NW', 'SW', 'SE']

    const oppositeValues = {
        "N": {"opp":"S","gridAdjust":{"x":0, "y":-1}},
        "E": {"opp":"W","gridAdjust":{"x":1, "y": 0}},
        "S": {"opp":"N","gridAdjust":{"x":0, "y": 1}},
        "W": {"opp":"E","gridAdjust":{"x":-1,"y": 0}}
    }

    // I know the direction from the original cell, need to find a compatible option to match
    // Input should be E, going from S to first East cell
    // outputDirection = W
    console.log(inputDirection)
    const outputDirection = oppositeValues[inputDirection]['opp']
    const nextGridAdjustVal = oppositeValues[inputDirection]['gridAdjust']
    // current grid = (0,2)
    const nextGridVal = {}
    // next grid is (0,2) + (1,0) = (1,2)
    nextGridVal.x = currentGridLocation.x + nextGridAdjustVal.x
    nextGridVal.y = currentGridLocation.y + nextGridAdjustVal.y
    
    // this returns '┘', which I can translate to a string 'WN', my outputDireciton is 'W' so I strip that out
    // new output to return is "N" which becomes next input
    const nextSegmentXY = grid[nextGridVal.y][nextGridVal.x]
    const x = characterGlossary[nextSegmentXY]
    console.log('dog',x, outputDirection)

    const directionToNextCell = x.replace('W', '')
    console.log(nextSegmentXY)

    return  [directionToNextCell, nextGridVal]

    // [ '.', '.', '┌', '┐', '.' ],
    // [ '.', '┌', '┘', '|', '.' ],
    // [ 'S', '┘', '.', '└', '┐' ], start at 0,2 -> go E to 1,2 -> go N to 1,1
    // [ '|', '┌', '⎯', '⎯', '┘' ],
    // [ '└', '┘', '.', '.', '.' ]

    // assume start at S and going E
    // if inputDirection is E, only valid choices are EW, SW,NW
    // this removes NS, NE, SE
    // the options are always "opposite of my input direction + cardinal"
    // the next value is "NW"
    // Remove the original input-opposite (W) and you get N as the new input direction
    // get the crid coordinates for that val
    // STEP 2
    // New input is N, so only NS, SW, SE are valid.
    // Find match, strip the input-opposite, move on
    // replace old grid coordinates

    // 2 loops of this running in opposite direction until they meet at same grid coordinates




}


function findStart(inputArrays){
    let xstart = null
    let ystart = null
    for(const [i,ygrid] of inputArrays.entries()){
        console.log(ygrid)
        if(ygrid.includes('S')){
            xstart = ygrid.indexOf('S')
            ystart = i
        }
    }
    return {'x': xstart,
            'y': ystart}

}

function cleanUnicode(text){
    const NnE = /L/g
    const NnW = /J/g
    const SnW = /7/g
    const SnE = /F/g
    
    text = text.replaceAll('L','└')
    text = text.replaceAll('J','┘')
    text = text.replaceAll('7','┐')
    text = text.replaceAll('F','┌')
    text = text.replaceAll('-','⎯')
    // text = text.replaceAll('.','⌑')
    // console.log(text)
    return text
}


function main(){
    let cleanGrid = readInput()
    // let cleanGrid = splitRows(cleanText)
    let startPoint = findStart(cleanGrid)
    console.log(cleanGrid)
    console.log(startPoint)

    let [nextDir, nextGrid] = findNextSegment('E',{'x':0,'y':2},cleanGrid)
    console.log(nextDir, nextGrid)

    // build a function that has two "runners" that crawl in each direction
    // Each run has +1 step. When they match, end, report the step value
    // loop through until the "nextGrid" value for each matches
}


function readInput(){
    const inputText = fs.readFileSync("test.txt", "utf8")
    const inputArray = []
    // console.log(inputText)
    const cleanInput = cleanUnicode(inputText)

    cleanInput.split(/\n/).forEach((line) => {
        inputArray.push(line.split(''))
    })
    return inputArray
}


let start = Date.now()
main()
let timeTaken = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)