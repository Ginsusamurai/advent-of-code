import time
import re
import math


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        f = f.read()
        return f


def part1(data):
    # split data to get each race/time option
    # figure out min speed to break record
    # figure out max speed to break record
    # figure out delta of min/max
    # example is 7s 9d
    # use the quadratic equation
    # -1p^2 - tp + d = 0  1/1 correlation to press time, time * press, distance needed
    # this should return 2 values that need to be `ceil` and `floor` to get the range
    raw = data.split("\n") # split input in to 2 rows
    times = map(int, (re.findall(r"(\d+)", raw[0])))  # get time units
    distance = map(int, (re.findall(r"(\d+)", raw[1])))  # get distance units
    total = 1  # starting total at 1 since multiplication
    for t, d in zip(times, distance):
        low = (t - math.sqrt((t) ** 2 - (4 * d))) / (2)  # quadratic equation lower bound
        high = (t + math.sqrt((t) ** 2 - (4 * d))) / (2)  # quadratic equation upper bound
        low = (int(low) + 1) if low % 1 == 0 else math.ceil(low)  # if 10.0, make 11. Else, round up to next digit. Needed as otherwise it "matches" the distance, but we want to beat the record.
        high = (int(high) - 1) if high % 1 == 0 else math.floor(high)  # if 10.0, make 9. Else, round down to digit.  
        delta = high - low + 1  # we want the difference but it is inclusive, so need to add 1
        total = total * delta  # multiply the delta times current total to get all the possible values.
        # print(low, t, d)
    return total


def part2(data):
    # for this one we get 1 massive race, so need to use the same math to get the value
    raw = data.split("\n")  # split input in to 2 rows
    raw[0] = raw[0].replace(' ', '')
    raw[1] = raw[1].replace(' ', '')

    times = map(int, (re.findall(r"(\d+)", raw[0])))  # get time units
    distance = map(int, (re.findall(r"(\d+)", raw[1])))  # get distance units
    total = 1  # starting total at 1 since multiplication
    for t, d in zip(times, distance):
        low = (t - math.sqrt((t) ** 2 - (4 * d))) / (2)  # quadratic equation lower bound
        high = (t + math.sqrt((t) ** 2 - (4 * d))) / (2)  # quadratic equation upper bound
        low = (int(low) + 1) if low % 1 == 0 else math.ceil(low)  # if 10.0, make 11. Else, round up to next digit. Needed as otherwise it "matches" the distance, but we want to beat the record.
        high = (int(high) - 1) if high % 1 == 0 else math.floor(high)  # if 10.0, make 9. Else, round down to digit.  
        delta = high - low + 1  # we want the difference but it is inclusive, so need to add 1
        total = total * delta  # multiply the delta times current total to get all the possible values.
        # print(high, low, t, d)
    return total

if __name__ == "__main__":
    start_time = time.time()
    textInput = readInFile(fName="inputtest")
    print(f"Part1: {part1(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
    start_time = time.time()
    textInput = readInFile(fName="input")
    print(f"part2: {part2(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")
