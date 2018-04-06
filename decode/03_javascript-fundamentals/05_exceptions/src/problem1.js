function first(arr) {
    if(arr[0]==null) {
        throw "an exception"
    } else return arr[0];
    // Throw an exception if the array has no elements
    // Otherwise return the first element
}

function detective(i) {
    try {
      suspect(i)
  } catch(err) {
      console.log(err);
      return "something fishy";
  }
  function suspect(i) {
      if(i * 7 % 3 == 0) throw new Error("Bad i!");
  }
  return "everything ok"
}


function assignFlight(name) {
    var flightNumber = ((name.length * 7) % 20) + "0";
    var terrorSuspects = ["bob", "eric", "susie"];

    for(var i=0; i<terrorSuspects.length; i++) {
      if(name===terrorSuspects[i]) throw new Error("terror suspect trying to board")
      else return flightNumber;
      
    }

}

module.exports = {first, detective, assignFlight}