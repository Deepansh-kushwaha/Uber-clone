const captainModel = require('../models/captain.model');
const captainServices = require('../services/captain.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
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