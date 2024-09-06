"use strict"
import fs from "fs"






// TO DO LIST:
// 1. compute how to win high, and low (creep in from edges) <need average speed needed celined * 
// 2. save difference between high and low
// 3. compute the final output

function readInput(){
    const inputText = fs.readFileSync("input1.txt", "utf8")
    const inputArray = []
    
    
    inputText.split(/\n/).forEach((line) => {
        // console.log('line: ', line)
        inputArray.push(line)
    })
    return inputArray
}

function linesToRaces(lines){
    const regSpaces = /([\s]+)/g
    const times = lines[0].replaceAll(regSpaces,'.').split(':').pop().replaceAll('.', '').trim()
    const distances = lines[1].replaceAll(regSpaces,'.').split(':').pop().replaceAll('.', '').trim() 
    const races = []
    console.log(times, distances)
    
    let raceObj = {
        'time': parseInt(times),
        'distance': parseInt(distances),
        'minSpeed': null,
        'maxSpeed': null
    } 
    races.push(raceObj)
    
    console.log(races)
    return races
}

function findFastWin(raceObj){
    // console.log(raceObj)
    const maxSpeed = raceObj.time - raceObj.minSpeed + 1
    let speed = maxSpeed
    // console.log(speed)
    while(true){
        let finalDistance = speed * (raceObj.time - speed)
        if( finalDistance > raceObj.distance){
            raceObj.maxSpeed = speed
            // console.log('BARP')
            break
        }
        speed -= 1
    }
    // console.log(maxSpeed)
}

function findSlowWin(raceObj){
    // console.log(raceObj)
    const minSpeed = Math.floor(raceObj.distance / raceObj.time)
    const driveTime = raceObj.time - minSpeed
    // console.log(`speed ${minSpeed}`)
    // console.log(`driveTime ${driveTime}`)
    let speed = minSpeed
    while(true){
        let finalDistance = speed * (raceObj.time - speed)
        // console.log(`speed ${speed} raceObjTime ${raceObj.time}`)
        // console.log(`finalDistance ${finalDistance}`)
        if(finalDistance > raceObj.distance){
            raceObj.minSpeed = speed
            // console.log('YARP')
            break
        }
        speed += 1
    }
}

function findRange(raceObj){
    raceObj['range'] = raceObj.maxSpeed - raceObj.minSpeed + 1
}

function answer1(races){
    const output = races.reduce((acc, val) => {
        return acc * val.range
    },1)
    console.log(`part 2 answer: ${output}`)
}

function main(){
    const textLines = readInput()
    const races = linesToRaces(textLines)
    for (const race of races){
        findSlowWin(race)
        findFastWin(race)
        findRange(race)
    }

    answer1(races)

    // console.log(races)
}

let start = Date.now()
main()
let timeTaken = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)