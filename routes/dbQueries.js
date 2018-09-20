const mongoose = require('mongoose');

const mcqsModel = require('../models/mcqs');
const quizesModel = require('../models/quizes');
const textQuestionsModel = require('../models/textQuestions');
const usersModel = require('../models/users');
const simiMatch = require('../nlp/similarity-matching.js');
const _ = require('lodash');
const url = 'mongodb://localhost:27017/quizSystem';
mongoose.connect(url, {
    useNewUrlParser: true
}, () => {
    console.log("Database connection established successfully");
});

function convertMcqQuestions(mcqs) {
    var mcqQuestions = new Array();
    for(let i = 0; i <= mcqs.length; i++) {
        var mcq = new mcqsModel(mcqs.pop());
        mcqQuestions.push(mcq);
    }
    console.log(mcqQuestions);
    return mcqQuestions;
}

function convertTextQuestions(textQues) {
    var textQuestions = new Array();
    for(let i = 0;i <= textQues.length; i++) {
        var txtq = new textQuestionsModel(textQues.pop());
        textQuestions.push(txtq);
    }
    console.log(textQuestions);
    return textQuestions;
}

function insertArray(quizData) {
    console.log(quizData);
    quizData.mcqQuestions = convertMcqQuestions(quizData.mcqQuestions);
    quizData.textQuestions = convertTextQuestions(quizData.textQuestions);
    for(let i = 0;i < quizData.mcqQuestions.length; i++) {
        quizData.mcqQuestions[i].save();
    }
    for(let i = 0; i < quizData.textQuestions.length;i++ ) {
        quizData.textQuestions[i].save();
    }
    // var quiz = new quizesModel({
    //     url: quizData.url,
    //     author: 'leander',
    //     quizTitle: quizData.quizName,
    //     textQuestions: quizData.textBasedQuestions,
    //     mcqQuestions: quizData.mcqQuestions
    // });
    var quiz = new quizesModel(quizData);
    quiz.save().then(quizDoc => {
        usersModel.findOne({
            username: 'praveen'
        }).then(user => {
            console.log(user);
            user.quizes.push(quizDoc);
            user.save();
        });
    });
}

function evaluateAnswers(quizAnswers, callback) {
    // console.log(quizAnswers);
    var points = 0;
    quizesModel.findOne({quizTitle: quizAnswers.quizTitle}).
    populate('textQuestions').populate('mcqQuestions').then((quiz) => {
    
        _.each(quizAnswers.mcqAnswers, (mcq, mcqKey) => {
            console.log('mcq');
            // console.log(quiz);
            _.each(quiz.mcqQuestions, (data, mcqQuestionKey) => {
                // console.log(data);
                if(mcq._id == data._id) {
                    if(mcq.answer ==  data.answer)
                        points++;
                    console.log(points);
                }
            });
        });
        _.each(quizAnswers.textAnswers,(textq, textAnswersKey) => {
            // console.log("fefrge");
            // console.log(textq);
            _.each(quiz.textQuestions,(data, textQuestionsKey) => {
                // console.log(data);
                if(textq._id == data._id) {
                    var obj = simiMatch.findBestScoreAndAnswer(textq.answer,data.answers);
                    // console.log(obj);
                    points += obj.bestScore;
                    console.log(points);
                }
            });
        });

        callback(points);

    });
}

// function insertTextQuestion(question, answer, author) {
//     console.log("inside textbox");
//     var textQuestion = new testQuestionsModel({
//         question: question,
//         answers: answer,
//         author: author
//     });
//     textQuestion.save((data) => {
//         return data._id;
//     });
// }

// function insertIntoUser(id, username) {
//     usersModel.findOne({
//         username: username
//     }, (data) => {
//         console.log(data);
//         data.quizes.push(id);
//     });
// }

// function insertQuiz(tid, author, name, url) {
//     var quiz = new quizesModel({
//         author: author,
//         name: name,
//         url: url
//     });
//     quiz.textQuestions.push(tid);
//     quiz.save((data) => {
//         return data._id;
//     });
// }

// function insertMcqs(mcqs) {
//     var mcqQuestions = new Array();
//     mcqs.forEach(element => {
//         var mcqQuestion = new mcqsModel(element);
//         mcqQuestion.save().then(data => {
//             console.log(data);
//             mcqQuestions.push(data);
//         });
//     });
// }

// function insertText(textBasedQuestions) {
//     var textQuestions = new Array();
//     textBasedQuestions.forEach(element => {
//         var textQuestion = new testQuestionsModel(element);
//         textQuestion.save().then((data) => {
//             console.log(data);
//             textQuestions.push(data);
//         });
//     });
// }

// function test(data) {
//     var mcqQuestion = new mcqsModel(data);
//     mcqQuestion.save().then(data => {
//         console.log(data);
//         mcqQuestions.push(data);
//     });
// }

