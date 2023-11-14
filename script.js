$('.letterButton').on('click', function() {
    $(this).addClass('flip');
});

var randomWordUrl = "https://random-word-api.vercel.app/api?words=1&length=7&type=uppercase"
var sadGifUrl = "https://api.giphy.com/v1/gifs/random?api_key=VZP80HfNoEAn2JpnCtbMfqEGN4HAuZF7&tag=sad&rating=pg-13"
var guessThisWord
var sadGif
var blanksNum


fetch(randomWordUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    guessThisWord = data[0]
    console.log(guessThisWord)
    blanksNum = guessThisWord.length
    console.log(blanksNum)
    makeBlanks()
  });

  fetch(sadGifUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    sadGif = data.data.url
    console.log(sadGif)
  });

  
function makeBlanks() {
  for (let i = 0; i < blanksNum; i++) {
    var newLi = document.createElement("li")
    newLi.setAttribute("class", "inline m-3")
    newLi.setAttribute("id", [i])
    var newText = document.createTextNode("__")
    newLi.appendChild(newText)
    var element = document.getElementById("blanks-list")
    element.appendChild(newLi)
  }
}