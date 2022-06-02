const Community = require('../models/Community');
const Member = require('../models/Member');

const addMember = async (req, res) => {
    const { communityId } = req;
    const { name, email, password, participationPercentage } = req.body;

    const community = await Community.findById(communityId);

    const newMember = new Member({
        name,
        email,
        community: community.name,
        password: await Member.encryptPassword(password),
        participationPercentage,
        roles: ['member'],
    });

    const savedMember = await newMember.save();

    community.members.push(savedMember._id);

    community.save();

    res.status(200).json({ message: 'Miembro agregado exitosamente' });
};

const checkCommunityName = async (req, res) => {
    const name = req.params.name;
    const nameExists = await Community.exists({ name });

    if (nameExists) return res.status(400).json({ message: 'Nombre de comunidad no disponible' });

    return res.status(200).json({ message: 'Ok' });
};

module.exports = { addMember, checkCommunityName };
