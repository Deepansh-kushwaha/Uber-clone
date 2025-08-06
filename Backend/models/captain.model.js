const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'Firstname must be atleast 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3,'Firstname must be atleast 3 characters']
        }
    },
    phone: {
        type: String,
        minlength: [10, 'Phone must be atleast 10 characters'],
        maxlength: [13, 'Phone must be atmost 13 characters']
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        minlength: [11, 'Email must be atleast 11 characters'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid Email'],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be atleast 6 characters']
    },
    socketId:{
        type: String
    },
    status:{
        type: String,
        enum : ['online', 'offline'],
        default: 'offline',

    },
    vehicle:{ 
        color:{
            type: String,
            required: true,
            minlength: [3,'Color must be atleast 3 characters']

        },
        plate:{
            type: String,
            required: true,
            minlength: [3,'Plate must be atleast 3 characters']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1,'Capacity must be atleast 1'],

        },
        vehicleType:{
            type: String,
            required: true,
            enum : ['car', 'motorcycle', 'auto'],
        }
    },
    location: {
       lat:{
           type: Number,
           
       },
       lng: {
           type: Number,
       }
    }
});

// The following is an error: should be 'schema.methods', not 'schema.method'
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

captainSchema.methods.hashPassword = async function(password){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel ;