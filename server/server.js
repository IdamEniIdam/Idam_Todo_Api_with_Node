var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });


todo.save().then((doc) => {
    res.send(doc);
}, (e) => {
    res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('Starting on port 3000');
});


module.exports = {app};


















// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true  
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null   
//     }
// });


// // var newTodo = new Todo({
// //     text: 'Cook dinner'
// // });

// // newTodo.save().then((doc) => {
// //     console.log('Saved todo', doc);
// // }, (e) => {
// //     console.log('Unable to save todo')
// // });

// // var otherTodo = new Todo({
// //     text: '  Edit this video  '
// //     // completed: true,
// //     // completedAt: 123
// // });

// // otherTodo.save().then((doc) => {
// //     console.log(JSON.stringify(doc, undefined, 2));
// // }, (e) => {
// //     console.log('Unable to save', e)
// // });



// //User
// //email - require it - trim it -set type - set min length ofv 1

// var User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         trim: true   ,
//         minlength: 1
//     }
// });

// var user = new User({
//     email: '  idameni89@gmail.com   '
// });

// user.save().then((doc) => {
//     console.log('User saved', doc);
// }, (e) => {
//     console.log('Unable to save user', e);
// })