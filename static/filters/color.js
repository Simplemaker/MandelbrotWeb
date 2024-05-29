function toColor(d, params){

  //generates a hue based on d in [0,1] u 2 u [3,inf]
  //returns black if d == 2
  //returns a darker shade of the colors for range [3, 4]

  color = [0, 0, 0, 255]
  if (d == 2) {
    return [0,0,0,255];
  }
  darkify = false
  if (d > 1){
    darkify = true
    d = d%1
  }
  if (d < 1 / 6) { //increasing red
    color[0] = Math.sin(Math.PI * 3 * d) 
    color[2] = 1
  }
  if (d >= 1 / 6 && d < 1 / 3) { //decreasing blue
    color[0] = 1
    color[2] = Math.sin(Math.PI * 3 * d)
  }
  if (d >= 1 / 3 && d < 1 / 2) { //increasing green
    color[0] = 1
    color[1] = -Math.sin(Math.PI * 3 * d)
  }
  if (d >= 1 / 2 && d < 2 / 3) { //decreasing red
    color[0] = -Math.sin(Math.PI * 3 * d)
    color[1] = 1
  }
  if (d >= 2 / 3 && d < 5 / 6) { //increasing blue
    color[2] = Math.sin(Math.PI * 3 * d)
    color[1] = 1
  }
  if (d >= 5 / 6) { //decreasing green
    color[2] = 1
    color[1] = Math.sin(Math.PI * 3 * d)
  }
  multiplier = darkify ? 128 : 255
    for(var i=0; i<3; i++){
      color[i] = color[i]*multiplier
    }
    return color
  
}