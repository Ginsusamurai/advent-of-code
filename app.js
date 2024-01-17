const angles = "><<><"

const solution = (angles) => {
    let openCount = 0
    let additionalOpenTags = 0
    for(const char of angles){
        if(char === '>'){
            if(openCount === 0){
                additionalOpenTags += 1
            } else {
                openCount -= 1;
            }
        }else{
            openCount += 1
        }
    }
    return '<'.repeat(additionalOpenTags) + angles + '>'.repeat(openCount)

};


console.log(solution(angles))