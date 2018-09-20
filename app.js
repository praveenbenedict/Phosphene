const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const hbs = require('hbs');
const logger = require('morgan');
var app = express();
const db = require('./routes/dbQueries');

//Server Listening
app.listen(8080, () => {
    console.log("Server Running");
});

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use('/assets', express.static(__dirname + '/public'));


app.get('/getAllQuizes', (req, res, next) => {
    db.getAllQuizes((quizData) => {
        res.json(quizData);
        console.log(quizData);
    });
});

app.get('/:username/:quizName',(req,res,next) => {
    //var username = req.params.username;
    db.findSpecificQuiz(req.params.username,req.params.quizName,(quizData) => {
        res.render('quizHostPage', {
            questions: quizData
        });
        console.log(quizData);
    });
});

app.get('/getData', (req, res, next) => {
    var quiz = {
        username: req.body.username,
        password: req.body.password,
        question: req.body.textQuestion,
        answer: req.body.textAnswer,
        name: req.body.name,
        url: req.body.url
    };
    db.insertAll(quiz);
    console.log(quiz);
    res.end("Input received");
});


app.get('/addNewQuiz', function(req, res) {
    res.render('addNewQuiz');
});

app.get('/attendQuiz',(req,res) => {
    res.render('quizHostPage');
});


app.post('/evaluateQuiz', (req,res,next) => {
    var quizAnswers = req.body.quizAnswers;
    // console.log(quizAnswers);
    // console.log("print next");
    var points = db.evaluateAnswers(quizAnswers, function(points){
        var result = {
            score: points
        };
        res.json(result);
    });
    
});

app.post('/', (req,res,next) => {
    console.log(req.body);
    res.end();
});


app.use('/verifyUrl', (req,res,next) => {
    //console.log(req);
    db.verifyUrl(req.body.verify.url,(result) => {
        console.log(result);
        res.json({result: result});
    });
});

app.use('/insertQuiz', (req,res) => {
    var quiz = req.body.quizData;
    //console.log(quiz);
    db.insertArray(quiz);
});

// app.use('/', (req, res, next) => {
//     fs.readFile('./public/signin.html', function (err, data) {
//         res.writeHead(200, {
//             'content-type': 'text/html'
//         });
//         res.write(data);
//         res.end();
//     });
// });



