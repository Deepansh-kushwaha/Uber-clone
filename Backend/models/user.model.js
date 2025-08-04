const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be atleast 8 characters'],
        select: false
    },
    socketId: {
        type: String,
    
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;