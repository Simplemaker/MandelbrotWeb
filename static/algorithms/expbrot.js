
function evaluate(C, duration, initN, escape, args){
  val = parseFloat(args[0])
  var currentExponent = isNaN(val) ? 2 : val
  N = initN;
  var i = 0;
  while(i<duration && abs2(N)<=escape){
    N = iterateC(N, C, currentExponent)
    i++;
  }
  if(i<duration){
    return (i-1)/duration
  }else{
    return 2
  }
}
