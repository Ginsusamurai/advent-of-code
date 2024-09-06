const assert = require('assert');
var fs = require('fs');
var input = fs.readFileSync('day02Input.txt').toString().split(",");

function opCodeProcessor(data){
    
    _data = data;
    var answer = [];
    // console.log(data);
    for(var codeBlock = 0; codeBlock < _data.length; codeBlock += 4){
        var num1 = _data[codeBlock+1];
        var num2 = _data[codeBlock+2];
        var affectedIndex = _data[codeBlock+3];

        // console.log(data[codeBlock]);
        // console.log(num1);
        // console.log(num2);
        // console.log(affectedIndex);

        if(_data[codeBlock] == 99){
            // console.log('end program');
            // console.log(data);
            answer = _data;
            return answer;
        }else if(_data[codeBlock] == 1){
            var result = _data[num1] + _data[num2];
        }else if(data[codeBlock] == 2){
            var result = _data[num1] * _data[num2];
        }else{
            console.log('we have an issue');
        }
        // console.log('index :'+ affectedIndex + " result " + result);
        // console.log(data[affectedIndex]);
        _data[affectedIndex] = result;
        
        
    }
    
}

// function findNum(data){

//     for(var y = 0; y< data.length; y += 4){
//         if(data[y] == 99){
//             return;
//         }else if(data[y] == 1){
//             var result = data[y+1] + data[y+2]
//         }
//     }
// }


function part2(expected, sourceArray) {
    

    //var _array = sourceArray;
    for(let noun = 0; noun < 100; noun++){
        for(let verb = 0; verb < 100; verb++){
            let _array = [];
            _array = sourceArray;
            _array[1] = noun;
            _array[2] = verb;
            console.log(_array);
            let resultArray = opCodeProcessor(_array);

            if(resultArray[0] == expected){
                return result;
            }
        }
    }


  }


var opresult = (opCodeProcessor([1,0,0,0,99]))
assert.deepEqual(opresult, [2,0,0,0,99], 'test 1');
var opresult = (opCodeProcessor([2,3,0,3,99]))
assert.deepEqual(opresult, [2,3,0,6,99], 'test 2');
var opresult = (opCodeProcessor([2,4,4,5,99,0]))
assert.deepEqual(opresult, [2,4,4,5,99,9801], 'test 3');
var opresult = (opCodeProcessor([1,1,1,4,99,5,6,0,99]))
assert.deepEqual(opresult, [30,1,1,4,2,5,6,0,99], 'test 4');


for(var x = 0; x < input.length; x++){
    input[x] = Number(input[x]);
}

var _input = input;

input[1] = 12;
input[2] = 2;

console.log(_input);

var bigArray = opCodeProcessor(input);

console.log("Part1 Answer: " + bigArray[0]);

//console.log(input);
  
console.log("answer Part2: " + part2(19690720, _input));