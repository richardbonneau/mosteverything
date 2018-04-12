var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    [[0, 1, 2, 3, 4], [1, 2, 3]],
    [[5, 8, 10, 11], [1, 2, 10]],
    [[1, 2, 3, 4]],
    [[1, 2, 3], [1, 2, 3]],
    [[1, 2],"string"]
]

let outputs = [
    [0, 4],
    [1, 2, 5, 8, 11],
    undefined,
    [],
    undefined
]

/*
Make this function return the elements that are unique to array1 and array2.
If there are no unique elements return an empty array.
If the inputs are anything other than arrays, return undefined. 
For example:
uniqueElements([[0,1,2,3], [1,3,4,5]]); // [0,4,5]
uniqueElements([0,1,2,3], [1,3,4,5]); // [0,2,4,5]
uniqueElements([2,3]); // undefined, not arrays
*/
function f(arr1, arr2) {
    uniqueElements = []

   for ( var i = 0 ; i < arr1.length ; i++ ){
       if (arr2.indexOf(arr1[i]) === -1){        
           uniqueElements.push(arr1[i])
       }
   }

   for ( var i = 0 ; i < arr2.length ; i++ ){
       if (arr1.indexOf(arr2[i]) === -1){
           uniqueElements.push(arr2[i])
       }
   }
   
   console.log(uniqueElements)
   uniqueElements.sort()
   return uniqueElements
}

function runTest(i) {
	if (i > inputs.length) throw new Error('You do not have enough test cases');
	var expected = outputs[i];
	var input = inputs[i];
	var actual = f(input[0], input[1]);
	assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

console.log("test cases passed");