// function insertArray(quizData) {
//     var mcqQuestions = new Array();
//     var textQuestions = new Array();
//     console.log(quizData.mcqQuestions);
//     //What is the error in the given code below
//     // jquery.each(quizData.mcqQuestions,function (index,element) {
//     //     var mcqQuestion = new mcqsModel(element);
//     //     mcqQuestion.save().then(data => {
//     //         console.log(data);
//     //         mcqQuestions.push(data);
//     //     });
//     // });
//     for (let i = 0; i < quizData.mcqQuestions.length; i++) {
//         var mcqQuestion = new mcqsModel(quizData.mcqQuestions[i]);
//         mcqQuestion.save().then(data => {
//             console.log(data);
//             mcqQuestions.push(data);
//         });
//         // test(quizData.mcqQuestions[i]);
//     }

//     // jquery.each(quizData.textBasedQuestions,function (index,element) {
//     //     var textQuestion = new testQuestionsModel(element);
//     //     textQuestion.save().then((data) => {
//     //         console.log(data);
//     //         textQuestions.push(data);
//     //     });
//     // });
//     for (let i = 0; i < quizData.textBasedQuestions.length; i++) {
//         var textQuestion = new testQuestionsModel(quizData.textBasedQuestions[i]);
//         textQuestion.save().then((data) => {
//             console.log(data);
//             textQuestions.push(data);
//         });
//     }
//     setTimeout(() => {
//         console.log(mcqQuestions);
//         console.log(textQuestions);
//         var quiz = new quizesModel({
//             url: quizData.url,
//             author: 'leander',
//             quizTitle: quizData.quizName,
//             textQuestions: textQuestions,
//             mcqQuestions: mcqQuestions
//         });
//         quiz.save().then(data => {
//             // for (let i = 0; i < quizData.mcqQuestions.length ; i++ ) {
//             //     var mcqQuestion = new mcqsModel(quizData.mcqQuestions[i]);
//             //     mcqQuestion.save().then(mcq => {
//             //         console.log(data);
//             //         data.mcqQuestions.push(mcq);
//             //         data.save();
//             //     });
//             // }
//             // for(let i = 0;i<quizData.textBasedQuestions.length;i++) {
//             //     var textQuestion = new testQuestionsModel(quizData.textBasedQuestions[i]);
//             //     textQuestion.save().then((txtq) => {
//             //         console.log(txtq);
//             //         data.textQuestions.push(txtq);
//             //         data.save();
//             //     });
//             // }
//             console.log(data);
//             usersModel.findOne({
//                 username: 'leander'
//             }).then(user => {
//                 console.log(user);
//                 user.quizes.push(data);
//                 user.save();
//             });
//         });
//     },1000);
// }

// function insertMcqs(quiz, mcqs) {
//     var mcqQuestion = new mcqsModel(quizData.mcqQuestions[i]);
//     mcqQuestion.save().then(mcq => {
//         console.log(data);
//         quiz.mcqQuestions.push(mcq.pop());
//         quiz.save().then(data => insertMcqs(data, mcq));
//     });
// }

// function insertAll(quizData) {
//     var textQuestion = new testQuestionsModel({
//         question: quizData.question,
//         answers: quizData.answer,
//         author: quizData.username
//     });
//     textQuestion.save().then((data) => {
//         var quiz = new quizesModel({
//             author: quizData.username,
//             quizTitle: quizData.name,
//             url: quizData.url
//         });
//         quiz.textQuestions.push(data);
//         quiz.save().then((data) => {
//             usersModel.findOne({
//                 username: quizData.username
//             }).then((data) => {
//                 console.log(data);
//                 data.quizes.push(data);
//                 data.save();

//             });
//         });
//     });
// }

function verifyUser(user, pass) {
    usersModel.find({
        username: user
    }, 'password', (verify) => (verify.password === pass))
}

function getAllQuizes(quizData) {
    quizesModel.find({}, 'quizTitle author textQuestions mcqQuestions').then((quiz) => {
        quizData(quiz);
    });
}

function findSpecificQuiz(author, quizName, quizData) {
    quizesModel.findOne({
        author: author,
        quizTitle: quizName
    }, 'quizTitle author textQuestions mcqQuestions').
    populate('textQuestions').populate('mcqQuestions').then((quiz) => {
        quizData(quiz);
    });
}

function verifyUrl(url, result) {
    quizesModel.findOne({
        url: url
    }).then((data) => {
        console.log(data);
        if (data != null)
            result(true);
        else
            result(false);
    });
}

var obj = {
    getAllQuizes: getAllQuizes,
    verifyUser: verifyUser,
    // insertTextQuestion: insertTextQuestion,
    // insertQuiz: insertQuiz,
    // insertIntoUser: insertIntoUser,
    // insertAll: insertAll,
    findSpecificQuiz: findSpecificQuiz,
    verifyUrl: verifyUrl,
    insertArray: insertArray,
    evaluateAnswers: evaluateAnswers
};

module.exports = obj;