const {ObjectID} = require('mongodb');

const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');

// var id = '5badb2e95299711ca4eb23ea77';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

//User.findById
User.findById('5bac1fd52463d8060444288e').then((user) => {
    if(!user){
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e)
});
