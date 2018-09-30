require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
//to connect to herokus
const port = process.env.PORT;

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


//GET /todos/1346
app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
var id = req.params.id;

    if(!ObjectID.isValid(id)) {
    return res.status(404).send();
}

Todo.findById(id).then((todo) => {
    if(!todo) {
        return res.status(404).send();
    }

    res.send({todo});
}).catch((e) => {
    res.status(400).send();
});

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        });
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }

        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        })
});

//POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);


user.save().then(() => {
    return user.generateAuthToken();
}).then((token) => {
    res.header('x-auth', token).send(user);
}).catch((e) => {
    res.status(400).send(e);
    })
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) =>{
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    });
});


app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Starting up at port ${port}`);
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