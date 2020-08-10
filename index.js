import express from "express"
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema'
// import resolvers from "./resolvers"

//create base server
const app = express()

app.get("/", (req, res) => {
    res.send("GraphQL is amazing")
})



//create a path, pass the function schema into graphqlHTTP
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

const port = 5000
app.listen(port, () => console.log(`Running server on port ${port}`));