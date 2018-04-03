var assert = require('assert');

// we need 8 test cases. I've provided the first 2
let inputs = [
  ["hello", 4],
  ["", 2],
  ["cat", 1],
  ["frown", 0],
  ["bottle", 2],
  ["computer", 3],
  ["cute", 3],
  ["opera", 10]
]

let outputs = [
  "o",
  undefined,
  "a",
  "f",
  "t",
  "p",
  "e",
  undefined
]

/*
Make this function return the letter at the specified position in the string. 
If no such letter exists, it should return undefined.
For example:
f(["hello", 1]); // e
f(["", 4]); // undefined
f(["abc", 0]); // a
*/
function f(arr) {
  if(arr[0].length<arr[1]) {
    return undefined
  }else{
return arr[0].charAt(arr[1]);
}  
}

function runTest(i) {
    var expected = outputs[i];
    var input = inputs[i];
    var actual = f(input);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
runTest(5);
runTest(6);
runTest(7);
console.log("test cases passed");