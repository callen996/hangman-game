$('.letterButton').on('click', function() {
    $(this).addClass('flip');
});

var randomWordUrl = "https://random-word-api.vercel.app/api?words=1&length=7&type=uppercase"
var sadGifUrl = "https://api.giphy.com/v1/gifs/random?api_key=VZP80HfNoEAn2JpnCtbMfqEGN4HAuZF7&tag=sad&rating=pg-13"

fetch(randomWordUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    alert(data)
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

