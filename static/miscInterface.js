
//Download the current image as a png
function downloadImage() {
  var blob = c.toDataURL("image/png")
  var a = document.createElement('a')
  a.href = blob
  a.style.display = 'none'
  a.download = "fractal.png"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function genAlgButton(algName, scriptname, distance) {
  var d = document.getElementById("algbuttons")
  // var t = '<button onclick="setAlg(\'' + scriptname + '\')">' + algName + '</button>\n'
  b = document.createElement("button")
  b.innerHTML = algName
  b.onclick = function(){
    config({
      alg: "./algorithms/"+scriptname,
      escapeDistance: distance
    })
  }
  d.appendChild(b)
  d.append(" ") //Append whitespace for button space
}

//Generate algorithm buttons
function generateButtons(){
  var algNames = ['Brot', 'Brotexp', 'Collatz', '232', 'Julia', 'BurningShip', 'CosSum','Feather']
  var algList = ['brot.js', 'expbrot.js', 'collatz.js', '232brot.js', 'julia.js', 'ship.js', 'cossum.js','feather.js']
  var distances = [2,2,100,2,2,2,100,100]
  for (var i = 0; i < algNames.length; i++) {
  genAlgButton(algNames[i], algList[i], distances[i])
}

}
generateButtons()
