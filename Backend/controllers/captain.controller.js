const captainModel = require('../models/captain.model');
const captainServices = require('../services/captain.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, fullname, password, vehicle, phone } = req.body;

        if (!vehicle) {
            return res.status(400).json({ message: 'Vehicle information is required' });
        }

        const isCaptainExist = await captainModel.findOne({ email });
        if (isCaptainExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const captain = await captainServices.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            phone,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (err) {
        next(err);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordCorrect = await captain.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token, captain });
    } catch (err) {
        next(err);
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = req.captain;
        res.status(200).json({ captain });
    } catch (err) {
        next(err);
    }
}
module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
        await blacklistTokenModel.create({token});
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
}