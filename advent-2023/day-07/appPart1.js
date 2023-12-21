"use strict"
import { match } from "assert"
import fs from "fs"

// TO DO LIST:
// 1. make ranking order of cards (A through 2)
// 2. make way to rank types of hands and identify them (regex?)
// 3. make hands that have both the raw card sort, the sorted cards for regex purpose, bid, and space for "hand type"
// 4. process hands to organize by "type"
    // a. idea: get biggest match, trim that out, get next biggest, etc. should eventually hit
// 5. sort within respective groups
// 6. combine the sorted group in to 1 big sort and assign ranks (start at index 0 for lowest, multiply bid by ind+1, total that)


const makeCardStrengths = () => {
    const items = {}
    for(const [ind,val] of 'AKQJT98765432'.split('').entries()){
        items[val] = 13 - ind
    }
    return items
}


const HandRankings = [
    {'pattern': [5], 'rank': 7, 'name': 'Five of a kind'},
    {'pattern': [4,1], 'rank': 6 , 'name': 'Four of a kind'},
    {'pattern': [3,2], 'rank': 5 , 'name': 'Full House'},
    {'pattern': [3,1,1], 'rank': 4 , 'name': 'Three of a kind'},
    {'pattern': [2,2,1], 'rank': 3 , 'name': 'Two pair'},
    {'pattern': [2,1,1,1], 'rank': 2 , 'name': 'One pair'},
    {'pattern': [1,1,1,1,1], 'rank': 1 , 'name': 'High Card'}  
]

function counter(list){
    // console.log(list.split(''))
    return list.split('').reduce((prev,curr) => {
        let obj = {...prev}
        obj[curr] = 1 + (prev[curr] || 0)
        return obj
    },
    {})    
}

function compareHandToGuide(input){

}

function sortCardCounts(input) {
    let cardCounts = []
    for(let val in input){
        // console.log(input[val])
        cardCounts.push(input[val])
    }
    return cardCounts.sort().reverse()
}

class dealtHand {
    constructor(line){
        [this.rawHand, this.bid] = line.split(' ')
        this.handType = this.getHandType(this.rawHand)
    }

    getHandType(cards){
        let temp = counter(cards)
        temp = sortCardCounts(temp)
        console.log(temp)
    }
}


// function processHands(input){
//     const hands = []
//     for(const line of input){
//         const item = line.split(' ')
//         const handObj = {
//             'rawCards': item[0],
//             'sortedCards': item[0].split('').sort().join(''),
//             'bid': item[1],
//             'handType': null
//         }
//         hands.push(handObj)
//     }
//     return hands
//     // console.log(hands)
// }

function readInput(){
    const inputText = fs.readFileSync("test1.txt", "utf8")
    const inputArray = []
    
    
    inputText.split(/\n/).forEach((line) => {
        // console.log('line: ', line)
        inputArray.push(line)
    })
    return inputArray
}

function main(){
    const input = readInput()


    const fives = []
    const fours = []
    const fulls = []
    const threes = []
    const twopairs = []
    const pairs = []
    const highcard = []

    const misc = []
    for(let hand of input){
        misc.push(new dealtHand(hand))
    }

    // const hands = processHands(input)
    let cardStrenghts = makeCardStrengths()
    // const rankRef = makeCardSortTable(cardOrder)
    // const handRef = makeHandSortTable(handOrder)
    // const handTypeSort = sortHandsByType(hands, handRef)
    console.log(misc)
}


let start = Date.now()
main()
let timeTaken = Date.now() - start;
// console.log(`This ran in ${timeTaken} miliseconds`)