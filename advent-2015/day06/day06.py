#!/usr/bin/env python3
import csv
import json

def buildGrid():

    lightMap = dict()
    for x in range(0, 1000):
        for y in range(0, 1000):
            key = str(x) + 'x' + str(y)
            lightMap[key] = False

    return lightMap

def flipper(command, start,end, dict):

    for x in range(start[0], end[0]+1):
        for y in range(start[1], end[1]+1):
            key = str(x) + 'x' + str(y)
            # print('blah', key)
            # helper.append(key)
            if command == 'toggle':
                dict[key] = not dict[key]
            elif command == 'on':
                dict[key] = True
            else:
                dict[key] = False

    # print('helper', helper)

def dimmer(command, start,end, dict):

    for x in range(start[0], end[0]+1):
        for y in range(start[1], end[1]+1):

            key = str(x) + 'x' + str(y)
            # print('blah', key)
            # helper.append(key)

            if dict[key] == False:
                dict[key] == 0

            if command == 'toggle':
                dict[key] += 2
            elif command == 'on':
                dict[key] += 1
            else:
                dict[key] -= 1

            if dict[key] < 0:
                dict[key] = 0

    # print('helper', helper)

if __name__ == "__main__":
    f = open("inputs/day06input.txt", 'r')
    lightInstructions = list(f)

    lightGrid = buildGrid()
    brightGrid = lightGrid.copy()

    cleanInstructions = [i.replace("\n", "") for i in lightInstructions]
    splitInstructions = [i.split(" ") for i in cleanInstructions]
    # finalInstructions = []

    for i, val in enumerate(splitInstructions):
        if val[0] == 'toggle':
            first = val[1].split(',')
            last = val[3].split(',')
            command = val[0]
        else:
            first = val[2].split(',')
            last = val[4].split(',')
            command = val[1]

        start = [int(first[0]), int(first[1])]
        end = [int(last[0]), int(last[1])]

        flipper(command, start, end, lightGrid)
        dimmer(command, start, end, brightGrid)
        # finalInstructions.append([command, start, end])

    lightCount = 0
    brightnessTotal = 0

    for key in lightGrid:
        if lightGrid[key] == True:
            lightCount += 1
        brightnessTotal += brightGrid[key]

    print("Day06.1 -> There are {} total lights on.".format(lightCount))
    print("Day06.2 -> The total combined brightness is {}".format(brightnessTotal))

