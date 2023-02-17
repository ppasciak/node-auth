const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    verifyToken
}