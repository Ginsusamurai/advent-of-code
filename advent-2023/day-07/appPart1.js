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

// AKQJT98765432
// 23456789TJQKA
const makeCardStrengths1 = () => {
    const items = {}
    for(const [ind,val] of '23456789TJQKA'.split('').entries()){
        items[val] = ind
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
    constructor(line, strengths){
        [this.rawHand, this.bid] = line.split(' ')
        this.handType = this.getHandType(this.rawHand)
        this.cardStrengthOrder = this.translateCards(this.rawHand, strengths)
    }

    getHandType(cards){
        let temp = counter(cards)
        temp = sortCardCounts(temp)
        // console.log(temp)
        for(let handRank of HandRankings){
            // console.log(handRank)
            if(handRank.pattern.toString() == temp.toString()){
                return handRank
            }
        }
    }

    translateCards(cards, strengths){
        let cardRanks = []
        for(let card of cards){
            cardRanks.push(strengths[card])
        }
        // console.log(cardRanks)
        return cardRanks
    }
}


function readInput(){
    const inputText = fs.readFileSync("input1.txt", "utf8")
    const inputArray = []
    
    
    inputText.split(/\n/).forEach((line) => {
        // console.log('line: ', line)
        inputArray.push(line)
    })
    return inputArray
}

function pushHandsToGroups(allHands, groups){
    for(let hand of allHands){
        // console.log(hand)
        switch(hand.handType.name.toLowerCase()){
            case 'Five of a kind'.toLowerCase():
                groups.fives.push(hand);
                break;
            case 'Four of a kind'.toLowerCase():
                groups.fours.push(hand);
                break;
            case 'Full House'.toLowerCase():
                groups.fulls.push(hand);
                break;
            case 'Three of a kind'.toLowerCase():
                groups.threes.push(hand);
                break;
            case 'Two Pair'.toLowerCase():
                groups.twoPairs.push(hand);
                break;
            case 'One pair'.toLowerCase():
                groups.pairs.push(hand);
                break;
            case 'High Card'.toLowerCase():
                groups.highCard.push(hand);
                break;
        }
    }

}

function sortGroups(groups){
    for(let thing of Object.keys(groups)){
        // console.log(thing)
        // console.log(groups[thing])
        // console.log('before')
        // console.log(groups[thing])
        groups[thing].sort((a,b) => {
            for(let i = 0; i <= a.cardStrengthOrder.length - 1; i+=1){
                // console.log('dog',i, a, b, a.cardStrengthOrder[i] - b.cardStrengthOrder[i] )
                if((a.cardStrengthOrder[i] - b.cardStrengthOrder[i]) >= 1){
                    return 1
                }
                if((a.cardStrengthOrder[i] - b.cardStrengthOrder[i]) <= -1){
                    return -1
                }
            }
                // console.log('no sort')
                return 0})
        // console.log('after')
        // console.log(groups[thing])
        }

}

function bubSortGroups(cardGroups){
    for( let group of Object.keys(cardGroups)){
        bubbleSort(cardGroups[group])
    }    
}


function bubbleSort(inputArr){
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
        }
    }
    return inputArr;
}

function combineGroups(groups){
    let returnal = []
    returnal = returnal.concat(groups.highCard,groups.pairs,groups.twoPairs,groups.threes,groups.fulls,groups.fours,groups.fives)
    // console.log(returnal)
    return returnal
}

function computeScore(finalGroups){
    let total = 0
    for(let i = 0; i < finalGroups.length; i += 1){
        let bid = parseInt(finalGroups[i].bid)
        let rank = i+1
        let val = bid * rank
        console.log(bid, rank,val, finalGroups[i].rawHand, finalGroups[i].cardStrengthOrder)
        total += val
    }
    return total
}

function main(){
    const input = readInput()


    const cardGroups = {
        'fives': [],
        'fours': [],
        'fulls': [],
        'threes': [],
        'twoPairs': [],
        'pairs': [],
        'highCard': []
    }

    // const hands = processHands(input)
    let cardStrenghts = makeCardStrengths1()
    // const rankRef = makeCardSortTable(cardOrder)
    // const handRef = makeHandSortTable(handOrder)
    // const handTypeSort = sortHandsByType(hands, handRef)

    const builtHands = []
    for(let hand of input){
        builtHands.push(new dealtHand(hand, cardStrenghts))
    }

    pushHandsToGroups(builtHands, cardGroups)
    sortGroups(cardGroups)
    // bubSortGroups(cardGroups)
    let finalGroups = combineGroups(cardGroups)
    let score = computeScore(finalGroups)
    // console.log(cardStrenghts)
    // console.log(builtHands)
    // console.log(cardGroups)
    // console.log(finalGroups)
    console.log(score)
}


let start = Date.now()
main()
let timeTaken = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)