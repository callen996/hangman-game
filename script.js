$('.letterButton').on('click', function() {
    $(this).addClass('flip');
});

const hintBox = document.getElementById('hintBox');

var randomWordUrl = "https://random-word-api.vercel.app/api?words=1&length=7&type=uppercase"
var sadGifUrl = "https://api.giphy.com/v1/gifs/random?api_key=VZP80HfNoEAn2JpnCtbMfqEGN4HAuZF7&tag=sad&rating=pg-13"


fetch(randomWordUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    








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

  fetch(sadGifUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    alert(data.data.url)
  });


  
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


