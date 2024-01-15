"use strict"
// import { match } from "assert"
import fs from "fs"



// attempt 2
// immediate swap of cards to numbers
// class has just cards as numbers, raw rank of hand type, bid


class dealtHand {
    constructor(line, strengths){
        [this.rawHand, this.bid] = line.split(' ')
        this.translatedCards = this.swapCards(this.rawHand, strengths)
        this.handType = this.getHandTypeRank(this.translatedCards)
        // this.cardStrengthOrder = this.translateCards(this.rawHand, strengths)
    }

    swapCards(cards, strengths){
        let splitCards = cards.split('')
        // console.log(splitCards)
        // console.log(strengths)
        for(let i = 0; i < splitCards.length; i += 1){
            splitCards[i] = strengths[splitCards[i]]
        }
        // console.log(splitCards)
        return splitCards
    }

    getHandTypeRank(translatedCards){
        // console.log(translatedCards)
        let x = counter(translatedCards)
        let y = sortCardCounts(x)
        console.log(y)
    }

}


const makeCardStrengths1 = () => {
    const items = {}
    for(const [ind,val] of '23456789TJQKA'.split('').entries()){
        items[val] = ind
    }
    return items
}

function readInput(){
    const inputText = fs.readFileSync("test1.txt", "utf8")
    const inputArray = []
    
    
    inputText.split(/\n/).forEach((line) => {
        // console.log('line: ', line)
        inputArray.push(line)
    })
    return inputArray
}

function makeHands(raw, cardRanks1){
    let handArray = []
    for(let line of raw){
        handArray.push(new dealtHand(line, cardRanks1))
    }
    // console.log(handArray)
    return handArray
}

function counter(list){
    // console.log(list.split(''))
    return list.reduce((prev,curr) => {
        let obj = {...prev}
        obj[curr] = 1 + (prev[curr] || 0)
        return obj
    },
    {})    
}

function sortCardCounts(input) {
    let cardCounts = []
    for(let val in input){
        // console.log(input[val])
        cardCounts.push(input[val])
    }
    return cardCounts.sort().reverse()
}


function main(){
    let rawHands = readInput()
    let cardRanks1 = makeCardStrengths1()
    let builtHands = makeHands(rawHands, cardRanks1)
    console.log(builtHands)
}




main()
