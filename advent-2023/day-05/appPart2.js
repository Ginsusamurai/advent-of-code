"use strict"
import fs from "fs"






// array of seed objects
const builtSeeds = []
// map declarations
const seedRanges = []
const mapSeeds = []
const mapSeedToSoil = []
const mapSoilToFertilizer = []
const mapFertilizerToWater = []
const mapWaterToLight = []
const mapLightToTemperature = []
const mapTemperatureToHumidity = []
const mapHumidityToLocation = []


function createSeed(token) {
    return {"seed": parseInt(token), 
            "soil": 0,
            "fertilizer": 0,
            "water": 0,
            "light": 0,
            "temperature": 0,
            "humidity": 0,
            "location": 0}
}

function processInput(){
    const textInput = fs.readFileSync("input.txt", "utf8")
    const parts = textInput.split("\n\n")

    const stringSeeds = parts.shift().split(':').pop().trim().split(' ')
    const stringSeedToSoil = parts.shift().split(':').pop().trim().split('\n')
    const stringSoilToFertilizer = parts.shift().split(':').pop().trim().split('\n')
    const stringFertilizerToWater = parts.shift().split(':').pop().trim().split('\n')
    const stringWaterToLight = parts.shift().split(':').pop().trim().split('\n')
    const stringLightToTemperature = parts.shift().split(':').pop().trim().split('\n')
    const stringTemperatureToHumidity = parts.shift().split(':').pop().trim().split('\n')
    const stringHumidityToLocation = parts.shift().split(':').pop().trim().split('\n')

    console.log(`a ${stringSeeds}`)
    fillSeedRanges(stringSeeds)
    console.log(seedRanges[0])
    makeSeeds(seedRanges)

    fillMap(mapSeeds, stringSeeds)
    fillMap(mapSeedToSoil, stringSeedToSoil)
    fillMap(mapSoilToFertilizer, stringSoilToFertilizer)
    fillMap(mapFertilizerToWater, stringFertilizerToWater)
    fillMap(mapWaterToLight, stringWaterToLight)
    fillMap(mapLightToTemperature, stringLightToTemperature)
    fillMap(mapTemperatureToHumidity, stringTemperatureToHumidity)
    fillMap(mapHumidityToLocation, stringHumidityToLocation)
    







    // for(let seedVal of stringSeeds){
    //     builtSeeds.push(createSeed(seedVal))
    // }
}

function fillSeedRanges(tokens){
    while(tokens.length != 0){
        const start = parseInt(tokens.shift())
        const length = parseInt(tokens.shift())
        const end = start + length - 1
        seedRanges.push(createRangeObject(start, end))
    }
}

function makeSeeds(seedObjects){
    for (const val of seedObjects){
        console.log(val)
        
        for(let x = val.start; x <= val.end; x+=1){
            console.log(x)
            let newSeed = createSeed(x)
            builtSeeds.push(newSeed)
        }
        

    }
}

function createRangeObject(start, end){
    return {"start": start, "end": end}
}

function fillMap(map, lines){
    for (const line of lines){
        const tokens = line.trim().split(" ")
        const register = []
        for (const token of tokens){
            register.push(parseInt(token))
        }
        map.push(register)
    }
}


function matchSeedToSoil(builtSeed){
    builtSeed["soil"] = findMatch(builtSeed.seed, mapSeedToSoil)
}
function matchSoilToFertilizer(builtSeed){
    builtSeed["fertilizer"] = findMatch(builtSeed.soil, mapSoilToFertilizer)
}
function matchFertilizerToWater(builtSeed){
    builtSeed["water"] = findMatch(builtSeed.fertilizer, mapFertilizerToWater)
}
function matchWaterToLight(builtSeed){
    builtSeed["light"] = findMatch(builtSeed.water, mapWaterToLight)
}
function matchLightToTemperature(builtSeed){
    builtSeed["temperature"] = findMatch(builtSeed.light, mapLightToTemperature)
}
function matchTemperatureToHumidity(builtSeed){
    builtSeed["humidity"] = findMatch(builtSeed.temperature, mapTemperatureToHumidity)
}
function matchHumidityToLocation(builtSeed){
    builtSeed["location"] = findMatch(builtSeed.humidity, mapHumidityToLocation)
}




function findMatch(target, map){
    
    // console.log(`target ${target}`)
    // console.log(`map ${map}`)
    for (const line of map){
        // console.log(line)
        const firstDestiny = line[0]
        const firstSource = line[1]
        const range = line[2]
        const lastSource = firstSource + range - 1
        
        if (target < firstSource) { continue }
        if (target > lastSource) { continue }
        const delta = firstDestiny - firstSource
        // console.log(`target = ${target} : firstDestiny ${firstDestiny} : firstSource = ${firstSource} : range = ${range} : lastSource = ${lastSource}: delta = ${delta} : target+delta = ${target+delta}`)
        return target + delta
    }
    // console.log('hit a continue')
    return target
}

function main() {
    processInput()

    // console.log('seedToSoil')
    for (const entry of builtSeeds) {matchSeedToSoil(entry)}
    // console.log('soilToFertilizer')
    for (const entry of builtSeeds) {matchSoilToFertilizer(entry)}
    for (const entry of builtSeeds) {matchFertilizerToWater(entry)}
    for (const entry of builtSeeds) {matchWaterToLight(entry)}
    for (const entry of builtSeeds) {matchLightToTemperature(entry)}
    for (const entry of builtSeeds) {matchTemperatureToHumidity(entry)}
    for (const entry of builtSeeds) {matchHumidityToLocation(entry)}

    let best = builtSeeds[0].location

    for (const entry of builtSeeds) { 
        if (entry.location < best) {
            best = entry.location
        }
    }
    console.log(builtSeeds)
    console.log(`best is ${best}`)
}

main()