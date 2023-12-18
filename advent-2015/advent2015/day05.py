#!/usr/bin/env python3
import csv
import re

if __name__ == "__main__":
    with open("inputs/day05input.csv", newline='') as f:
        reader = csv.reader(f)
        stringList = list(reader)

    niceStrings = set()
    advancedNiceStrings = set()

    for string in stringList:

        # rule1 -> at least 3 vowels -> letter in a range, then one or more other characters, then letter in range,
        # and repeat
        # rule2 -> at least a pair of repeating letters (xx) -> capture of any character and then a loop back to that
        # same capture group
        # rule3 -> does not contain a subset of letter pairs -> NOT in array of forbidden
        if re.search(r"[aeiou].*[aeiou].*[aeiou]", string[0]) \
                and re.search(r"(.)\1", string[0]) \
                and not re.search("(ab|cd|pq|xy)", string[0]):
            niceStrings.add(string[0])


        # rule1 -> pair of repeating letters with at least 1 other letter between (xyabvxy)
        # capture must be 2 word characters, any number of other characters,loop back on capture
        # rule2 -> 2 identical letters with 1 other letter between (hvh)
        # capture of a single character in range, single in range, loop back on capture (this implies anything between
        # is valid
        if re.search(r"(\w{2}).*(\1)", string[0])\
                and re.search(r"([a-z])[a-z]\1", string[0]):
            advancedNiceStrings.add(string[0])

    print("Day05.1 -> There are {} nice strings.".format(len(niceStrings)))
    print("Day05.2 -> There are {} nice strings in the advanced filter.".format(len(advancedNiceStrings)))
