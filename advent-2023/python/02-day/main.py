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

    def __init__(self, gameInput):
        print(gameInput)
        self.gameNumber = self.findNumber(gameInput)
        # redsList = self.findReds(gameInput)
        # bluesList = self.findBlues(gameInput)
        # greensList = self.findGreens(gameInput)
    
    def findNumber(self, input):
        x = re.search(r'Game (\d*)', input)
        return int(x[1])

    def redsList(self,input):
        x = re.search


    # def findReds(input):





# def part2(data):    
    # reds = re.findall(r'(\d)* red', games[1])
    # reds = [int(i) for i in reds]
    # blues = re.findall(r'(\d)* blue', games[1])
    # blues = [int(i) for i in blues]
    # greens = re.findall(r'(\d*) green', games[1])
    # greens = [int(i) for i in greens]
    # print(f"game {gameNum[1]}")
    # print(f"reds:  {reds} ,  viable num:  {max(reds)}")
    # print(f"blues: {blues},  viable blue: {max(blues)}")
    # print(f"greens:{greens}, viable green:{max(greens)}")


def part1(data, restrictions):
    # print(data)
    # print(restrictions)
    masterGameList = []
    for game in data:
        x = Game(game)
        # print(x)
        # stats = {'viable': None}
        # gameNum = re.search(r'Game (\d*)', game)
        # stats.gameNum = gameNum
        # # print(gameNum[1])
        # games = game.split(": ")
        # print(games)
        # gamesList = games[1].split(';')
        # print(gamesList)
        # reds = re.findall(r'(\d)* red', games[1])
        # # reds = [int(i) for i in reds]
        # stats.reds = []
        # for i in reds:
        #     if (i > restrictions.red):
        #         stats.viable = False
        #         break
        #     stats.reds.append(int(i))
        # blues = re.findall(r'(\d)* blue', games[1])
        # # blues = [int(i) for i in blues]
        # stats.blues = []
        # for i in blues:
        #     if (i > restrictions.blue):
        #         stats.viable = False
        #         break
        #     stats.blues.append(int(i))
        # greens = re.findall(r'(\d*) green', games[1])
        # # greens = [int(i) for i in greens]
        # print(f"game {gameNum[1]}")
        # print(f"reds:  {reds} ,  viable num:  {max(reds)}")
        # print(f"blues: {blues},  viable blue: {max(blues)}")
        # print(f"greens:{greens}, viable green:{max(greens)}")
        
# split games on semi colon
# track the "minimum viable" count of each color
# get all possible options of a color, if unviable game, break early, list as "non viable"
# if going through the entire set you don't hit bad game, marke "viable"



def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        # split inputs to rows
        f = f.read().split('\n')
        return f


if __name__ == '__main__':
    start_time = time.time()
    textInput = readInFile(fName='inputtest')
    # print(textInput)
    restrictions = {'red': 12, 'green': 13, 'blue': 14}
    print(f"Part1: {part1(textInput, restrictions)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    # start_time = time.time()
    # # textInput = readInFile(fName='input')
    # print(f"part2: {part2(textInput)}")
    # print(f"--- {(time.time() - start_time)*1000} ms")
