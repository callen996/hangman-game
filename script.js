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
  fetch(sadGifUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    sadGif = data.data.url
    console.log(sadGif)
  });

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
window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
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
    statusText.html("You lost!");
  }

  // Close the game over modal when the close button is clicked
  var closeButton = $('#close-button');
  closeButton.on('click', function(event) {
    gameOverModal.css("display", "none");
  });

  // Send name and score to local storage when the submit button is clicked
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

gameOver(true, 5);