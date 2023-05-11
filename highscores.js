
// go back action
document.getElementById('goBack').addEventListener('click', () => { // addeventListener with id goBack  this is use when user click on go back button then browser take user to previous page or action
    window.history.back();//back method  when user click then send user to previous page
});


// delete the history
document.getElementById('clearHighScores').addEventListener('click', () => { // addEvenListener with id clearHighScores when user click on it when delete the history of high score

    document.getElementById('highscores-list').innerHTML = ''; // set the innerHTML and empty the string(' ')

    localStorage.removeItem('highscores'); // removeItem method that use to remove history item from local storage

});


var highscoresList = document.getElementById('highscores-list');// get elemtn with the id highscores-List and store it in highscoresList
var highscores = JSON.parse(localStorage.getItem('highscores')) || [];// get the highscores from the local and then use jsonmethod if there is no high scores then set it empty 
highscores.forEach((highscore, index) => { //iterating each elements (user inital and sscores) after that create a list with user and socers and user append to keep adding socores list if take quiz muitiple times 
    var li = document.createElement('li'); // create li list to store inits and scores
    li.innerText = `${index + 1}. ${highscore.initials} - ${highscore.score}`; // display innerText socre and initals
    highscoresList.appendChild(li);// keep adding list use append method 
});


