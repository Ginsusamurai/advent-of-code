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



function findNextSegment(inputDirection, currentGridLocation, grid, flag){
    // const directions = ['NS','EW', 'NE', 'NW', 'SW', 'SE']
    // console.log

    const oppositeValues = {
        "N": {"opp":"S","gridAdjust":{"x":0, "y":-1}},
        "E": {"opp":"W","gridAdjust":{"x":1, "y": 0}},
        "S": {"opp":"N","gridAdjust":{"x":0, "y": 1}},
        "W": {"opp":"E","gridAdjust":{"x":-1,"y": 0}}
    }

    // I know the direction from the original cell, need to find a compatible option to match
    // Input should be E, going from S to first East cell
    // outputDirection = W
    // console.log(`start ${inputDirection} currentGrid ${currentGridLocation.x},${currentGridLocation.y}, flag ${flag}`)
    let outputDirection = oppositeValues[inputDirection]['opp']
    let nextGridAdjustVal = oppositeValues[inputDirection]['gridAdjust']
    // current grid = (0,2)
    let nextGridVal = {}
    // next grid is (0,2) + (1,0) = (1,2)
    nextGridVal.x = currentGridLocation.x + nextGridAdjustVal.x
    nextGridVal.y = currentGridLocation.y + nextGridAdjustVal.y
    
    // this returns '┘', which I can translate to a string 'WN', my outputDireciton is 'W' so I strip that out
    // new output to return is "N" which becomes next input

    // console.log('peepy',nextGridVal.y, currentGridLocation.y, nextGridAdjustVal.y
    //     ,nextGridVal.y = currentGridLocation.y + nextGridAdjustVal.y)
    // console.log('peepx', nextGridVal.x,currentGridLocation.x,nextGridAdjustVal.x
    // ,nextGridVal.x = currentGridLocation.x + nextGridAdjustVal.x)
    
    // console.log(grid)
    // console.log(grid[2])

    let nextSegmentXY = grid[nextGridVal.y][nextGridVal.x]
    let x = characterGlossary[nextSegmentXY]
    // console.log('dog',x, outputDirection)

    let directionToNextCell = x.replace(outputDirection, '')
    // console.log(`nextseg: ${nextSegmentXY}, outputDir ${outputDirection}, dirToCell ${directionToNextCell}, nextGridVal ${nextGridVal.x},${nextGridVal.y}`)

    
    return  {'direction':directionToNextCell, 
            'coords': nextGridVal}

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

function findPathStarts(grid,start){

    /*
    |||
    |SL
    |L-
    */

    let topChar = grid[start.y -1][start.x] ? grid[start.y -1][start.x] : null
    let leftChar = grid[start.y][start.x -1] ? grid[start.y][start.x -1] : null
    let rightChar = grid[start.y][start.x +1] ? grid[start.y][start.x +1] : null
    let botChar = grid[start.y +1][start.x] ? grid[start.y +1][start.x] : null

    let topCard = characterGlossary[topChar]
    let leftCard = characterGlossary[leftChar]
    let rightCard = characterGlossary[rightChar]
    let botCard = characterGlossary[botChar]

    let output = []

    // console.log(topCard, leftCard, rightCard, botCard)

    topCard != null && topCard.includes("S") ? output.push('N') : null
    leftCard != null && leftCard.includes("E") ? output.push('W') : null
    rightCard != null && rightCard.includes("W") ? output.push('E') : null
    botCard != null && botCard.includes("N") ? output.push('S') : null

    let uno = {'direction': output.pop(),
                'coords': start}
    
    let dos = {'direction': output.pop(),
                'coords': start}

    return [uno, dos]
}


function navigatePaths(grid,start){

    const keepLooking = true

    let step = 0
    // console.log('start', start)
    let [path1, path2] = findPathStarts(grid,start)


    // const path1 = {
    //     'direction': 'E',
    //     'coords': {'x':0, 'y':2}
    // }

    // const path2 = {
    //     'direction': 'S',
    //     'coords': {'x':0, 'y':2}
    // }

    let path2dir = 'S'
    let path2coords = {'x':0, 'y':2}

    // let step = 0

    while(keepLooking){
        
        let narp1 = findNextSegment(path1.direction, path1.coords, grid,'_a_')

        path1['direction'] = narp1.direction
        path1['coords'] = narp1.coords

        // console.log('mew', path1)

        let narp2 = findNextSegment(path2.direction, path2.coords, grid,'_b_')

        path2['direction'] = narp2.direction
        path2['coords'] = narp2.coords

        // [ path2['direction'], path2['coords'] ] = findNextSegment(path2.direction, path2.coords, grid,'_b_')
        // let [we,win] = findNextSegment(path2dir, path2coords, grid,'_b_')
        // path2dir = we
        // path2coords = win
        // [path2dir, path2coords] 
        // console.log(path1)
        step = step + 1
        // break
        // console.log('hop',path1.coords, path2.coords)



        if(JSON.stringify(path1.coords) === JSON.stringify(path2.coords)){
            keepLooking == false
            // console.log('TERMINATE')
            break
        }
    }

    return step

}



function findStart(inputArrays){
    let xstart = null
    let ystart = null
    for(const [i,ygrid] of inputArrays.entries()){
        // console.log(ygrid)
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
    // console.log(cleanGrid)
    // console.log(startPoint)

    let x = navigatePaths(cleanGrid, startPoint)

    console.log('step count', x)
    // let [nextDir, nextGrid] = findNextSegment('E',{'x':0,'y':2},cleanGrid)
    // console.log(nextDir, nextGrid)

    // build a function that has two "runners" that crawl in each direction
    // Each run has +1 step. When they match, end, report the step value
    // loop through until the "nextGrid" value for each matches
}


function readInput(){
    const inputText = fs.readFileSync("input.txt", "utf8")
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