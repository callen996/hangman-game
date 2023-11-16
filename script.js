$('.letterButton').on('click', function() {
    $(this).addClass('flip');
	clickedLetter = this.id
	console.log(clickedLetter)
	checkLetter()
});

var audio = new Audio('audio/Happy Hopping_Var1.wav');
    var playButton = document.getElementById('playButton');
    var muteButton = document.getElementById('muteButton');

    playButton.addEventListener('click', function() {
      audio.play();
    });

    muteButton.addEventListener('click', function() {
      if (audio.muted) {
        audio.muted = false;
      } else {
        audio.muted = true;
      }
    });

//could add random number for length of word --- current is length=7

var randomWordUrl = "https://random-word-api.vercel.app/api?words=1&length=7&type=uppercase"
var sadGifUrl = "https://api.giphy.com/v1/gifs/random?api_key=VZP80HfNoEAn2JpnCtbMfqEGN4HAuZF7&tag=sad&rating=pg-13"
var guessThisWord
var wordLetterList
var sadGif
var blanksNum
var clickedLetter
var score = 6

// gets a random word from api and sets it to coresponding var
fetch(randomWordUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    guessThisWord = data[0]
    console.log(guessThisWord)
	wordLetterList = guessThisWord.split("")
	console.log(wordLetterList)
    blanksNum = guessThisWord.length
    console.log(blanksNum)
    makeBlanks()
  });
  // gets a random sad gif from api to be used as a sort of point system
  getSadGif()
  function getSadGif() {
    fetch(sadGifUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      sadGif = data.data.url
      console.log(sadGif)
    });
  }

  // makes a blank html element for length of word
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

// checks if you clicked correct letter 	if yes sets blanks to letter
function checkLetter() {
	for (let i = 0; i < blanksNum; i++) {
		if (clickedLetter == wordLetterList[i]) {
			console.log("yep")
			document.getElementById(i).textContent = wordLetterList[i]
		}
	}
  if (wordLetterList.includes(clickedLetter) === false) {
    console.log("wrong")
    score--
    console.log(score)
  }
}



  
// Saves an name/score pair to local storage, using the name as the key
function saveToLocalStorage(name, score) {
    localStorage.setItem(name, JSON.stringify(score));
}

// Iterates through local storage and displays the name/score pairs it contains
function drawFromLocalStorage() {
    for (i = 0; i < localStorage.length; i++) {
        // Extract the name and score of each entry
        var name = localStorage.key(i);
        var score = JSON.parse(localStorage.getItem(localStorage.key(i)));

        // This will be replaced by inserting the data into HTML elements later
        console.log(name + ": " + score);
    }
}
