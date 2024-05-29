
function multiplyC(N1, N2){
   var real = N1[0]*N2[0]-N1[1]*N2[1]
   var imag = N1[0]*N2[1]+N1[1]*N2[0]
   return [real, imag]
}

function hadamardC(N1, N2){
  return [N1[0]*N2[0], N1[1]*N2[1]]
}

function divideC(N1, N2){
  //Legacy log version
  //return expC(subC(logC(N1), logC(N2)))
  var real = (N1[1]*N2[1] + N1[0]*N2[0])/(N2[1]*N2[1] + N2[0]*N2[0])
  var imag = (N1[1]-real*N2[1])/N2[0]
  return [real, imag]
}

function addC(N1, N2){
  var real = N1[0]+N2[0]
  var imag = N1[1]+N2[1]
  return [real,imag]
}

function subC(N1, N2){
   var real = N1[0]-N2[0]
  var imag = N1[1]-N2[1]
  return [real,imag]
}

function square(N){
  //This line takes the complex square of N
  //legacy definition
  //return [N[0]*N[0]-N[1]*N[1] ,2*N[0]*N[1]];
  return multiplyC(N, N)
}

function cube(N){
  //returns the complex cube of N
  return multiplyC(multiplyC(N,N),N)
}

function powC(N, pow){
  var it = [1,0]
  for(var i = 0; i<pow; i++){
    it = multiplyC(it, N)
  }
  return it
}

function logC(N){
  var theta = Math.atan2(N[1],N[0])
  var mag = 1/2*Math.log(N[0]*N[0]+N[1]*N[1])
  return [mag, theta]
}

function expC(N){
  var theta = N[1]
  var mag = Math.exp(N[0])
  return [mag*Math.cos(theta), mag*Math.sin(theta)]
}

function fractionalPow(N, pow){
  theta = Math.atan2(N[1],N[0])
  d1 = Math.sqrt(N[1]*N[1]+N[0]*N[0])
  d2 = Math.pow(d1, pow)
  real = d2*Math.cos(theta*pow)
  imag = d2*Math.sin(theta*pow)
  return [real, imag]
}

function iterateC(N, C, currentExponent){
  //N and C are complex numbers [a,b] representing a+bi
  n2 = fractionalPow(N, currentExponent)
  //These lines add a C Value
  n2[0]+=C[0];
  n2[1]+=C[1];
  return n2
}

function abs2(N){
  return Math.sqrt(N[0]**2+N[1]**2);
}

function compress(N){
  var abs = abs2(N)
  var theta = Math.atan2(N[1],N[0])
  abs = Math.tan(abs)
  return [abs * Math.cos(theta), abs * Math.sin(theta)]
}