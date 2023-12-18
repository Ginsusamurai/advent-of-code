#!/usr/bin/env python3

import re
from ctypes import *




gates = dict()

finishedGates = []

wire_re = re.compile(r"^[a-z]+$")

def is_wire(name):
    return (wire_re.match(name) is not None)

def parse_line(input):
    arr = input.split(' ')

    # return each line as output, operation, val1, val2
    if len(arr) == 3:
        return arr[2], 'SET', arr[0], None
    elif len(arr) == 4:
        return arr[3], 'NOT', arr[1], None
    else:
        return arr[4], arr[1], arr[0], arr[2]


class Gate(object):
    def __init__(self, name, operation, input1 = None, input2 = None):
        self.name = name
        self.operation = operation
        self.input1 = input1
        self.input2 = input2
        self.value1 = None
        self.result = None
        self.bits = None

        # 'set' requires only an input and a target, so input2 should be None
        # if input1 is not a wirename, cast it to an int
        if self.operation == "SET":
            assert input1 is not None
            assert input2 is None
            if not is_wire(input1):
                self.value1 = c_ushort(int(input1))
                finishedGates.append(self)

        # for a SHIFT, input1 should be a wire name. Assigns that value to the 'bits' property
        elif self.operation == "LSHIFT" or self.operation == "RSHIFT":
            assert is_wire(input1)
            self.bits = c_ushort(int(input2))

        # not operator only takes input 2 and give back the complement. confirms vals are in place
        elif self.operation == "NOT":
            assert input1 is not None
            assert input2 is None
            assert is_wire(input1)

        # and operator requires both inputs. assert input2 is wire and if input1 is not a wire, cast to int
        elif self.operation == "AND":
            assert input1 is not None
            assert input2 is not None
            assert is_wire(input2)
            if not is_wire(input1):
                self.value1 = c_ushort(input1)

        # or operator requires both inputs. assert input2 is wire and if input1 is not wire, cast to int
        elif self.operation == "OR":
            assert input1 is not None
            assert input2 is not None
            assert is_wire(input2)
            if not is_wire(input1):
                self.value1 = c_ushort(input1)

    def value(self):


        # on invoke, see if the result has been calculated yet
        if self.result is None:
            # depth += 1
            # if set op, check if value1 (only dependency) is populated. If so, set to result  (no recursion)
            # else, run the value method on the matching gate object from the dict (1 recursion)
            if self.operation == "SET":
                if self.value1 is not None:
                    self.result = c_ushort(int(self.value1))
                else:
                    self.result = c_ushort(gates[self.input1].value())

            # if not, run value() on input2, set complement (1 recursion)
            elif self.operation == "NOT":
                self.result = ~(c_ushort(gates[self.input1].value()))

            # if RSHIFT, run value() on input1 class, apply bit shift from input2 (1 recursion)
            elif self.operation == "RSHIFT":
                self.result = (gates[self.input1].value() >> self.bits)

            # if LSHIFT, run value() on input1 class, apply bit shift from input2 (1 recursion)
            elif self.operation == "LSHIFT":
                self.result = (gates[self.input1].value() << self.bits)

            # if value1 is populated then & with value() of result of input2 gate object (1 recursion)
            # else, run value on input1 gate object and & with input2 gate object value (2 recursions)
            elif self.operation == "AND":
                if self.value1 is not None:
                    self.result = (self.value1 & gates[self.input2].value())
                else:
                    self.result = (gates[self.input1].value() & gates[self.input2].value())

            # if value1 is populated, value1 | on value of input2 gate object (1 recursion)
            # else run value on input1 and input2 gate objects (2 recursion)
            elif self.operation == "OR":
                if self.value1 is not None:
                    self.result = (self.value1 | gates[self.input2].value())
                else:
                    self.result = (gates[self.input1].value() | gates[self.input2].value())

            # if depth > max_depth:
            #     max_depth = depth
            # depth -= 1
            # print(depth)

        return self.result



if __name__ == '__main__':

    global depth
    global max_depth

    with open("inputs/day07input.txt", 'r') as f:
        booklet = f.read()

    # print(booklet)

    q = c_ushort(-3)

    print('123', int('123'), q.value)
    print('not y', ~456)
    print(int("FF", 16))

    for line in booklet.splitlines():
        print(parse_line(line))
        name, op, input1, input2 = parse_line(line)
        print(name, op, input1, input2)
        if op is not None:
            gates[name] = Gate(name, op, input1, input2)



    for gate in gates.keys():
        print(gates[gate].value())

    for gate in gates.keys():
        print(gates[gate].name, gates[gate].result)

    # answer_a = gates["a"].value()
    #
    # print("Day07.1 -> Final bit of circuit 'a' is {}".format(answer_a))

    #lengths
    # 3: just set
    # 5: and/or/lshift/rshift
    # 4: not




