var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "Frankness applauded by supported ye household. Collected favourite now for for and rapturous repulsive consulted",
    "Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam",
    "Silent sir say desire fat him letter",
    "Am increasing at contrasted in favourable he considered astonished",
    "A car made his way to town"
]

let outputs = [
    "Frankness applauded by supported ye hous\nehold. Collected favourite now for for a\nnd rapturous repulsive consulted",
    "Lorem ipsumos dolor sit amet consectetur\nadipisicing elit. Magni quisquam",
    "Silent sir say desire fat him letter",
    "Am increasing at contrasted in favourabl\ne he considered astonished",
    "A car made his way to town"
]
/*
Make this function return the input string wrapped to 40 characters 
per line. 
This means you'll have to insert a newline \n character after every 
40 characters in the input string. 
If the next character after a cut is a space, then do not display it. 

For example with the input:

Lorem ipsumos dolor sit amet consectetur adipisicing elit. Magni quisquam

the output would be:

Lorem ipsumos dolor sit amet consectetur
adipisicing elit. Magni quisquam

instead of:

Lorem ipsumos dolor sit amet consectetur
 adipisicing elit. Magni quisquam

 even though there is a space before the a in adipisicing
*/
function f(str) {
    //console.log(str)
    var tmpStr = "";
    for(var i=0; i<str.length;i++) {
        //console.log(tmpStr)
        if(i%40===0&&i!=0) {
            //console.log(i)
            if(str.charAt(i)===(" ")) {
                //console.log("next character is a space")
                tmpStr=tmpStr.concat("\n")
            }else {
                tmpStr=tmpStr.concat("\n")
                tmpStr=tmpStr.concat(str[i])
            }
        }else {
            tmpStr=tmpStr.concat(str[i])
        }
    }
//console.log(str)
//console.log(tmpStr)
str=tmpStr;
return str 
}
console.log(inputs[3])
console.log(outputs[3])

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

