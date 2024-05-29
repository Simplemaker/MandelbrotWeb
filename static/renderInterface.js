
var w = new Worker("FractalProcess.js")
var calculatingState = false; // global calculating state

//Global canvas definitions
var c = document.querySelector("canvas")
var ctx = c.getContext("2d")
var prog = document.getElementById("progbar")
var savedRender;
var progress=0;
var w;

function render() {
  w.terminate()
  w = new Worker("FractalProcess.js")

  w.onmessage = function (e) {
  //console.log("message received")
  if (e.data.type == "render") {
    calculatingState = false
    savedRender = blobGenerator(e.data.render)
    if (!animatingState) {
      updateImage()
    }
    blobGenerator(e.data.render)
    console.log("Render Received!")
    if(e.data.debug != ""){
      console.log("Debug message: "+e.data.debug)
    }
  } else if (e.data.type == "progress") {
    progress = Math.floor(e.data.value*100) + "%" 
    prog.innerHTML = progress
    prog.style.width = progress
  } else {
    console.log(e.data)
  }
  }
  
  prog.style.width = "0%"
  prog.innerHTML = "0%"
  calculatingState = true
  w.postMessage(brotObject);
}

function blobGenerator(id) {
  var c2 = document.createElement("canvas")
  c2.width = id.width; c2.height = id.height;
  c2.style.width = id.width + "px"; c2.style.height = id.height + "px";
  var ctx2 = c2.getContext("2d")
  ctx2.putImageData(id, 0, 0)
  return c2.toDataURL("image/png")
}

function updateImage() {
  var i = document.createElement("img")
  i.onload = function (e) {
    c.width = i.width; c.height = i.height;
    //c.style.width = i.width + "px"; c.style.height = i.height + "px";
    ctx.drawImage(i, 0, 0)
  }
  i.src = savedRender
}