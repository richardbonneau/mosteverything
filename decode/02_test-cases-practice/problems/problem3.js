var assert = require('assert');

// we need 7 test cases. I've provided 2.
let inputs = [
  [2, 4],
  [-3, 3],
  ["string",2],
  [3,7],
  [8,5],
  [1],
  [2,2]
]

let outputs = [
  6,
  0,
  undefined,
  10,
  13,
  undefined,
  4
]
/*
Make this function return the sum of the two numbers that are passed to it. If one of the numbers is not passed, or if anything other than numbers are passed, return undefined.
*/
function f(arr) {
  if(arr.length!=2) {
    return undefined
  }
  else if (typeof(arr[0])!="number"||typeof(arr[1])!="number") {
    return undefined;
  }
  else {
    return arr[0]+arr[1];
  } 
}

function runTest(i) {
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
console.log("test cases passed");