'use strict'
const { rejects } = require('assert')
const fs = require('fs')

fs.readFile('./input.txt', 'utf8', async (err, data) => {
    if (err) {
        console.log(err)
    }
    // console.log(data);
    // console.log(data)
    data = data.split('\n');
    console.log(Array.isArray(data));
    
    for(let i = 0; i < data.length; i++){
        data[i] = parseInt(data[i])
    }

    for(let outer = 0; outer < data.length; outer++){
        for(let inner = outer; inner < data.length; inner++){
            // console.log(data[inner] + data[outer])
            if(data[inner] + data[outer] == 2020){
                console.log(data[inner] * data[outer])
            }
        }
    }

    for(let outer = 0; outer < data.length; outer++){
        for(let inner = outer; inner < data.length; inner++){
            for(let last = inner; last < data.length; last++)
            // console.log(data[inner] + data[outer])
            if(data[inner] + data[outer] + data[last] == 2020){
                console.log(data[inner] * data[outer] * data[last])
            }
        }
    }
})


