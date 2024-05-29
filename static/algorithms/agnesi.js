//Evaluates based on the Witch of Agnesi
function evaluate(C, duration, initN, escape, args){
  N = initN
  var i = 0;
  while(i<duration && abs2(N)<=escape){
    N = divideC(square(N), addC(square(N), [1,0]))
    N[0]+=C[0]
    N[1]+=C[1]
    i++;
  }
  if(i<duration){
    return (i-1)/duration
  }else{
    return 2
  }
}