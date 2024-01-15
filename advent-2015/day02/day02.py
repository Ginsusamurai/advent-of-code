#!/usr/bin/env python3
import csv




def returnNum(character):
    return int(character)



if __name__ == "__main__":

    with open("inputs/day02input.csv", newline='') as f:
        reader = csv.reader(f)
        packages = list(reader)

    #Day02.1
    totalFeet = 0
    ribbon = 0
    for dimensions in packages:
        areas = []
        raw = dimensions[0].split('x')
        lwh = list(map(lambda x: int(x), raw))
        lwh.sort()

        ribbon = ribbon + (2 * lwh[0] + 2 * lwh[1]) + lwh[0] * lwh[1] * lwh[2]

        areas.append(2 * lwh[0] * lwh[1])
        areas.append(2 * lwh[1] * lwh[2])
        areas.append(2 * lwh[0] * lwh[2])
        areas.sort()
        print(areas)
        totalFeet = totalFeet + sum(areas) + int(areas[0]/2)

    print("The Elves need a total of {} feet of paper".format(totalFeet))
    print("The Elves also need {} feet of ribbon".format(ribbon))