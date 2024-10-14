function igpayAtinlay(str) {
  var returnArray = [];
  var wordArray = str.split(" ");

  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = "";
    var restOfWord = "";

    if (/[aeiouAEIOU]/.test(word.charAt(0))) {
      returnArray.push(word + "way");
    } else {
      for (var ii = 0; ii < word.length; ii++) {
        if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
          restOfWord = word.slice(ii); 
          break;
        } else {
          beginning += word.charAt(ii); 
        }
      }
      returnArray.push(restOfWord + beginning + "ay");
    }
  }

  return returnArray.join(" ");
}

function convertToPigLatin() {
  var text = document.getElementById("txtVal").value;
  if (text.trim() === "") {
    document.getElementById("pigLatLbl").innerText = "Please enter a word or phrase.";
  } else {
    var result = igpayAtinlay(text);
    document.getElementById("pigLatLbl").innerText = result;
  }
}

