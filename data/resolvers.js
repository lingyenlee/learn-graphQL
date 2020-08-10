import mongoose from 'mongoose'
import { Friends, Aliens } from './dbConnectors'
import { reject } from 'lodash'

// class Friend {
//     constructor(id, { firstName, lastName, gender, language, email, age, contacts }) {
//         this.id = id,
//             this.firstName = firstName,
//             this.lastName = lastName,
//             this.age = age,
//             this.gender = gender,
//             this.language = language,
//             this.email = email,
//             this.contacts = contacts
//     }
// }

// const friendDatabase = {}

//resolver = function that returns the data we need
//resolver map
export const resolvers = {
    Query: {
        // getFriend: ({ id }) => {
        //     return new Friend(id, friendDatabase[id])
        // },
        getOneFriend: (root, { id }) => {
            return new Promise((resolve, object) => {
                Friends.findById(id, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                })
            })
        },
        getAliens: () => {
            return Aliens.findAll()
        }
    },
    // friend: () => {
    //     return {
    //         "id": 34838,
    //         "firstName": "Danny",
    //         "lastName": "Lee",
    //         "gender": "Male",
    //         "language": "English",
    //         "emails": [{ email: "me@me.com" }, { email: "me2@me.com" }],

    //     }
    // },
    Mutation: {
        createFriend: (root, { input }) => {

            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                language: input.language,
                age: input.age,
                email: input.email,
                contacts: input.contacts
            })

            newFriend.id = newFriend._id

            return new Promise((resolve, object) => {
                newFriend.save((err) => {
                    if (err) reject(err)
                    else resolve(newFriend)
                })
            })
            // let id = require('crypto').randomBytes(10).toString('hex');
            // friendDatabase[id] = input;
            // return new Friend(id, input)
        },

        updateFriend: (root, { input }) => {
            return new Promise((resolve, object) => {
                Friends.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                })
            })
        },

        deleteFriend: (root, { id }) => {
            return new Promise((resolve, object) => {
                Friends.remove({ _id: id }, (err) => {
                    if (err) reject(err)
                    else resolve('Successfully deleted friend')
                })
            })
        }
    }

}

// export default resolvers