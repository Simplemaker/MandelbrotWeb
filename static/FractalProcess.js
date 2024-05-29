
importScripts("complex.js")

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

onmessage = function (event) {
  try {
    var p = event.data
    var duration = p.duration
    var sampleDimensions = [[0, p.sampleDimensions[0]], [0, p.sampleDimensions[1]]]
    var varBounds = p.varBounds
    var algname = p.alg ?? "./algorithms/brot.js"
    var postfiltname = p.finalColor.filt ?? "./filters/bw.js"
    var postfiltparams = p.finalColor.params ?? []
    var initN = p.initN ?? [0, 0]
    var args = p.args ?? []
    var escapeDistance = p.escapeDistance ?? 2
    //import appropriate scripts
    importScripts(algname) //evaluate is now defined for the correct value
    importScripts(postfiltname) //toColor is now defined

    var sampleList = []
    for (var y = sampleDimensions[1][1]-1; y >= 0; y--) {
      for (var x = 0; x < sampleDimensions[0][1]; x++) {
        //run the test function
        var test = evaluate(canvasScale(sampleDimensions, varBounds, [x, y]), duration, initN, escapeDistance, args);
        sampleList.push(test);
      }
      var prog = (sampleDimensions[1][1]-y)/sampleDimensions[1][1]
      postMessage({"type":"progress", "value":prog})
    }
    //prefilter maps durations to other durations for added effect
    var filtlist = p.filters ?? [];
    filterstring = ""
    for(var i=0; i<filtlist.length; i++){
      var filterObj = filtlist[i]
      importScripts(filterObj.filt)
      filterstring += filterObj.filt
      for (var j = 0; j < sampleList.length; j++) {
        sampleList[j] = filter(sampleList[j], filterObj.params)
      }
    }

    //postfilter converts duration to color values
    
    outPoints = new Uint8ClampedArray(4 * sampleList.length)

    for (var i = 0; i < sampleList.length; i++) {
      var color = toColor(sampleList[i], postfiltparams)
      for (var channel = 0; channel < 4; channel++) {
        outPoints[i * 4 + channel] = color[channel]
      }
    }
    var outObj = {
      "type":"render",
      "render":new ImageData(outPoints,sampleDimensions[0][1],sampleDimensions[1][1]),
      "debug": ""
    }
    postMessage(outObj)
  } catch (error) {
    postMessage({ "type": "error", "message": error })
  }
}