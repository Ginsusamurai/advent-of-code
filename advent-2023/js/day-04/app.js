"use strict"
import fs from "fs"

const inputText1 = fs.readFileSync("input.txt", "utf8")
const inputText1Array = []


inputText1.split(/\n/).forEach((line) => {
    // console.log('line: ', line)
    inputText1Array.push(line)
})

// console.log(inputText1Array)

class Card {
    constructor(cardNumber, winInput, handInput){
        this.cardNumber = cardNumber;
        this.winningNumbers = this.makeArray(winInput);
        this.numbersInHand = this.makeArray(handInput);
        this.matches = this.compare(this.winningNumbers, this.numbersInHand)
        this.matchCount = this.matches.length
        this.points = this.computePoints(this.matchCount)
        this.copies = 1
    }

    makeArray(input){
        // let x = 
        let q = input.replaceAll("  "," ").trim()
        // console.log(`a ${input}`)
        // console.log(`q ${q}`)
        // let x = input.split(' ')
        // console.log(`thing ${x}`)
        return q.split(' ')
        
        
    }

    compare(winners, handers){
        // console.log(`win ${winners}`)
        // console.log(`have ${handers}`)
        return handers.filter( value => winners.includes(value))
        // console.log(`overlap ${overlap}`)
        // return overlap.length
    }

    computePoints(matches){
        // console.log(matches)
        if(matches == 0) return 0
        let x = Math.pow(2, matches -1)
        x = Math.ceil(x)
        return x
    }
}

const cardArray = []

const reggy = /Card[\s]+(\d+): ([\d\s]+)\|([\s\d]+)/g


for(let line of inputText1Array){
    // console.log(typeof(line))
    // console.log(line)
    const stuff = [...line.matchAll(reggy)]
    
    // console.log(stuff[0])
    // console.log(stuff[0][1])
    let hold = new Card(stuff[0][1], stuff[0][2], stuff[0][3])
    // console.log(hold)
    cardArray.push(hold)
}

let part1total = cardArray.reduce((acc, val) =>{
    return acc + val.points
}, 0)

// console.log(part1total)

for(let [ind, card] of cardArray.entries()){
    // console.log(ind)
    console.log(card)
    console.log(card.matchCount)
    for(let addTo = 1; addTo < card.matchCount +1; addTo+=1 ){
        let updateIndex = ind + addTo
        console.log(updateIndex)
        cardArray[updateIndex].copies += card.copies
    }
}

let part2total = cardArray.reduce((acc, val) => {
    return acc + val.copies
}, 0)

console.log(part2total)