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

function splitInput(input){

    let LRs = []
    let nodeObjs = {}

    LRs = input[0].split('')

    let allNodes = input.slice(2, input.length)

    for(let node of allNodes){
        let [name, set] = node.split(" = ")
        let [left, right] = set.replace(/[(),]/g, '').split(' ')
        
        nodeObjs[name] = {
            "L": left,
            "R": right
        }

    }
    return [LRs, nodeObjs]
}

function navigateToZ1(directions, nodeObjs, startNode, endCondtition){
    let steps = 0

    let currentNode = startNode

    for(let i = 0; i < directions.length; i += 1){

        currentNode = nodeObjs[currentNode][directions[i]]

        steps += 1

        // console.log(currentNode, i, steps)
        if(currentNode.match(endCondtition)){
            break
        }

        if(i == directions.length - 1){  
            i = -1
        }

    }
    return steps
}

function findAllANodes(nodeObjs){
    
    const startReg = /A$/g
    const arrayOfNodes = []

    for(let nameLabel of Object.keys(nodeObjs)){
        if(nameLabel.match(startReg)){
            arrayOfNodes.push(nameLabel)
        }
    }

    return arrayOfNodes
}


function getAllStepCounts(directions, nodeObjs, startingNodes, endCondition){

    const stepArray = []

    for(let node of startingNodes){
        
        let step = navigateToZ1(directions, nodeObjs, node, endCondition)
        stepArray.push(step)
    }

    return stepArray
    // console.log(stepArray)
}

function findLCM(stepsArray){
    const gcd = (a,b) => a ? gcd(b % a, a) : b
    const lcm = (a,b) => a * b / gcd(a,b)

    return stepsArray.reduce(lcm)
}


function main(){
    const input = readInput()
    const [LRs, nodeObjs] = splitInput(input) 
    
    const p1EndRegex = /ZZZ/g
    const p2EndRegex = /Z$/g
    const part1Start = 'AAA'

    // let part1answer = navigateToZ1(LRs, nodeObjs, part1Start, p1EndRegex)
    const startingNodes = findAllANodes(nodeObjs)
    let stepsToEach = getAllStepCounts(LRs, nodeObjs, startingNodes, p2EndRegex)
    let part2Answer = findLCM(stepsToEach)

    console.log(part2Answer)

}




let start = Date.now()
main()
let timeTaken = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)