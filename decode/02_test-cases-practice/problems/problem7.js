var assert = require('assert');

// we need 7 test cases. 
let inputs = [
    ["foo", 2],
    ["fat", 8],
    ["ok", "cat"],
    ["storm", 1],
    ["prison", -3],
    ["bottle", 3],
    ["seven", 2] 
]

let outputs = [
    "foofoo",
    "fatfatfatfatfatfatfatfat",
    undefined,
    "storm",
    undefined,
    "bottlebottlebottle",
    "sevenseven"
]

/*
Make this function return the input string repeated as many times as specified. 
If a negative number or zero is specified, return an empty string. 
If any invalid parameters are supplied return undefined.

For example:

f(["foo", 3]) // "foofoofoo"
f(["fo", 3]) // "fofofo"
f(["foo", -1]) // undefined
*/
function f(arr) {
    if(typeof(arr[1])!="number" || arr[1]<=0) {
        return undefined
    }else {
        var tmp = "";
        for(var i=0; i<arr[1]; i++) {
            tmp += arr[0];
        }
        return tmp;
    }
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
runTest(5);
runTest(6);

