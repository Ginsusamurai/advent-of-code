import re
from operator import mul
import time


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        f = f.read().split("\n")
        return f


def part1(data):
    # print(data)
    card_regex = r'Card\s+(\d+):( [\d+\s]+)\|( [\d+\s]+)$'
    card_dict = dict()
    for card in data:    
        output = re.match(card_regex, card)
        num_key = output.group(1)
        card_dict[num_key] = {}
        card_dict[num_key]['copies'] = 1
        card_dict[num_key]['matches'] = 0
        card_dict[num_key]['card_number'] = output.group(1)
        
        y = output.group(2).split(' ')
        while '' in y:
            y.remove('')
        y = [int(s) for s in y]
        card_dict[num_key]['winning_numbers'] = y
        
        y = output.group(3).split(' ')
        while '' in y:
            y.remove('')
        y = [int(s) for s in y]
        card_dict[num_key]['card_numbers'] = y

        for q in card_dict[num_key]['card_numbers']:
            if q in card_dict[num_key]['winning_numbers']:
                card_dict[num_key]['matches'] += 1
        
        if card_dict[num_key]['matches'] > 0:
            card_dict[num_key]['point_total'] = 2 ** (card_dict[num_key]['matches']-1)
        else:
            card_dict[num_key]['point_total'] = 0
    # print(card_dict['1'])
        
    # print(card_dict)
    val = 0
    for x, i in enumerate(card_dict):
        val += card_dict[i]['point_total']
    return [val, card_dict]

def part2(cards):
    # print(cards)
    # print(len(cards))
    total_copies = 0
    for num in range(1, len(cards)+1):
        next_up = range(1, cards[str(num)]['matches']+1)
        copies_to_make = cards[str(num)]['copies']
        for j in range(copies_to_make):
            for i in next_up:
                cards[str(num+i)]['copies'] += 1
        # print(num, cards[str(num)]['copies'], cards[str(num)]['matches'])
        total_copies += cards[str(num)]['copies']
    return total_copies

if __name__ == "__main__":
    start_time = time.time()
    textInput = readInFile(fName="input")
    # print(textInput)
    [p1Val, cards] = part1(textInput)
    print(f"Part1: {p1Val}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    start_time = time.time()
    # textInput = readInFile(fName="input")
    print(f"part2: {part2(cards)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
