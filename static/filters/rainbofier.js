//One parameter filter
//changes rainbow/gradient rate
function filter(d, params) {
  r = parseFloat(params[0])
  if (d > 1) {
    return d
  }
  return (d * r) % 1
}
