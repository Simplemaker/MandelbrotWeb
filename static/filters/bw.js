function toColor(duration){
  if(duration == 2){
    return [0,0,0,255]
  }else{
    var scale = 255 * (1-duration)
    return [scale, scale, scale, 255]
}
}