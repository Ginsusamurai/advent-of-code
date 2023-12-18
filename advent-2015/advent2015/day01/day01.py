#!/usr/bin/env python3

# This is a sample Python script.
import itertools
import csv
# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

def splitter(str):
    return [char for char in str]

def find_floor(str):
    print("Day01.1 -> Santa goes to floor {}".format(str.count('(') - str.count(')')))



def find_basement(steps):
    current = 0

    for ind, step in enumerate(steps, 0):
        # print(step, ind)
        if current == -1:
            print("Day01.2 -> Santa enters the basement on instruction {}".format(ind))
            return
        if step == '(':
            current = current + 1
        elif step == ')':
            current = current - 1






def enter_basement(str):
    # print(str)
    floor_instructions = splitter(str)
    # print(floor_instructions)
    find_basement(floor_instructions)



# Press the green button in the gutter to run the script.
if __name__ == '__main__':


    with open("inputs/day01input.csv", 'r') as f:
        reader = csv.reader(f, delimiter=" ")
        data = list(reader)
        data = data[0][0]


    # Day01 challenges
    day01input = data
    find_floor(day01input)
    enter_basement(day01input)






