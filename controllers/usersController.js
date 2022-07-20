const log = require('../local_modules/Log');
const User = require('../models/userModel');

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
        const user = await User.create(req.body);
        user.save()
        res.json({status: 'success', data: user});
    }catch (err) {
        res.status(400).json({status: 'error', message: err.message});
    }
    
};

exports.userLogin = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (user) {
        if (user.password === req.body.password) {
            res.json({status: 'success', data: user});
        } else {
            res.json({status: 'error', message: 'Incorrect password'});
        }
    } else {
        res.json({status: 'error', message: 'User not found'});
    }
}