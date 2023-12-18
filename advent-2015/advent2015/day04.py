#!/usr/bin/env python3
import csv
import re
import json
import hashlib





if __name__ == "__main__":
    with open("inputs/day04input.csv", newline='') as f:
        reader = csv.reader(f)
        key = list(reader)[0][0]

    print("Brute Forcing...please wait")
    #input the key and a number in decimal
    #add key to numbers and cycle through until hash begins with 5 zeroes
    #answer is what number was input

    lowestInt = 0
    hash = key + json.dumps(lowestInt)

    while not re.search("^00000", hashlib.md5(hash.encode()).hexdigest()):
        lowestInt += 1
        hash = key + json.dumps(lowestInt)

    print("Day04.1 -> The Number {} matches the hash requirement of 5 leading zeroes.".format(lowestInt))
    print("Next step may take longer...")


    lowestInt = 0
    for i in range(9900000, 10000000): #narrowed the range for faster run time
        print(i)
        hash = key + json.dumps(i)
        if re.search("^000000", hashlib.md5(hash.encode()).hexdigest()):
            lowestInt = i
            break


    print("Day04.2 -> The number {} matches the hash requirement of 6 leading zeroes.".format(lowestInt))