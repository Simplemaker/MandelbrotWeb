function evaluate(C, duration, initN, escape, args){
  C[1] = -C[1] //flip ship fractal
  var N = initN
  var i = 0;
  while (i < duration && abs2(N) <= escape) {
    N[0] = Math.abs(N[0])
    N[1] = Math.abs(N[1])
    N = square(N)
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