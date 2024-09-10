import time
import re


class Game:
    viableGame = None
    gameNumber = None
    redsList = []
    bluesList = []
    greensList = []
    minRed = 0
    minBlue = 0
    minGreen = 0

    def __init__(self, gameInput, limit):
        # print(gameInput)
        self.gameNumber = self.findNumber(gameInput)
        self.redsList = self.findReds(gameInput)
        self.bluesList = self.findBlues(gameInput)
        self.greensList = self.findGreens(gameInput)
        self.minRed = max(self.redsList)
        self.minBlue = max(self.bluesList)
        self.minGreen = max(self.greensList)
        self.viableGame = self.checkViable(limit)
    
    def findNumber(self, data):
        x = re.search(r'Game (\d*)', data)
        return int(x[1])

    def findReds(self, data):
        x = re.findall(r'(\d*) red', data)
        x = [int(i) for i in x]
        x.sort(reverse=True)
        return x

    def findBlues(self, data):
        x = re.findall(r'(\d*) blue', data)
        x = [int(i) for i in x]
        x.sort(reverse=True)
        return x
    
    def findGreens(self, data):
        x = re.findall(r'(\d*) green', data)
        x = [int(i) for i in x]
        x.sort(reverse=True)
        return x

    def checkViable(self, limit):
        # print(limit)
        if self.redsList[0] > limit['red']:
            return False
        if self.bluesList[0] > limit['blue']:
            return False
        if self.greensList[0] > limit['green']:
            return False
        return True
    

def part1(data, limit):
    # print(data)
    # print(restrictions)
    masterGameList = []
    for game in data:
        masterGameList.append(Game(game, limit))
    total = 0
    for narp in masterGameList:
        if narp.viableGame:
            total += narp.gameNumber
    return total


def part2(data, limit):
    masterGameList = []
    for game in data:
        masterGameList.append(Game(game, limit))
    total = 0
    for narp in masterGameList:
        x = narp.redsList[0] * narp.bluesList[0] * narp.greensList[0]
        total += x
    return total


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        # split inputs to rows
        f = f.read().split('\n')
        return f


if __name__ == '__main__':
    start_time = time.time()
    textInput = readInFile(fName='input')
    # print(textInput)
    restrictions = {'red': 12, 'green': 13, 'blue': 14}
    print(f"Part1: {part1(textInput, restrictions)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    start_time = time.time()
    # textInput = readInFile(fName='input')
    print(f"part2: {part2(textInput, restrictions)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
