const { verifyToken } = require('../libs/jwt.helpers');
const Member = require('../models/Member');
const Community = require('../models/Community');

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.rountbl_access_token;
        if (!token) return res.status(403).json({ message: 'Token invalido' });

        const decoded = verifyToken(token);
        req.memberId = decoded.id;
        req.communityId = decoded.communityId;

        const community = await Community.exists({ _id: req.communityId });
        const member = await Member.exists({ _id: req.memberId });
        if (!community || !member) return res.status(404).json({ message: 'Token Invalido' });

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Error al autenticar' });
    }
};

const isAdmin = async (req, res, next) => {
    const { memberId } = req;
    try {
        const member = await Member.findById(memberId);

        const isAdmin = member.roles.includes('admin');
        if (!isAdmin) return res.status(401).json({ message: 'No autorizado' });

        next();
    } catch (error) {
        return res.status(401).json({ message: 'No autorizado' });
    }
};

module.exports = { verifyJWT, isAdmin };
