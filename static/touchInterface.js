
class toCenterDims{
  constructor(varBounds){
    this.width = varBounds[0][1] - varBounds[0][0]
    this.height = varBounds[1][1] - varBounds[1][0]
    this.center=  [(varBounds[0][1] + varBounds[0][0]) / 2, (varBounds[1][1] + varBounds[1][0]) / 2]
  }

  toVarBounds() {
      return [[
        this.center[0] - this.width / 2,
        this.center[0] + this.width / 2
      ],
      [
        this.center[1] - this.height / 2,
        this.center[1] + this.height / 2
      ]
      ]
  }
}

function zoomOut(){
  var c = new toCenterDims(brotObject.varBounds)
  c.height *= 2
  c.width *= 2
  brotObject.varBounds = c.toVarBounds()
  render()
}

function touchToMouse(e){
  e.preventDefault()
  var touch = e.touches[0]
  var fakeMouse = {
    target: touch.target,
    clientX: touch.clientX,
    clientY: touch.clientY
  }
  mouseDelta(fakeMouse);
  console.log(mouseX, mouseY)
  mouse(1);
}

function touchMove(e){
  e.preventDefault()
  var touch = e.touches[0]
  var fakeMouse = {
    target: touch.target,
    clientX: touch.clientX,
    clientY: touch.clientY
  }
  mouseDelta(fakeMouse);
}

function touchUp(e){
  e.preventDefault()
  mouse(0);
}

c.addEventListener("touchstart", touchToMouse, false);
c.addEventListener("touchmove", touchMove, false);
c.addEventListener("touchend", touchUp, false);
