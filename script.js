var randomWordUrl = "https://random-word-api.vercel.app/api?words=1&length=7&type=uppercase"

fetch(randomWordUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    alert(data)
  });
