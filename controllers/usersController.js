const log = require('../local_modules/Log');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.index = async (req, res) => {
    const users = await User.find();
    log.info(users);
    res.json({status: 'success', data: users});
};

exports.read = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    log.info(user);
    res.json({status: 'success', data: user});
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const user = await User.updateOne({_id: id}, req.body);
    log.info(user);
    res.json({status: 'success', data: user}, 204);
}

exports.remove = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.deleteOne({_id: id});
        log.info(user);
        res.json({status: 'success', data: user});
    }catch (err) {
        res.status(400).json({status: 'error', message: err.message});
    }
};

exports.create = async (req, res) => {
    try{
        
        const password = req.body.password + '';
        
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = await User.create({username:req.body.username, password:hash});
            user.save()
            res.json({status: 'success', data: user});
        });
        
    }catch (err) {
        res.status(400).json({status: 'error', message: err.message});
    }
    
};

exports.userLogin = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (user) {
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({id: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.json({status: 'success', data: token});
            } else {
                res.status(400).json({status: 'error', message: 'Invalid password'});
            }
        });
    } else {
        res.json({status: 'error', message: 'User not found'});
    }
}