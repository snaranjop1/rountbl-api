const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const memberSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
        },
        community: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        participationPercentage: {
            type: Number,
            required: true,
        },
        roles: [
            {
                type: String,
            },
        ],
    },
    {
        versionKey: false,
    }
);

memberSchema.statics.encryptPassword = async (pwd) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pwd, salt);
};

memberSchema.statics.checkPassword = async (pwd, receivedPwd) => {
    return await bcrypt.compare(pwd, receivedPwd);
};

module.exports = model('Member', memberSchema);
