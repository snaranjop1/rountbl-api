const Community = require('../models/Community');
const Member = require('../models/Member');
const config = require('../config');
const { getToken } = require('../libs/jwt.helpers');

const cookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
};

const createCommunity = async (req, res) => {
    const { name, admin } = req.body;

    const adminMember = new Member({
        name: admin.name,
        email: admin.email,
        community: name,
        password: await Member.encryptPassword(admin.password),
        participationPercentage: admin.partPercentage,
        roles: ['admin', 'member'],
    });

    const savedAdmin = await adminMember.save();

    const newCommunity = new Community({
        name,
        members: [savedAdmin._id],
    });

    const savedCommunity = await newCommunity.save();

    const token = getToken({ id: savedAdmin._id, communityId: savedCommunity._id });

    res.cookie('rountbl_access_token', token, cookieOptions)
        .status(200)
        .json({
            user: { name: savedAdmin.name, email: savedAdmin.email, roles: savedAdmin.roles },
        });
};

const loginCommunity = async (req, res) => {
    const { community, email, password } = req.body;

    const communityFound = await Community.findOne({ name: community }).populate('members');
    if (!communityFound)
        return res.status(400).json({
            message: 'Comunidad no existe, por favor verifique la información ingresada.',
        });

    const memberFound = communityFound.members.find((member) => member.email === email);
    if (!memberFound)
        return res.status(400).json({
            message: 'Credenciales incorrectas, por favor verifique la información ingresada.',
        });

    const pwdMatches = await Member.checkPassword(password, memberFound.password);
    if (!pwdMatches)
        return res.status(401).json({
            message: 'Credenciales incorrectas, verifique la información ingresada.',
        });

    const token = getToken({ id: memberFound._id, communityId: communityFound._id });

    res.cookie('rountbl_access_token', token, cookieOptions)
        .status(200)
        .json({
            user: { name: memberFound.name, email: memberFound.email, roles: memberFound.roles },
        });
};

const logoutCommunity = (_, res) => {
    return res
        .clearCookie('rountbl_access_token')
        .status(200)
        .json({ message: 'Cierre de sesion exitoso' });
};

const isAuth = async (req, res) => {
    const member = await Member.findById(req.memberId);
    return res
        .status(200)
        .json({ user: { name: member.name, email: member.email, roles: member.roles } });
};

module.exports = { createCommunity, loginCommunity, logoutCommunity, isAuth };
