import re
from operator import mul
import time


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        f = f.read().split("\n")
        return f


def part1(data):
    symbol_regex = r"[^.\d]"
    symbol_adjacent = set()
    for rowNum, rowContent in enumerate(data):
        for m in re.finditer(symbol_regex, rowContent):
            start = m.start()
            symbol_adjacent |= {
                (r, c)
                for r in range(rowNum - 1, rowNum + 2)
                for c in range(start - 1, start + 2)
            }

    number_regex = r"\d+"
    number_sum = 0
    for rowNum, rowContent in enumerate(data):
        for m in re.finditer(number_regex, rowContent):
            if any((rowNum, colNum) in symbol_adjacent for colNum in range(*m.span())):
                number_sum += int(m.group())

    return number_sum


def part2(data):
    # print(data)
    symbols = dict()
    gear = r"\*"
    for row, line in enumerate(data):  # go through rows
        print(row, line)
        for index in re.finditer(gear, line):  # on each row find
            symbols[(row, index.start())] = []
    print(symbols)

    number_regex = r"\d+"

    for row_index, line in enumerate(data):
        for column_index in re.finditer(number_regex, line):
            for row_check in range(row_index - 1, row_index + 2):
                for column_check in range(
                    column_index.start() - 1, column_index.end() + 1
                ):
                    if (row_check, column_check) in symbols:
                        symbols[(row_check, column_check)].append(
                            int(column_index.group())
                        )

    print(symbols)
    gear_ratios = 0
    for gear in symbols.values():
        print(len(gear))
        if len(gear) == 2:
            print(gear)
            gear_ratios += mul(*gear)

    return gear_ratios


if __name__ == "__main__":
    start_time = time.time()
    textInput = readInFile(fName="input")
    print(textInput)
    print(f"Part1: {part1(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    start_time = time.time()
    textInput = readInFile(fName="input")
    print(f"part2: {part2(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
