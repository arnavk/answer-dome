var suggestCallBack, setQuestion; // global var for autocomplete jsonp

$(document).ready(function () {
  getQuestion(generatePrefix());
  $('#randomize').on('click', function(){
    getQuestion(generatePrefix());

  });
});

blockAssets = function() {
  $('#randomize').text('Generating...');
  $('#randomize').attr("disabled", true);
  $('#question').text("... awaiting awesomeness ...");
}

freeAssets = function() {
  $('#randomize').text('Randomize');
  $('#randomize').removeAttr("disabled");
}

getQuestion = function(prefix) {
  blockAssets();
  $.getJSON("http://suggestqueries.google.com/complete/search?callback=?", {
    "hl":"en", // Language
    "jsonp":"setQuestion", // jsonp callback function name
    "q":prefix, // query term
    "client":"youtube" // force youtube style response, i.e. jsonp
  });
}

setQuestion = function(data){
  console.log(data);
  if (data[1].length < 10) {
    getQuestion(generatePrefix());
    return;
  }
  question = data[1][Math.floor(Math.random() * data[1].length)][0];
  if (question.length > 50) {
    getQuestion(generatePrefix());
    return;
  }
  $('#question').text(question);
  freeAssets();
};

var q = ['who', 'what', 'where', 'when', 'how', 'why', 'how much'];
var v = ['can', 'do', 'could', 'did', 'does', 'can\'t', 'don\'t', 'doesn\'t', 'couldn\'t', 'didn\'t']

generatePrefix = function() {
  var noun = randomAlphabet();
  var s = randomFromArray(q) + " " + randomFromArray(v) + " " + noun;
  console.log(s);
  return s;
}

randomAlphabet = function() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

randomFromArray = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

pickRandomNoun = function() {
  var result;
  var count = 0;
  for (var noun in n)
    if (Math.random() < 1/++count)
       result = noun;
  return result;
}
