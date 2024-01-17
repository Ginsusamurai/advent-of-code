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

const makeCardStrengths2 = () => {
    const items = {}
    for(const [ind,val] of 'J23456789TQKA'.split('').entries()){
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
    return list.split('').reduce((prev,curr) => {
        let obj = {...prev}
        obj[curr] = 1 + (prev[curr] || 0)
        return obj
    },
    {})    
}

function sortCardCounts(input) {
    let cardCounts = []
    for(let val in input){
        cardCounts.push(input[val])
    }
    return cardCounts.sort().reverse()
}

class dealtHand {
    constructor(line, strengths, jokerStrengths){
        [this.rawHand, this.bid] = line.split(' ')
        this.handType = this.getHandType(this.rawHand)
        this.jokerHandType = this.getJokerHandType(this.rawHand)
        this.cardStrengthOrder = this.translateCards(this.rawHand, strengths)
        this.jokerStrengthOrder = this.translateCards(this.rawHand, jokerStrengths)
    }

    getJokerHandType(cards){
        let jCount = cards.split('').filter((x) => x == 'J').length
        let temp = counter(cards)
        delete temp.J
        if(JSON.stringify(temp) == '{}'){
            temp['J'] = 0
        }

        temp = sortCardCounts(temp)
        temp[0] = temp[0] + 0 + jCount
        for(let handRank of HandRankings){
            if(handRank.pattern.toString() == temp.toString()){
                return handRank
            }
        }
    }


    getHandType(cards){
        let temp = counter(cards)
        temp = sortCardCounts(temp)
        for(let handRank of HandRankings){
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
        return cardRanks
    }
}


function readInput(){
    const inputText = fs.readFileSync("input1.txt", "utf8")
    const inputArray = []
    
    
    inputText.split(/\n/).forEach((line) => {
        inputArray.push(line)
    })
    return inputArray
}

function pushHandsToGroups(allHands, groups){
    for(let hand of allHands){
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

function pushHandsToJokerGroups(allHands, groups){
    for(let hand of allHands){
        switch(hand.jokerHandType.name.toLowerCase()){
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

        groups[thing].sort((a,b) => {
            for(let i = 0; i <= a.cardStrengthOrder.length - 1; i+=1){
                if((a.cardStrengthOrder[i] - b.cardStrengthOrder[i]) >= 1){
                    return 1
                }
                if((a.cardStrengthOrder[i] - b.cardStrengthOrder[i]) <= -1){
                    return -1
                }
            }
                return 0})
        }

}

function sortJokerGroups(groups){
    for(let thing of Object.keys(groups)){
        groups[thing].sort((a,b) => {
            for(let i = 0; i <= a.jokerStrengthOrder.length - 1; i+=1){
                if((a.jokerStrengthOrder[i] - b.jokerStrengthOrder[i]) >= 1){
                    return 1
                }
                if((a.jokerStrengthOrder[i] - b.jokerStrengthOrder[i]) <= -1){
                    return -1
                }
            }
                return 0})
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
    return returnal
}

function computeScore(finalGroups){
    let total = 0
    for(let i = 0; i < finalGroups.length; i += 1){
        let bid = parseInt(finalGroups[i].bid)
        let rank = i+1
        let val = bid * rank
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

    const jokerCardGroups = {
        'fives': [],
        'fours': [],
        'fulls': [],
        'threes': [],
        'twoPairs': [],
        'pairs': [],
        'highCard': []
    }

    let cardStrengths = makeCardStrengths1()
    let jokerStrengths = makeCardStrengths2()

    const builtHands = []
    for(let hand of input){
        builtHands.push(new dealtHand(hand, cardStrengths, jokerStrengths))
    }

    pushHandsToGroups(builtHands, cardGroups)
    pushHandsToJokerGroups(builtHands, jokerCardGroups)
    sortGroups(cardGroups)
    sortJokerGroups(jokerCardGroups)
    let finalGroups = combineGroups(cardGroups)
    let finalGroups2 = combineGroups(jokerCardGroups)
    let score = computeScore(finalGroups)
    let score2 = computeScore(finalGroups2)
    console.log(score)
    console.log(score2)
}


let start = Date.now()
main()
let timeTaken = Date.now() - start;
console.log(`This ran in ${timeTaken} miliseconds`)