import oneLinerJoke from 'one-liner-joke'
var getRandomJoke = oneLinerJoke.getRandomJoke();
var text = document.createTextNode(getRandomJoke.body);
document.querySelector("#thediv").appendChild(text);