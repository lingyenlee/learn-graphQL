import express from "express"
import graphqlHTTP from 'express-graphql'
import schema from './schema'

//create base server
const app = express()

app.get("/", (req, res) => {
    res.send("GraphQL is amazing")
})

const root = { hello: () => "Hi, I am me" }

app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


const port = 5000
app.listen(5000, () => console.log(`Running server on PORT ${port}`))