
function callNoException(f, arg) {
    try {
        f(arg);
    } catch(err) {
        return null;
    }
    return arg;
}
    // if f(arg) throws an exception, return null
    // otherwise return what f(arg) returned
    // Example:

    // if f(arg) throws an exception, return null
    // otherwise return what f(arg) returned
    // Example:
    //  function throwsZero(x){
    //     if(x==0) throw new Error("woops");
    //     return x;
    //  }
    //callNoException(throwsZero, 0); //returns null
    //callNoException(throwsZero, 12); //returns 12



function callNoNull(f, arg) {
    if(f(arg)===null) {throw new Error("exception msg")};
      // if f(arg) returns null, throw an exception
      // otherwise return what f(arg) returned  
    try {
      callNoNull(f(arg))
    }catch(err) {
      console.log(err)
    }
    return arg;
  }

  function exceptionalize(f) {
    return function(arg) {
      if(f(arg)===null)throw new Error("exception")
      else {
        return f(arg)
      }
    }
      
      // returns a new function
      // this function takes 1 input, called arg
      // if f(arg) is null, this new function throws an exception
      // otherwise it returns what f(arg) returned
      // difference with callNoNull: callNoNull doesn't return a function
  
  
  }

  function nullify(f) {
    return function g(arg) {
      try {
        f(arg);
      } catch(err) {
        return null;
      }
      return arg;
    }
  }

  function map(lst, f) {
    var tmpArr=[];
    for(var i = 0; i<lst.length; i++) {
       tmpArr.push(f(lst[i]));
  }
  return tmpArr;
  }

function filter(lst, f) {
    var tmpLst = [];
    for(var i=0; i<lst.length; i++) {
      if(f(lst[i])) {
        tmpLst.push(lst[i]);
      }
      console.log(tmpLst)
    }
    return tmpLst;
}  

function every(lst, f) {
    var numberOfBools = 0;
      for(var i = 0; i<lst.length; i++) {
        if(f(lst[i])) {
          numberOfBools+=1
        }
      }
      if(numberOfBools == lst.length) return true;
      else return false;
      
      // lst is an array and f is a function
      // f takes 1 arguments and returns a boolean
      // filter(lst, f) returns a true if f returns true for every element of lst
      
      // Example
      // every([2,4,12], x => x % 2 == 0) returns true
      // every([2,3,12], x => x % 2 == 0) returns false    
  }


module.exports = {
    callNoException, 
    callNoNull,
    exceptionalize, 
    nullify,
    map, 
    filter, 
    every
};
