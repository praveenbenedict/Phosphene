// $(document).ready(function () {

//     $('#addQuestion').on('click', function () {
//         var questionType = $('input[name=questionType]:checked').val();
        // console.log(questionType);
//         if (questionType) {
//             $('#newQuestionModal .errMsg').html('');
//             if (questionType === 'mcq') {

//                 $('#mcqQuestionModal').modal('toggle');


//             } else if (questionType === 'textBased') {
//                 $('#textBasedQuestionModal').modal('toggle');
//             }

//             $('#newQuestionModal').modal('toggle');

//         } else {
//             $('#newQuestionModal .errMsg').html('Please select an option');
//         }
//     });

//     $('body').on('click', '#mcqQuestionModal .addOption', function() {

//         var radio = '<input type="radio" name="mcqAnswer" id="">';
//         var text = '<input type="text" name="" id="">';
//         $('#mcqQuestionModal .modal-body').append('<section class = "option-holder"> <br/>'+ radio  + text + '<br/></section>');
//         var optionText = $('#mcqQuestionModal .modal-body').children('.option-holder').last().children('input[type=text]');
//         optionText.focus();

//     });

// });








$('document').ready(function () {

    var mcqQuestion =
        '<section class="card mcq-question">' +
            '<section class="card-header">' +
                '<input type="text" placeholder="Enter Your Question" />' +
                '</br>' +
            '</section>' +
            '<form>' +
                '<section class="card-body">' +
                    '<section class="form-group options">' +
                        '</br>' +
                        '<section class="option-holder"></section>' +
                        '<button type="button" class="btn btn-primary add-option-button">' +
                            'Add option' +
                        '</button>' +
                        '<button type="button" class="btn disabled btn-primary done-button">' +
                            'Done' +
                        '</button>' +
                        '<button type="button" class="btn disabled btn-primary edit-button">' +
                            'Edit' +
                        '</button>' +
                    '</section>' +
                '</section>' +
            '</form>' +
        '</section>';
        var textBasedQuestion =
        '<section class="card text-based-question">' +
            '<section class="card-header">' +
                '<input type="text" placeholder="Enter Your Question" />' +
                '</br>' +
            '</section>' +
            '<form>' +
                '<section class="card-body">' +
                    '<section class="form-group options">' +
                        '</br>' +
                        '<section class="option-holder"></section>' +
                        '<button type="button" class="btn btn-primary add-answer-button">' +
                            'Add Answer' +
                        '</button>' +
                        '<button type="button" class="btn disabled btn-primary done-button">' +
                            'Done' +
                        '</button>' +
                        '<button type="button" class="btn disabled btn-primary edit-button">' +
                            'Edit' +
                        '</button>' +
                    '</section>' +
                '</section>' +
            '</form>' +
        '</section>';


    var options =
        '<br/><input type="radio" name = "mcqOption" placeholder="option" value="" />' +
        '<input type="text" placeholder="option" value="" />' +
        '</br>';

    var textAnswer = 
        '<br/>' +
        '<input type="text" placeholder="Answer" value="" />' +
        '</br>';

    // Check for duplicate names and generate URL
    $('#quizName').on("keyup", function () {
        var quizName = this.value;
        var backLink = "http://phoenicorn.com/";
        var fullLink = backLink + quizName;
        // if (true) {
        //     $('#verificationTickMark').addClass("red");
        //     $('#addNewMcqQuestionBtn').removeClass("disabled");
        //     $('#addNewTextQuestionBtn').removeClass("disabled");
        //     $('#urlName').val(fullLink);
        // } else {
        //     $('#verify').addClass("green");
        // }
        $.ajax({
            url: '/verifyUrl',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({verify: {url: quizName}})
        }).done((result) => {
            console.log(result);
            if (result.result) {
                $('#verificationTickMark').addClass("red");
                $('#addNewMcqQuestionBtn').removeClass("disabled");
                $('#addNewTextQuestionBtn').removeClass("disabled");
                $('#urlName').val(fullLink);
            } 
            else {
                $('#verificationTickMark').removeClass("red");
                $('#verificationTickMark').addClass("green");
            }
        });
    });

    //Add Questions

    $('#addNewMcqQuestionBtn').on("click", function () {
        $('#questions').append(mcqQuestion);
        var newlyAdded = $('#questions').children().last();
        console.log($(newlyAdded));
        $(newlyAdded).find('.edit-button').hide();
    });

    $(document).on("click", '.mcq-question .add-option-button', function (e) {
        var currentButtonParent = $(this).parent();
        $(currentButtonParent).children('.option-holder').append(options);
        $(this).parent().children('.done-button').removeClass("disabled");
    });

    $(document).on("click", '.mcq-question .done-button', function (e) {
        var formGroup = $(this).parent();
        
        $(formGroup).children('.option-holder').children(' input[type=radio]').hide();
        $(formGroup).children('.option-holder').children('input[type=text]').attr('disabled','disabled');
        $(formGroup).children('.add-option-button').hide();
        $(formGroup).children('.done-button').hide();
        $(formGroup).children('.edit-button').show();
        $(formGroup).children('.edit-button').removeClass('disabled');
    });

    
    $(document).on("click", '.mcq-question .edit-button', function(e) {
        var formGroup = $(this).parent();
        $(formGroup).find('input[type=radio]').show();
        $(formGroup).find('input[type=text]').removeAttr('disabled');
        $(formGroup).find('.add-option-button').show();
        $(formGroup).find('.done-button').show();
        $(formGroup).find('.edit-button').hide();
        $(formGroup).find('.edit-button').removeClass('disabled');
    });


    $('#addNewTextQuestionBtn').on('click', function(e) {
        $('#questions').append(textBasedQuestion);
        var newlyAdded = $('#questions').children().last();
        $(newlyAdded).find('.edit-button').hide();
    });
    $(document).on("click", '.text-based-question .edit-button', function(e) {
        var formGroup = $(this).parent();
        $(formGroup).find('input[type=text]').removeAttr('disabled');
        $(formGroup).find('.add-answer-button').show();
        $(formGroup).find('.done-button').show();
        $(formGroup).find('.edit-button').hide();
        $(formGroup).find('.edit-button').removeClass('disabled');
    });

    $(document).on("click", '.text-based-question .add-answer-button', function (e) {
        var currentButtonParent = $(this).parent();
        $(currentButtonParent).children('.option-holder').append(textAnswer);
        $(this).parent().children('.done-button').removeClass("disabled");
    });
     $(document).on("click", '.text-based-question .done-button', function (e) {
        var formGroup = $(this).parent();
        $(formGroup).children('.option-holder').children('input[type=text]').attr('disabled','disabled');
        $(formGroup).children('.add-answer-button').hide();
        $(formGroup).children('.done-button').hide();
        $(formGroup).children('.edit-button').show();
        $(formGroup).children('.edit-button').removeClass('disabled');
    });

    $(document).on('click', '#submitButton', function(e) {
        var mcqQuestionsArray = [];
        var textBasedQuestionsArray = [];

        //Get the MCQ Questions and load it into an array of Objects form
        $('.mcq-question').each(function() {
            var mcqQuestionObject = {};
            var mcqQuestionOptions = [];
            var mcqAnswer;
            var mcqQuestion;
            //Acquire the Entire Question as a Jquery Object
            var mcqQuestionContainer = $(this);

            //Find the Question and store it
            mcqQuestion = mcqQuestionContainer.children('.card-header').children('input[type=text]').val();

            //Get the Options-Holder to get the options and the right answer
            var mcqOptionContainer = $(mcqQuestionContainer.find('.option-holder'));

            //Find the checked answer and store it
            mcqAnswer = mcqOptionContainer.find('input[name=mcqOption]:checked').next().val();

            //Store all the options in an Array
            mcqOptionContainer.find('input[type=text]').each(function() {
                mcqQuestionOptions.push($(this).val());
            });

            //Construct a Question into an Object
            mcqQuestionObject = {
                question: mcqQuestion,
                options : mcqQuestionOptions,
                answer : mcqAnswer
            } 
            //Push the Question Into an array
            mcqQuestionsArray.push(mcqQuestionObject);
        });
        $('.text-based-question').each(function() {

            var textBasedQuestionObject = {};
            var possibleAnswers = [];
            var question;
            
            var questionContainer = $(this);
            question = questionContainer.children('.card-header').find('input[type=text]').val();
            questionContainer.find('.option-holder').children('input[type=text]').each(function() {
                possibleAnswers.push($(this).val());
            });

            //Now Contruct the question Object
            textBasedQuestionObject = {
                question: question,
                answers: possibleAnswers
            }
            textBasedQuestionsArray.push(textBasedQuestionObject);
        });
        console.log(mcqQuestionsArray);
        console.log(textBasedQuestionsArray);
        var quizName = $('#quizName').val();
        var postRequestParameters = {
            url: $('#quizName').val(),
            quizName: quizName,
            textBasedQuestions: textBasedQuestionsArray,
            mcqQuestions: mcqQuestionsArray
        };
        console.log(postRequestParameters);
        $.ajax({
            url: '/insertQuiz',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({quizData: postRequestParameters})
        }).done((data) => {
            console.log(data);
        });        
    });
});










