const User = require('../auth/auth-model')

const checkUserNameExists = async (req, res, next) => {
const {username} = req.body;
try{
const user = await User.findBy({username: username});
if (!user){
    res.status(401).json({message:""})
}else{
    next()
}
}catch(err){
  next(err)
}
}

const checkUserNameAvailable =  async (req, res, next) => {
    const {username} = req.body;
    try{
    const user = await User.findBy({username: username});
    if (user){
        res.status(401).json({message:""})
    }else{
        next()
    }
    }catch(err){
      next(err)
    }
}


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
    checkUserNameAvailable,
    validateBody
}