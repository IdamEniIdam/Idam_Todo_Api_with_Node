// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     db.collection('Todos').find({
    //         _id: new ObjectID('5ba5f59981def7141e8ea469')
    //     }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


//     db.collection('Todos').find().count().then((count) => {
//     console.log(`Todos count: ${count}`);
// }, (err) => {
//     console.log('Unable to fetch todos', err);
// });



db.collection('Users').find({name: 'Idam'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
});

    // db.sclose();
});