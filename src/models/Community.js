const { Schema, model } = require('mongoose');

const communitySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        members: [
            {
                ref: 'Member',
                type: Schema.Types.ObjectId,
            },
        ],
    },
    {
        versionKey: false,
    }
);

module.exports = model('Community', communitySchema);
