import { buildschema } from 'graphql'

const schema = buildschema(`
type Query {
    hello: String
}
`)

export default schema