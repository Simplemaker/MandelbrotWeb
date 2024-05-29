function evaluate(C, duration, initN, escape, args){
  var arglist = parseArgs232(args)
  var N = initN
  var i = 0;
  var s = arglist.length - 1;
  while (i < duration && abs2(N) <= escape) {
    N = fractionalPow(N, arglist[s])
    N[0] += C[0]
    N[1] += C[1]
    i++;
    s = (s + 1) % arglist.length
  }
  if (i < duration) {
    return (i - 1) / duration
  } else {
    return 2
  }
}


function parseArgs232(argstrings) {
  var vals = []
  for (var i = 0; i < argstrings.length; i++) {
    var val = parseFloat(argstrings[i])
    if (!(isNaN(val))) {
      vals.push(val)
    }
  }
  return vals
}
