const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.signUp = async (req, res) => {
    let { username, password, email, phone } = req.body;
    // console.log(username, password, email, phone);
    let user = await User.findOne({ email }, (err, user) => {
        if(err){
            res.json({ msg: 'error occurred' });
        }
        else if(user){
            res.json({ msg: 'email is already taken' });
        }
        else{
            let hash = await bcrypt.hash(password, 14);
            req.body.password = hash;
            let user = new User(req.body);
            user.save()
                .then( _ => {
                    res.json({ msg: `${req.body.username} saved to database` });
                })
                .catch(err => {
                    console.log(`error while saved to database`);
                })
        }
    })
}

module.exports.signIn = async (req, res) => {
    let { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
        if(err){
            res.json({ msg: 'error occurred' });
        }
        else if(!user){
            res.json({ msg: 'no user' });
        }
        else{
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    console.log(`${user.username} logged in`);
                    res.json({ msg: 'logged in' });
                }else{
                    console.log(`${user.username} unsuccessful logged in`);
                    res.json({ msg: 'invalid login credentials' });
                }
            });
        }
    
    })
}

module.exports.signOut = (req, res) => {
    let { username, password, email, phone } = req.body;
    console.log(username);
}