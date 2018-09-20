$(document).ready(function() {

    $('#submitQuizButton').click(function(e){

        var mcqAnswers = [];
        var textAnswers = [];


        var quizTitle = $('.quiz-title').attr('data-quiz-title');
        console.log(quizTitle);
        $('.mcq-question').each(function() {
            var currentQuestion = $(this);
            var checkedAnswer = currentQuestion.children('.options-container').find('input[name=mcqOption]:checked').next().text();
            var _id = $(currentQuestion).attr('data-id');
            var mcqAnswer = {
                _id: _id,
                answer: checkedAnswer
            };
            mcqAnswers.push(mcqAnswer);

        });

        $('.text-based-question').each(function() {
            var currentQuestion = $(this);
            var _id = $(currentQuestion).attr('data-id');
            var enteredAnswer = currentQuestion.find('input[type=text]').val();
            var textBasedAnswer = {
                _id: _id,
                answer: enteredAnswer
            };
            textAnswers.push(textBasedAnswer);
        });

        var quizAnswers = {
            quizTitle: quizTitle, 
            mcqAnswers: mcqAnswers,
            textAnswers: textAnswers
        }
        console.log(quizAnswers);

        $.post('/evaluateQuiz', {quizAnswers: quizAnswers}).done(function(result) {
            console.log(result.score);
        });

    });

});