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

const hintBox = document.getElementById('hintBox');

var randomWordUrl = "https://random-word-api.vercel.app/api?words=1&length=7&type=uppercase"
var sadGifUrl = "https://api.giphy.com/v1/gifs/random?api_key=VZP80HfNoEAn2JpnCtbMfqEGN4HAuZF7&tag=sad&rating=pg-13"
var guessThisWord
var wordLetterList
var sadGif
var blanksNum
var clickedLetter
var score = 6
var guessedList = [".",".",".",".",".",".","."]

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
    


    // Code for getting the definition hint
    var chosenWord = data[0];
    console.log(data[0]);
    var definitionUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

    fetch(definitionUrl + chosenWord)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data[0].meanings[0].definitions[0].definition);
        hintBox.textContent = data[0].meanings[0].definitions[0].definition
      })
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
      guessedList[i] = clickedLetter
      console.log(guessedList)
		}
	}
  if (wordLetterList.includes(clickedLetter) === false) {
    console.log("wrong")
    score--
    console.log(score)
    console.log(sadGif)// set element on html to be this gif
    getSadGif()
  }
  if (JSON.stringify(wordLetterList) == JSON.stringify(guessedList)) {
    gameOver(true, score)
  }
  if (score === 0) {
    gameOver(false, score)
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
// Displays the game over window and lets the player input their score
// Win parameter is a boolean, set to true if the player won and false if they lost
function gameOver(win, score) {
  // Display the game over modal
  var gameOverModal = $('#game-over-modal')
  gameOverModal.css("display", "block");

  // Display a message based on whether the player won or lost
  var statusText = $('#status-text');
  if (win) {
    statusText.html("You won! Your score is " + score);
  }
  else {
    statusText.html("You lost! Your score is " + score);
  }

  // Close the game over modal when the close button is clicked and submitted
  var closeButton = $('#close-button');
  closeButton.on('click', function(event) {
    gameOverModal.css("display", "none");
  });

  // Send name and score to local storage when the submit button is clicked and saved
  var nameInputBar = $('#name-input');
  var submitButton = $('#score-submit');

  submitButton.on('click', function(event) {
    var name = nameInputBar.val();
    // Only submit a score if a name has been entered
    if (name !== "") {
      saveToLocalStorage(name, score);
    }
  });
}
