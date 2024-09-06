import re
import time


def part1(data):
    list1 = []
    # get all numbers as array
    # concat first and last numbers
    for row in enumerate(data):
        # print(f"{row} ")
        x = re.findall(r'[0-9]', row[1])
        # print(x)
        # print(x[0], x[-1])
        z = x[0] + x[-1]
        list1.append(int(z))
    # print(list1)
    # print(f'{sum(list1)}')
    return sum(list1)


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        # split inputs to rows
        f = f.read().split('\n')
        return f


def part2(data):
    # print(data)
    for row in enumerate(data):
        x = re.sub(r'one', 'one1one', row[1])
        x = re.sub(r'two', 'two2two', x)
        x = re.sub(r'three', 'three3three', x)
        x = re.sub(r'four', 'four4four', x)
        x = re.sub(r'six', 'six6six', x)
        x = re.sub(r'seven', 'seven7seven', x)
        x = re.sub(r'five', 'five5five', x)
        x = re.sub(r'eight', 'eight8eight', x)
        x = re.sub(r'nine', 'nine9nine', x)
        data[row[0]] = x
    # print(data)
    return part1(data)


if __name__ == '__main__':
    start_time = time.time()
    textInput = readInFile(fName='input')
    # print(textInput)
    print(f"Part1: {part1(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    start_time = time.time()
    # textInput = readInFile(fName='input')
    print(f"part2: {part2(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
