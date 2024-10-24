import time
import re


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        f = f.read()
        return f

    
def part1(data):



# def part2(data):


if __name__ == "__main__":
    start_time = time.time()
    textInput = readInFile(fName="inputtest")
    # print(textInput)
    print(f"Part1: {part1(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    # start_time = time.time()
    # textInput = readInFile(fName="input")
    # print(f"part2: {part2(textInput)}")
    # print(f"--- {(time.time() - start_time)*1000} ms")