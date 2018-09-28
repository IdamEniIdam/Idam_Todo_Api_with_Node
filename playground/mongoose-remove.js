const {ObjectID} = require('mongodb');

const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5bae58615fd3c775749cb3d9'}).then((todo) => {

// });

Todo.findByIdAndRemove('5bae58615fd3c775749cb3d9').then((todo) => {
console.log(todo);
});
