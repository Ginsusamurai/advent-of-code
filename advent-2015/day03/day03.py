#!/usr/bin/env python3
import csv
from day01 import splitter
import json




if __name__ == "__main__":
    with open("inputs/day03input.csv", newline='') as f:
        reader = csv.reader(f)
        packages = splitter(list(reader)[0][0])

    # print(len(packages))

    gifted = set()
    teamGifted = set()
    santa = [0,0]
    realSanta = [0,0]
    roboSanta = [0,0]
    gifted.add(json.dumps(santa))
    teamGifted.update({json.dumps(realSanta), json.dumps(roboSanta)})

    for step in packages:
        if step == "<":
            santa[0] -= 1
        elif step == ">":
            santa[0] += 1
        elif step == "^":
            santa[1] += 1
        elif step == "v":
            santa[1] -= 1

        gifted.add(json.dumps(santa))

    for ind, step in enumerate(packages, 0):

        if ind % 2 == 0:
            listener = roboSanta
        else:
            listener = realSanta

        if step == "<":
            listener[0] -= 1
        elif step == ">":
            listener[0] += 1
        elif step == "^":
            listener[1] += 1
        elif step == "v":
            listener[1] -= 1



        teamGifted.update({json.dumps(realSanta), json.dumps(roboSanta)})



    print("Day03.1 -> Santa gave {} households at least 1 toy.".format(len(gifted)))
    print("Day03.2 -> Santa and Robot gifted {} houses at least 1 toy together".format(len(teamGifted)))
