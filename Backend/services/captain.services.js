const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, phone, email, password, color, plate, capacity, vehicleType
}) => {
   
    if(!firstname || !phone|| !email || !password|| !color|| !plate|| !capacity|| !vehicleType){ 
        console.log(fullname, phone, email, password, color, plate, capacity, vehicleType);
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({
        fullname:{   
            firstname,
            lastname
        },
        email,
        phone,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}