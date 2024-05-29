
//frame counter for zoom animation
frame = 0
//frames per second of zoom transitions
fps = 30
//delay between fractals in seconds. total frames = fps*delay
delay = 1
//on while animating; do not 
calculatingState = false
animatingState = false


function wAverage(val1, val2, weight) {
  return val1 * (1 - weight) + val2 * (weight)
}

function zRender(bound1, bound2) {
  animatingState = true
  if (frame == 0) {
    ctx.putImageData(savedBrot, 0, 0); scaled = new Image(); scaled.src = c.toDataURL();
    render(); //start worker in alternative thread
  }
  if (frame < fps * delay) { //detects a zoom

    ratio = (frame + 1) / (fps * delay) //frame out of total frames
    // ratioX = c.width/(bound2[0]-bound1[0])
    // ratioY = c.height/(bound2[1]-bound1[1])
    // deltaX =  ratioX/(fps*delay)
    // deltaY = ratioY/(fps*delay)
    ctx.drawImage(scaled, wAverage(0, bound1[0], ratio), wAverage(0, bound1[1], ratio), wAverage(scaled.width, (bound2[0] - bound1[0]), ratio), wAverage(scaled.height, (bound2[1] - bound1[1]), ratio), 0, 0, c.width, c.height)

    frame += 1
    setTimeout(zRender, 1000 / fps, bound1, bound2);
  } else { //calculation occurs after zoom
    frame = 0;
    animatingState = false
    if (!calculatingState) {
      updateImage()
    }
  }
}
