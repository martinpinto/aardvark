import * as expressJwt from 'express-jwt';
const { config } = require('../../config');

export const jwtService = expressJwt({
    secret: config.oauth.secret,
});
