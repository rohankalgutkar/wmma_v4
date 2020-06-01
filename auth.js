const mongo = require('./mongodb.js')
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const jwt = require('jsonwebtoken')


const registerNewUser = async (newUser) => {
    console.log('In Register New User')
    console.log(newUser)

    let db = await mongo.connect()

    // Check if username already exists
    const existingUser = await db.collection('users').findOne({username: newUser.username})

    if(existingUser) {
        console.log('Username taken!')

        return {
            usernameTaken: true,
            formName: newUser.name
        }
    }


    newUser.password = await bcrypt.hash(newUser.password, saltRounds)

    const registedUser = await db.collection('users').insertOne(newUser)

    return registedUser

    // bcrypt.hash(newUser.password, saltRounds, async function(err, hash) {
    //     newUser.password = hash;

    //     const registedUser = await db.collection('users').insertOne(newUser)
    //     console.log('Inserted new user')
    //     console.log(registedUser.insertedId)
    //     return registedUser
    // });

    
    

}


// Login 

const loginInUser = async (user) => {
    let db = await mongo.connect()

    // Find the user, does it exist?
    const dbUser = await db.collection('users').findOne({username: user.username})
    console.log(dbUser)

    if (dbUser) {
        // Username found
        // Check for the password match
        let hashedPass = await bcrypt.hash(user.password, saltRounds)
        console.log(hashedPass)
        
        const passMatch = await bcrypt.compare(user.password, dbUser.password)

        console.log('passMatch: ')
        console.log(passMatch)

        if (passMatch) {
            const token = jwt.sign(dbUser._id, 'secret')
            return {
                loginSuccess: true,
                token
            }
    
        }

        


    } else {
        //Username not found
        //Send error message saying the same
        console.log('User not found')
        return {
            invalidCredentials: true
        }
    }
}

module.exports = {
    registerNewUser, loginInUser
}