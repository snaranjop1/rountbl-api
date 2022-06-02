const Community = require('../models/Community');

const isCommunityNameAvailable = async (req, res, next) => {
    const name = req.params.name;

    const communityFound = await Community.findOne({ name });

    if (communityFound)
        return res.status(400).json({ message: 'Nombre de comunidad no disponible' });

    next();
};

module.exports = { isCommunityNameAvailable };
