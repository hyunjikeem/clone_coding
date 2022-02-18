const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

module.exports = (req, res, next) => {
    const { authorization } =req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용해주세요🤣',
        });
        return;
    }

    try {
        const { userEmail } = jwt.verify(tokenValue, 'my-secret-key');
        User.findById(userEmail).exec().then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용해주세요🤣',
        });
        return;
    };
};