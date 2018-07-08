const express = require("express");
const bodyParser = require("body-parser");
const bcrypt =  require('bcrypt-nodejs');
const cors =  require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'password',
      database : 'blog'
    }
  });


const app = express();

app.use(bodyParser.json());
app.use(cors())

app.put('/image' ,(req,res) =>{
    const { id } = req.body ;
    db('likes').where('id', '=', id)
    .increment('liked', 1)
    .returning('liked')
    .then(liked =>{
        res.json(liked)
    })
    .catch(err =>{
        res.status(400).json("oops!entries not found")
    })
})


app.put('/img' ,(req,res) =>{
    const { id } = req.body ;
    db('likes').where('id', '=', id)
    .increment('liked', -1)
    .returning('liked')
    .then(liked =>{
        res.json(liked)
    })
    .catch(err =>{
        res.status(400).json("oops!entries not found")
    })
})

app.put('/im' ,(req,res) =>{
    const { id } = req.body ;
    db('likes').where('id', '=', id)
    .select('liked')
    .then(liked =>{
        res.json(liked[0].liked)
    })
    .catch(err =>{
        res.status(400).json("oops!entries not found")
    })
})

app.listen(3003  , () =>{
    console.log("app is running")
});