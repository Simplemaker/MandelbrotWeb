
function filter(d, params){
  base = parseFloat(params[0])
  if (d > 1) {
    return d
  }
  while(d>(base-1)/base){
    d=base*(d-(base-1)/base)
  }
  return base*d/(base-1)
}