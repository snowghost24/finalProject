

// var string;
var secondString = "i said";
var theThat = "that"
var to = "to"
var write = "write"


  function fixedString (string) {
if (string.indexOf("i said")){
   string = string.slice(string.indexOf(secondString) + secondString.length + 1);
  checkagain(string)
}

function checkagain(string){
   if (string.startsWith("that")){
       lowstring = string.slice(string.indexOf(theThat) + theThat.length + 1);
      replaceString(lowstring)
   }

   if (string.startsWith("to")){
      lowstring = string.slice(string.indexOf(to) + to.length + 1);
     replaceString(lowstring)
  }
}

function replaceString(lowstring){
   string =lowstring
}


if (string.startsWith(write)){
   string = string.slice(string.indexOf(write) + write.length + 1);
}

return string
}

module.exports = fixedString






