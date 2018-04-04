var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "hello world",
    "ALL YOUR BASE ARE BELONG",
    "tHe bAthRoom",
    "ok i understand",
    "five test cases"
]

let outputs = [
    "Hello World",
    "All Your Base Are Belong",
    "The Bathroom",
    "Ok I Understand",
    "Five Test Cases"
]

/*
Make this function return the input string, capitalized. You must use a for loop. For example:

f("hello world"); // Hello World
f("ALL YOUR BASE ARE BELONG"); // All Your Base Are Belong

*/
function f(str) {
    str = str.toLowerCase();
    var tmpArr = [];
    tmpArr=str.split(" ");
    for(var i=0; i<tmpArr.length; i++) {
        tmpArr[i]=tmpArr[i].split("");
        tmpArr[i][0]=tmpArr[i][0].toUpperCase();
        tmpArr[i]=tmpArr[i].join();
        tmpArr[i] = tmpArr[i].replace(/,/g,"");
        //console.log(tmpArr[i])
    }
    str=tmpArr.toString();
    str = str.replace(/,/g, " ");
    console.log(str)
    return str;
}

function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    var actual = f(inputs[i]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

