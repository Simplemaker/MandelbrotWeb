
function cSine(C) { //returns the sine of a complex value
  var a = C[0]
  var b = C[1]
  var r = Math.sin(a) * Math.cosh(b)
  var c = Math.cos(a) * Math.sinh(b)
  return [r, c]
}

function cCos(C) { //Returns the complex cosine of a value
  var a = C[0]
  var b = C[1]
  var r = Math.cos(a) * Math.cosh(b)
  var c = -Math.sin(a) * Math.sinh(b)
  return [r, c]
}

// Original version of iteration
function iCollatz(C) {
  var a = multiplyC(C, [0.5, 0])
  var b = addC([1, 0], multiplyC(C, [5 / 2, 0]))
  var s = square(cSine(multiplyC([Math.PI / 2, 0], C)))
  return addC(a, multiplyC(b, s))
}

function evaluate(C, duration, initN, escape, args){
  //console.log(C)
  var N = C
  var i = 0;
  while (i < duration && abs2(N) < 10000) {
    //console.log(abs2(N))
    N = iCollatz(N)
    i++;
  }
  if (abs2(N) <= 5) {
    return 2
  } else {
    return i / duration
  }
}
