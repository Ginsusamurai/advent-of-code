import time
import re


def readInFile(fName):
    with open(f"{fName}.txt", "r", encoding="utf8") as f:
        f = f.read()
        return f


def part1(data):
    segments = data.split('\n\n')  # break input in to "chunks" for each mappping
    # print(segments)
    seeds = re.findall(r'\d+', segments[0])  # get just the starting seed values
    # print(seeds)
    min_location = float('inf')  # final answer is a float so it's big enough to hold the full value
    for x in map(int, seeds):   # casts `seeds` list to `int` value
        for seg in segments[1:]:  # look at each "chunk" after the first
            # print('----')
            print(seg)
            for conversion in re.findall(r'(\d+) (\d+) (\d+)', seg):  # find all the 3-number sets in each chunk. Returns a LIST of matches, which are also a list due to capture
                destination, start, delta = map(int, conversion)  # map the list of inputs, cast to int.
                if x in range(start, start + delta):    # make a range of the initial value (middle column) to (middle + delta), and check value
                                                        # starting with the seed `x`
                                                        # open up a segement
                                                        # go through each row of a segement 
                                                        # check if your starting value is present
                                                        # if present, re-write `x` to be the next value in the chain
                                                        # break (which jumps to next segment)
                                                        # begin looking for updated value in the next segment

                    x += destination - start
                    break
        min_location = min(x, min_location)  # after all segment checks are done, store smaller of "end value" and "last saved end value"

    return min_location


# def part2(data):
#     segments = data.split('\n\n')  # break input in to "chunks" for each mappping
#     # print(segments)
#     intervals = []  # make a list
#     for seed in re.findall(r'(\d+) (\d+)', segments[0]):  # get just the starting seed values
#         start, delta = map(int, seed)  # map the seed strings to int x1 is start, x2 is delta
#         end = start + delta  # create high range, which is x1 + delta
#         intervals.append((start, end, 1))  # create a tuple of (start, end, 1). `1` is the current "depth" of the search. Ends at 8.
#     print(intervals)
    
#     min_location = float('inf')  # final answer is a float so it's big enough to hold the full value
    
#     while intervals:  # loop through list until no more intervals exist. This empties as each is 'pop'd as this loops
#         input_start, input_end, level = intervals.pop()  # remove a tuple from list
#         if level == 8:
#             min_location = min(input_start, min_location)  # get lowest of last recorded and current value
#             continue   # keep going through `intervals`

#         for conversion in re.findall(r'(\d+) (\d+) (\d+)', segments[level]):  # each "chunk" of the mappings corresponds to a level
#             conversion_start, output_start, output_delta = map(int, conversion)  # get values for start, change, delta set to int
#             output_end = output_start + output_delta  # get the upper limit of the mapping (y1 -> y2 range)
#             diff = conversion_start - output_start  # difference between destination (left) and source (right)
#             if input_end <= output_start or output_end <= input_start:  # no overlap, go to next instance
#                 continue
            
#             if input_start < output_start:  # if the 
#                 intervals.append((output_end, input_end, level))
#                 input_start = output_start

#             if output_end < input_end:
#                 intervals.append((output_end, input_end, level))

#             intervals.append((input_start+diff, input_end + diff, level + 1))
#             break
#         else:
#             intervals.append((input_start, input_end, level+1))

#     return min_location

def part2(puzzle_input):
    segments = puzzle_input.split('\n\n')  # break in to segments
    intervals = []  # this is the list of range tuples that will be checked

    for seed in re.findall(r'(\d+) (\d+)', segments[0]):  # this gets the seeds and makes them in to ranges
        start, delta = map(int, seed)  # a seed has a start and a delta, which are cast to int
        end = start + delta  # get the upper range of the value
        intervals.append((start, end, 1))   # add a "level" out of 8 for where the data is to show how much it has been processed

    min_location = float('inf')
    iteration_count = 0
    while intervals:
        input_start, input_end, level = intervals.pop()
        if level == 8:
            min_location = min(input_start, min_location)
            continue

        for conversion in re.findall(r'(\d+) (\d+) (\d+)', segments[level]):
            # iteration_count += 1
            output_start, conversion_start, conversion_delta = map(int, conversion)
            conversion_end = conversion_start + conversion_delta
            diff = output_start - conversion_start
            if input_end <= conversion_start or input_start >= conversion_end:    # no overlap, input is outside this range, skip to next
                continue
            if input_start < conversion_start:  # Make a tuple of the input up until the next "conversion" range
                intervals.append((input_start, conversion_start, level))  # new tuple to process later
                input_start = conversion_start  # bookend input_start from here
            if conversion_end < input_end:                 # smake a tuple of the input from end of "conversion" range
                intervals.append((conversion_end, input_end, level))  # new tuple of range after the "conversion" range
                input_end = conversion_end  # bookend input_end from here
            intervals.append((input_start + diff, input_end + diff, level + 1))  # make a new tuple that exists solely within the "conversion" range, 
                                                                                # that has the input_start + the offset, same for input_end, increase level
            break   # end the loop

        else:  # if there isn't a segment to go through
            # iteration_count += 1

            intervals.append((input_start, input_end, level + 1))   # append a tuple of the starting values but increase the level
            # This should imply that there is no matching conversion, so it's "falling through" directly to the next level
    # print(iteration_count)
    return min_location

if __name__ == "__main__":
    # start_time = time.time()
    # textInput = readInFile(fName="input")
    # print(f"Part1: {part1(textInput)}")
    # print(f"--- {(time.time() - start_time)*1000} ms")
    start_time = time.time()
    textInput = readInFile(fName="input")
    print(f"part2: {part2(textInput)}")
    print(f"--- {(time.time() - start_time)*1000} ms")