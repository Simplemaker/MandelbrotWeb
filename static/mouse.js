clicked = 0;
bound1 = [0,0]
bound2 = [1,1]
mouseX = 0
mouseY = 0
mouseMode = 1

function toggleMouse(){
  mouseMode = (mouseMode+1)%3
  var modes = ["Disabled","Zoom","Capture N"]
  document.getElementById("mousemode").innerHTML ="Mouse: "+ modes[mouseMode]
}

function linearMap(xs, ys, x) {
  var yRange = ys[1] - ys[0]
  var xRange = xs[1] - xs[0]
  var scale = yRange / xRange
  return (x - xs[0]) * scale + ys[0]
}

function canvasScale(canvasBounds, varBounds, canvasCoords) {
  var out = []
  for (var i = 0; i < 2; i++) {
    out.push(linearMap(canvasBounds[i], varBounds[i], canvasCoords[i]))
  }
  return out
}

function equalish(b1, b2){
  var RANGE = 10
  var xish = Math.abs(b2[0]-b1[0])<RANGE
  var yish = Math.abs(b2[1]-b1[1])<RANGE
  return xish && yish
}

function mouseDown(e){
  mouse(1)
}

function mouseUp(e){
  mouse(0)
}

function mouse(click){ 
  if(mouseMode == 0){
    return 0
  }else if(mouseMode == 1){
      if(click){
    clicked = 1;
    bound1=[mouseX,mouseY]
    savedBrot = ctx.getImageData(0,0,c.width,c.height)
    //insert code for when mouse is pressed
  }else{
    clicked = 0;
    bound2=[mouseX,mouseY]
    if(equalish(bound1, bound2)){
      render()
      return
    }
    
    rescale(bound1, bound2); //function runs when mouse is lifted
  }
  }else if(mouseMode==2){
    if(click){
      bound = [mouseX,mouseY]
      b = canvasScale([[0, c.width], [c.height, 0]], brotObject.varBounds, bound)
      document.getElementById("initN").value = b
      setInitN()
      render()
    }
  }
}

function mouseDelta(event){
  var rect = event.target.getBoundingClientRect();
  mouseX=event.clientX-rect.left;
  mouseY=event.clientY-rect.top;
  var xRatio = c.width / c.clientWidth
  var yRatio = c.height / c.clientHeight
  mouseX *= xRatio
  mouseY *= yRatio
  if(clicked){
    drawClickBox();
  }
}

function drawClickBox(){
  ctx.putImageData(savedBrot,0,0)
  ctx.beginPath();
  ctx.rect(bound1[0],bound1[1],mouseX-bound1[0],mouseY-bound1[1]);
  ctx.stroke();
}

//Add mouse listeners
c.addEventListener("mousedown", mouseDown, false)
c.addEventListener("mouseup", mouseUp, false)
c.addEventListener("mousemove", mouseDelta, false)
c.addEventListener("mouseout",function(){if(clicked){mouse(0)}}, false)
