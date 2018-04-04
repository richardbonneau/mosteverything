function square(x) {
    return x * x;
}

function decrement(x) {
    return x - 1;
}

function duplicateString(x) {
    return x.concat(x);
}
function reverseString(str) {
  var splitString = str.split(""); // var splitString = "hello".split("");
 
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
 
    return reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    
}
// Expand each of the following and get the result of the expression
// #1
square(decrement(square(decrement(3))))

var a = decrement(3);
var b = square(a);
var c = decrement(b);
var d = square(c);

console.log(d)
// #2
decrement(decrement(square(square(3))))

var e = square(3);
var f = square(e);
var g = decrement(f);
var h = decrement (g);

console.log(h);
// #3
console.log(duplicateString(reverseString("hello")))

var i = reverseString("hello");
var j = duplicateString(i);

console.log(j);
// #4
console.log(reverseString(duplicateString(duplicateString("foo"))))
var k = duplicateString("foo");
var l = duplicateString(k);
var m = reverseString(l);

console.log(m)
