function evaluate(N, duration, initN, escape, args){
  //Julia algorithm supports float exponents
  val = parseFloat(args[0])
  var currentExponent = isNaN(val) ? 2 : val
  
  var C = initN
  var i = 0;
  while (i < duration && abs2(N) <= escape) {
    N = fractionalPow(N, currentExponent)
    N[0] += C[0]
    N[1] += C[1]
    i++;
  }
  if (i < duration) {
    return (i - 1) / duration
  } else {
    return 2
  }
}