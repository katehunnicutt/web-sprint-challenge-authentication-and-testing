const User = require('../auth/auth-model')
const bcrypt = require('bcryptjs')

const checkUserNameExists = (req, res, next) => {
const {username} = req.body;
try{
const user =  User.findBy({username: username});
if (!user){
    res.status(401).json({message:"username taken"})
}else{
    next()
}
}catch(err){
  next(err)
}
}

const checkUserName = (req, res, next) => {
const {username,password} = req.body
User.findBy({username})
.then(([user]) => {
    if(user && bcrypt.compareSync(password,user.password)){
        next()
    }else{
        res.status(401).json({message:"invalid credentials"})
    }
})  

}

// try{
// const user = await User.findBy({username: username,password: });
// if (user){
//     res.status(401).json({message:"invalid credentials"})
// }else{
//     next()
// }
// }catch(err){
//   next(err)
// }
const validateBody = (req, res, next) => {
const {username} = req.body;
try{
 if (username === undefined || username.trim() === ''){
     req.body.username
     next()
 }else{
     req.body.username = username.trim()
     next()
 }
}catch(err){
next(err)
}
}




module.exports = {
    checkUserNameExists,
    checkUserName,
    validateBody
}