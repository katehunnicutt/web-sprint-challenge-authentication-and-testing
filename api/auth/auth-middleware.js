const bcrypt = require("bcryptjs")
const User = require("../auth/auth-model")

const checkUserNameExists = (req, res, next) => {
  const {username} = req.body 
  try{
    const user = User.findBy({username: username})
    if(!user) {
      res.status(401).json({message: "username taken"})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }

}

const checkUserName = (req, res, next) => {
  const {username, password} = req.body 
  User.findBy({username})
  .then(([user]) => {
    if(user && bcrypt.compareSync(password.user.password)){
      next()
    } else {
      res.status(401).json({
        message: "invalid credentials"
      })
    }
  })

}

const validateReqBody = (req, res, next) => {
const {username} = req.body
try {
  if(username === undefined || username.trim() === "") {
    req.body.username
    next()
  } else {
    req.body.username = username.trim()
    next()
  }

} catch(err) {
  next(err)
}
}

// 1- In order to register a new account the client must provide `username` and `password`:
//       {
//         "username": "Captain Marvel", // must not exist already in the `users` table
//         "password": "foobar"          // needs to be hashed before it's saved
//       }

//     2- On SUCCESSFUL registration,
//       the response body should have `id`, `username` and `password`:
//       {
//         "id": 1,
//         "username": "Captain Marvel",
//         "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
//       }

//     3- On FAILED registration due to `username` or `password` missing from the request body,
//       the response body should include a string exactly as follows: "username and password required".

//     4- On FAILED registration due to the `username` being taken,
//       the response body should include a string exactly as follows: "username taken".
//   */
// });


  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
module.exports = {
  checkUserNameExists,
  checkUserName,
  validateReqBody,
}