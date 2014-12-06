var suggestCallBack, setQuestion; // global var for autocomplete jsonp

$(document).ready(function () {
  $("#search").autocomplete({
    source: function(request, response) {
      $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
        {
          "hl":"en", // Language
          "jsonp":"suggestCallBack", // jsonp callback function name
          "q":request.term, // query term
          "client":"youtube" // force youtube style response, i.e. jsonp
        }
      );
      suggestCallBack = function (data) {
        var suggestions = [];
        $.each(data[1], function(key, val) {
            suggestions.push({"value":val[0]});
        });
        response(suggestions);
      };
    },
  });
  $('#randomize').on('click', function(){
    $('#randomize').text('Generating...');
    $('#randomize').attr("disabled", true);
    prefix = generatePrefix();
    console.log(prefix);
    getQuestion(prefix);

  });
});

getQuestion = function(prefix) {
  $.getJSON("http://suggestqueries.google.com/complete/search?callback=?", {
    "hl":"en", // Language
    "jsonp":"setQuestion", // jsonp callback function name
    "q":prefix, // query term
    "client":"youtube" // force youtube style response, i.e. jsonp
  });
}

setQuestion = function(data){
  console.log(data);
  if (data[1].length == 0)
  {
    getQuestion(generatePrefix());
    return;
  }
  question = data[1][Math.floor(Math.random() * data[1].length)][0];
  console.log(question);
  $("#search").val(question);
  $('#randomize').text('Randomize');
  $('#randomize').removeAttr("disabled");
};

var q = ['who', 'what', 'where', 'when', 'how', 'why', 'how much'];
var v = ['can', 'do', 'could', 'did', 'does', 'can\'t', 'don\'t', 'doesn\'t', 'couldn\'t', 'didn\'t']

function generatePrefix() {
  var noun = randomAlphabet();
  var s = randomFromArray(q) + " " + randomFromArray(v) + " " + noun;
  console.log(s);
  return s;
}

function randomAlphabet() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomNoun() {
  var result;
  var count = 0;
  for (var noun in n)
    if (Math.random() < 1/++count)
       result = noun;
  return result;
}
