const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors());

mongoose.connect('mongodb+srv://johnsnow:Winterfell123@cluster0.hxwdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } )
mongoose.connection.once('open', ()=>{
    console.log('Connected to DB')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, ()=>{
    console.log("Now online at port 5000")
})

//Winterfell123