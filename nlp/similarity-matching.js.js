var stringSimilarity = require('string-similarity');//Dice Coefficient

var $ = require('jquery');

// console.log(stringSimilarity.compareTwoStrings('Mark was eating an apple', 'The Apple was being eaten by Mark'));

var findBestScoreAndAnswer = (enteredAnswer, correctAnswers) => {

    var bestScore = 0;
    var bestAnswer;
    var bestAnswerIndex;

    //$.each(correctAnswers, function(index, answer) {
    for(let i =0 ;i<correctAnswers.length;i++) {
        answer = correctAnswers[i];
        index = i;
        var score = stringSimilarity.compareTwoStrings(enteredAnswer, answer);
        if(score > bestScore ) {
            bestScore = score;
            bestAnswer = answer;
            bestAnswerIndex = index;
        }
    };
    return {
        bestScore: bestScore,
        bestAnswer: bestAnswer,
        bestAnswerIndex: bestAnswerIndex
    };
}


module.exports = {
    findBestScoreAndAnswer
}
    
