function toColor(duration, params){
  if(duration == 2){
    return [0,0,0,255]
  }else{
    var scale = 255*Math.pow(Math.cos(Math.PI * duration),2)
    return [scale, scale, scale, 255]
}
}