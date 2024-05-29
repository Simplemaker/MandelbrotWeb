function toColor(duration, params){
  if(duration == 2){
    return [0,0,0,255]
  }
  colorList = getColors(params)
  color1 = [0, 255, 238]
  color2 = [105, 255, 190]
  color3 = [181, 77, 255]
  return polyBlend(duration, colorList)
}

function polyBlend(d, colorList){
  var period = 1/colorList.length
  var section = 0;
  while(d>=period){
    section = (section+1)%colorList.length
    d -= period
  }
  d *= colorList.length
  var section2 = (section+1)%colorList.length
  return colorBlend(colorList[section], colorList[section2], d)
}

//Blend two colors based on a weight [0,1]
function colorBlend(C1, C2, blend){
  var c1mult = Math.pow(Math.cos(blend * Math.PI / 2), 2)
  var c2mult = 1 - c1mult
  var cout = []
  for(var c=0; c<C1.length; c++){
    cout.push(C1[c]*c1mult + C2[c]*c2mult)
  }
  cout.push(255) // add opaque
  return cout
}

function getColors(hexes){
  var out = []
  for(var h=0; h<hexes.length; h++){
    var hex = hexes[h]
    var r = parseInt(hex.slice(1,3), 16)
    var g = parseInt(hex.slice(3,5), 16)
    var b = parseInt(hex.slice(5,7), 16)
    out.push([r,g,b])
  }
  return out
}