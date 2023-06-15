var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function convert() {
  var message = document.getElementById("message").value;
  var conversion = []; // 0 => A, 1 => B, ... 25 => Z.
  var bank = [], index;
  for (var i = 0; i < alphabet.length; i++) bank.push(i);
  while (bank.length > 0) { // Everything is in place and it tries unsuccessfully to place z.
    index = Math.floor(Math.random() * bank.length);
    if (bank[index] !== conversion.length) { // Letters can't convert into themselves.
      conversion.push(bank[index]);
      bank.splice(index, 1);
    }
    else if (bank.length == 1) {
      // If z is the last letter to be placed, it will cause an infinite loop. (Z can't map to z, but there is no other option.) Restart the process.
      conversion = [];
      bank = [];
      for (var i = 0; i < alphabet.length; i++) bank.push(i);
    }
  }
  conversion = conversion.map(num => alphabet[num]);
  
  var cryptoquip = message.split("").map(rawLetter => {
    var letter = rawLetter.toUpperCase();
    if (alphabet.indexOf(letter) !== -1)
      return conversion[alphabet.indexOf(letter)];
    return letter;
  }).join("");
  // console.log(cryptoquip);
  document.getElementById("message").value = cryptoquip;
  // Write out solution.
  document.getElementById("solution").innerHTML = "Solution:";
  alphabet.split("").forEach( (letter, i) => {
    document.getElementById("solution").innerHTML += "<br>" + letter + " = " + alphabet[conversion.indexOf(letter)];
  });
}
