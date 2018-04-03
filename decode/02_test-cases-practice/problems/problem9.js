var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "the last one",
    "hello there",
    "bottle of wine",
    "server disconnect",
    "another string"
]

let outputs = [
    "last",
    "there",
    "bottle",
    "disconnect",
    "another"
]

/*
Make this function return the longest word in the input string. If the input string is empty then return an empty string.
If multiple words have the same length, return the last one that matches.
*/
function f(str) {
    var tempArr = str.split(" ");
    var wordWithMostChar = "";
    for(var i=0; i<tempArr.length; i++) {
        if(tempArr[i].length>=wordWithMostChar.length) {
            wordWithMostChar = tempArr[i];
        }
    }
    return wordWithMostChar;
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

