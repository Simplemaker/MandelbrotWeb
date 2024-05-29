
//Single global brot Object
var brotObject = {
  "duration": 100,
  "sampleDimensions":[640,480],
  "varBounds":[[-2.3,0.5],[-1.2,1.2]],
  "finalColor":{
    filt:"./filters/color.js",
    params:[]
    },
  "filters":[
    {"filt":"filters/basefilt.js","params":[6]},
    {"filt":"filters/rainbofier.js","params":[5]}
  ],
  "args":["2"]
}

//scaleMemory global
scaleMemory = []

function duration(delta){
  brotObject.duration += delta
  render()
}

function rainbow(){
  var n = parseFloat(document.getElementById("rainbowInput").value)
  if(typeof n == "number"){
    brotObject.filters[1].params = [n+""]
  }
  render()
}

function zoomSet(zs){
  var zoomsets = [
    [[-2.3, .5], [-1.2, 1.2]],
    [[-2, 2], [-2, 2]],
    [[-10, 10], [-10, 10]]
  ]
  if (zs <= zoomsets.length - 1) {
    scaleMemory.push(brotObject.varBounds)
    brotObject.varBounds = zoomsets[zs]
  }
  render()
}


function rescale(bound1, bound2){
  for (var i = 0; i < 2; i++) { //set bound1 as min and bound2 as max
    if (bound1[i] > bound2[i]) {
      //called if zoom is flipped l/r
      var t = bound2[i]
      bound2[i] = bound1[i]
      bound1[i] = t
    }
  }
  var x1 = linearMap([0,c.width],brotObject.varBounds[0],bound1[0])
  var x2 = linearMap([0,c.width],brotObject.varBounds[0],bound2[0])
  var y1 = linearMap([c.height,0],brotObject.varBounds[1],bound1[1])
  var y2 = linearMap([c.height,0],brotObject.varBounds[1],bound2[1])
  scaleMemory.push(brotObject.varBounds)
  brotObject.varBounds = [[x1,x2],[y2, y1]]
  zRender(bound1, bound2) //Rescale has animated zoom
}

function undo(){
  if(scaleMemory.length == 0){return;}
  var oldCoords = scaleMemory.pop()
  brotObject.varBounds = oldCoords;
  render()
}


function getCoords() {
  document.getElementById("coordsInput").value = "" + brotObject.varBounds
}

function putCoords() {
  coordsTxt = document.getElementById("coordsInput").value.split(',')
  xBounds = [parseFloat(coordsTxt[0]), parseFloat(coordsTxt[1])]
  yBounds = [parseFloat(coordsTxt[2]), parseFloat(coordsTxt[3])]
  scaleMemory.push(brotObject.varBounds)
  brotObject.varBounds = [xBounds, yBounds]
  render()
}

function updateRes() {
  var coordsTxt = document.getElementById("resInput").value.split(",")
  brotObject.sampleDimensions = [parseInt(coordsTxt[0]), parseInt(coordsTxt[1])]
  render()
}

function setArgs(){
  brotObject.args = document.getElementById("brotExp").value.split(",")
  render()
}

function setInitN() {
  valList = document.getElementById("initN").value.split(',')
  var Cr = parseFloat(valList[0])
  var Ci = parseFloat(valList[1])
  if (isNaN(Cr)) { Cr = 0; }
  if (isNaN(Ci)) { Ci = 0; }
  brotObject.initN = [Cr, Ci]
  render()
}

var postRenderIndex = 0
function postRenderToggle(){
  var postRenderNames = ["Color","BW","Greynbow","Aqua","Fire","Feathery"]
  var postRenderAlgs = ["color.js","bw.js","greynbow.js","polybow.js", "polybow.js", "polybow.js", "polybow.js"]
  var postRenderParams = [[],[],[],["#00ffee","#69ffbe","#b54dff"], ["#cc2200","#ffa200","#ffff00","#593612"], ["#f0f0f0","#ededda","#deded7"]]
  postRenderIndex = (postRenderIndex+1)%postRenderNames.length
  document.getElementById("postrender").innerHTML = "PostRender: " +postRenderNames[postRenderIndex]
  
  brotObject.finalColor = {"filt":"./filters/"+postRenderAlgs[postRenderIndex],
  "params": postRenderParams[postRenderIndex]
  };

  render()
}

function setAlg(algname){
  brotObject.alg = "./algorithms/"+algname
  render()
}

//Modifier function 
function config(obj){
  var keys = Object.keys(obj)
  for(var k=0; k<keys.length; k++){
    var key = keys[k]
    brotObject[key] = obj[key]
  }
  render()
}

//acquire initial display width before initial render
var screenWidth = screen.width;
var screenHeight = Math.floor(9 * screenWidth / 16)
brotObject.sampleDimensions = [screenWidth, screenHeight]

render() //initial render