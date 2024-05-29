//Concept credit to CodeParade

function evaluate(C, duration, initN, escape, args){
  val = parseFloat(args[0])
  N = initN;
  var i = 0;
  while(i<duration && abs2(N)<=escape){
    var cube = powC(N, 3)
    var dp = addC(hadamardC(N,N),[1,0])
    N = addC(divideC(cube, dp), C)
    i++;
  }
  if(i<duration){
    return (i-1)/duration
  }else{
    return 2
  }
}
