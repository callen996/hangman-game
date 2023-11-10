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

