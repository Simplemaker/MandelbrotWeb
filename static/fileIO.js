
loadfile = function(e){
  if(!e.target.files[0]){
    return
  }
  f = new FileReader()
  f.onload = function(e){
    try{
      brotObject = JSON.parse(e.target.result)
      render()
    }catch(err){
      console.log(err)
    }
  }
  f.readAsText(e.target.files[0]);
  console.log("a file was loaded!")
}

function openFile(){
  var inputFile = document.createElement("input")
  inputFile.type = "file"
  inputFile.onchange = loadfile;
  inputFile.click()
}

var saveCounter = 0
function saveFile(){
  var string = JSON.stringify(brotObject)
  saveCounter++;
  var filename = "FractalConfig"+ saveCounter+".fjsn"
  var a = document.createElement("a")
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(string)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}