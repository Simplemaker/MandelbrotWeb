

//Iterates over cosinesums until C reaches an identity (light shading), passes the maximum threshold (dark shading), or duration is met (black)
function evaluate(C, duration, initN, escape, args){
  cosineSet = parseCosArgs(args)
  var i = 0
  var lastC = [0, 0]
  var breakIdentity = false
  while ((i < duration && abs2(C) <= max_thresh) && !breakIdentity && !isNaN(C[0]) && !isNaN(C[1])) {
    //Now multiply the factor by c
    lastC = C
    C = iterCosSum(C, cosineSet)
    breakIdentity = complexDistance(lastC, C) <= identity_thresh
    i++
  }
  if (i < duration) {
    if (isNaN(C[0]) || isNaN(C[1])) {
      if (visualize_nan) { return 3+(i - 1) / duration; }
    } else if (abs2(C) > max_thresh) {
      if (visualize_max) { return 3+(i - 1) / duration; }
    } else {
      //Stabilizations return bright rainbows
      return (i - 1) / duration
    }
  }
  return 2
}

//Important cosineSum constants
//Max thresh regulates magnitude
max_thresh = 1e2
//Max distance to determine identity
identity_thresh = 1 / 1e4
//Control display behavior of different states
visualize_nan = false
visualize_max = true


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


//Determine the absolute distance between two complex numbers
function complexDistance(C1, C2) {
  var dx = C2[0] - C1[0]
  var dy = C2[1] - C1[1]
  return Math.sqrt(dx * dx + dy * dy)
}

//returns the product of C and the cosine-sum of C
function iterCosSum(C, cosineSet) {
  var factor = [0, 0]
  for (var f = 0; f <
  cosineSet[0].length; f++) {
    var alpha =
    cosineSet[0][f]
    var beta =
    cosineSet[1][f]
    var theta = multiplyC(C, [beta * Math.PI, 0])
    var cosValue = cCos(theta)
    var summand = multiplyC(cosValue, [alpha, 0])
    factor = addC(summand, factor)
  }
  //Now multiply the factor by c
  return multiplyC(C, factor)
}


//returns a float based on a fraction string
function parseFrac(fs){
  var parts = fs.split('/')
  if(parts.length > 2 || parts.length == 0){
    return NaN
  }
  var num = parseFloat(parts[0])
  var den = parseFloat(parts[1])
  if(isNaN(num)){
    return NaN
  }
  if(isNaN(den)){
    return num
  }
  return num/den
}

//interprets a list of length 2N of fractions as two N-tuples, representing a set of magnitudes and frequencies of cosine waves
function parseCosArgs(arglist){
  if(arglist.length < 2 || arglist.length % 2 != 0){
    return [[1],[1]]
  }
  var tempCosSet = [[],[]]
  var tuplicity = arglist.length / 2
  for(var i=0; i<tuplicity; i++){
    var alpha = parseFrac(arglist[i])
    var beta = parseFrac(arglist[i+tuplicity])
    if(isNaN(alpha) || isNaN(beta)){
      return
    }
   tempCosSet[0].push(alpha)
   tempCosSet[1].push(beta)
  }
  return tempCosSet
}