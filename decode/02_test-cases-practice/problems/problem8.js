var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "hi",
    "how are you",
    "test case",
    "kitty",
    "graphics"
]

let outputs = [
    "ih",
    "uoy era woh",
    "esac tset",
    "yttik",
    "scihparg"
]

/*
Make this function return the input string, reversed. 
For example "hello" would return "olleh" and "how are you" would return "uoy era woh".
You must use a for loop for this exercise.
*/

function f(str) {
    var tmp = [];
    for(var i=0; i<str.length; i++) {
        tmp.unshift(str.charAt(i));
    }
    tmp = tmp.toString();
    tmp = tmp.replace(/,/g,"");
    return tmp;
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

