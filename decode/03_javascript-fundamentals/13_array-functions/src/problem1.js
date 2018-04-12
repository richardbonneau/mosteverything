// You are not allowed to use a for loop or a while loops for any of these questions. Instead, use filter, map, etc...

function removeEvens(lst) {
    // lst is an array of numbers
    // Returns a new list with all the even numbers of lst removed
    return lst.filter(num => num%2==1);
}

function keepLong(lst) {
    // lst is an array of strings
    // Returns a new list with all the elements of lst that are length greater than 5
    return lst.filter(string => string.length > 5);
}

function greet(lst) {
    // lst is an array of strings
    // Adds "Hello " to every element of greet
    // For example: greet(["bob", "eric"]) returns ["Hello bob", "Hello eric"]
    return lst.map(str => str="Hello "+str);
}

function greetLong(lst) {
    // lst is an array of strings
    // Only greet people who's names have length at least 4.
    // Otherwise ignore them completely.
    // For example: greeLong(["bob", "daniel"]) returns ["Hello daniel"]
    var newArr = [];
    lst.map(str => {
      if(str.length>4) {
        newArr.push(str="Hello "+str);
      } 
    });
    return newArr;
}

function allLong(lst) {
    // lst is an array of strings
    // Returns true if every element of lst is of length at least 5. Otherwise returns false.
    return lst.every(str => str.length > 4);
}

module.exports = {removeEvens, keepLong, greet, greetLong, allLong};
